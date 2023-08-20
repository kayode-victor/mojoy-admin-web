/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
  deleteImg,
  uploadImg,
  clearImages,
} from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import {
  createAdvert,
  getAdvert,
  resetState,
  updateAdvert,
} from "../features/advert/advertSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});

const Addadvert = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getAdvertId = location.pathname.split("/")[3];

  const imgstate = useSelector((state) => state.upload.images);
  const newAdvert = useSelector((state) => state.advert);
  const {
    isSuccess,
    isError,
    isLoading,
    createdAdvert,
    AdvertName,
    AdvertImages,
    updatedAdvert,
  } = newAdvert;

  useEffect(() => {
    if (getAdvertId !== undefined) {
      dispatch(getAdvert(getAdvertId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getAdvertId]);

  useEffect(() => {
    if (AdvertName && AdvertImages) {
      formik.setFieldValue("title", AdvertName);
      formik.setFieldValue("images", AdvertImages);
    }
  }, [AdvertName, AdvertImages]);

  useEffect(() => {
    if (isSuccess && createdAdvert) {
      toast.success("Advert Add successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedAdvert) {
      toast.success("Advert Updated successfully!");
      navigate("/admin/advert-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdAdvert, updatedAdvert]);

  const img = useMemo(() => {
    const images = [];
    imgstate.forEach((i) => {
      images.push({
        public_id: i.public_id,
        url: i.url,
      });
    });
    return images;
  }, [imgstate]);

  const formik = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getAdvertId !== undefined) {
        const data = { id: getAdvertId, advertData: values };
        dispatch(updateAdvert(data));
        dispatch(clearImages()); // Clear the uploaded images
      } else {
        dispatch(createAdvert(values));
        dispatch(clearImages()); // Clear the uploaded images
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img, formik.values]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getAdvertId !== undefined ? "Edit" : "Add"} Advert
      </h3>

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            label="Enter Advert Title"
            name="title"
            val={formik.values.title || ""}
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="bg-white border-1 p-4 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex gap-4">
            {imgstate?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-4"
            type="submit"
          >
            {getAdvertId !== undefined ? "Edit" : "Add"} Advert
          </button>
        </form>
      </div>
    </div>
  );
};
export default Addadvert;
