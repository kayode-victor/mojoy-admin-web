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
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  const imgstate = useSelector((state) => state.upload.images);
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    brandImages,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBrandId]);

  useEffect(() => {
    if (brandName !== undefined && brandImages !== undefined) {
      formik.setFieldValue("title", brandName);
      const imageUrls = brandImages.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      dispatch(uploadImg(imageUrls)); // Dispatch action to update the image state
    }
  }, [brandName, brandImages, dispatch]);

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
  useEffect(() => {
    formik.setFieldValue("images", [...img]);
  }, [img]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Add successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated successfully!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

  const formik = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        dispatch(clearImages()); // Clear the uploaded images
      } else {
        dispatch(createBrand(values));
        dispatch(clearImages()); // Clear the uploaded images
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            label="Enter Brand Title"
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
                <div
                  {...getRootProps()}
                  className="bg-white border-1 p-4 text-center"
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
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
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};
export default Addbrand;
