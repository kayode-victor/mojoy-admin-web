/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  resetState,
} from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteImg,
  uploadImg,
  clearImages,
} from "../features/upload/uploadSlice";
import Dropzone from "react-dropzone";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const Addcategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];

  const newProductCategory = useSelector((state) => state.pCategory);
  const imgstate = useSelector((state) => state.upload.images);
  const {
    isSuccess,
    isError,
    isLoading,
    ProductCategoryName,
    createdProductCategory,
    categoryImages,
    updatedProductCategory,
  } = newProductCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getProductCategory(getCategoryId));
      formik.values.title = ProductCategoryName;
    } else {
      dispatch(resetState());
    }
  }, [ProductCategoryName, dispatch, getCategoryId]);

  useEffect(() => {
    if (ProductCategoryName !== undefined && categoryImages !== undefined) {
      formik.setFieldValue("title", ProductCategoryName);
      const imageUrls = categoryImages.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      dispatch(uploadImg(imageUrls)); // Dispatch action to update the image state
    }
  }, [ProductCategoryName, categoryImages, dispatch]);

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
    if (isSuccess && createdProductCategory) {
      toast.success("Category Add successfully!");
    }
    if (isSuccess && updatedProductCategory) {
      toast.success("Category Updated successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    updatedProductCategory,
  ]);

  const formik = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateProductCategory(data));
        dispatch(clearImages()); // Clear the uploaded images
      } else {
        dispatch(createProductCategory(values));
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
        {getCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            id="category"
            type="text"
            label="Enter Category"
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
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
