/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
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
  createBlog,
  getBlog,
  resetState,
  updateBlog,
} from "../features/blogs/blogSlice";
import { getBlogCategories } from "../features/blogcategory/bcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];

  const bCategorystate = useSelector((state) => state.bcategory.bcategories);
  const imgstate = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    updatedBlog,
    BlogName,
    BlogDesc,
    BlogCat,
    BlogImages,
  } = newBlog;

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogId]);

  useEffect(() => {
    if (
      BlogName !== undefined &&
      BlogDesc !== undefined &&
      BlogCat !== undefined &&
      BlogImages !== undefined
    ) {
      formik.setFieldValue("title", BlogName);
      formik.setFieldValue("description", BlogDesc);
      formik.setFieldValue("category", BlogCat);

      const imageUrls = BlogImages.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      dispatch(uploadImg(imageUrls)); // Dispatch action to update the image state
    }
  }, [BlogName, BlogDesc, BlogCat, BlogImages, dispatch]);

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
    if (isSuccess && createdBlog) {
      toast.success("Blog Add successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlog, updatedBlog]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(clearImages()); // Clear the uploaded images
      } else {
        dispatch(createBlog(values));
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
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>

      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            val={formik.values.title || ""}
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description || ""}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <select
            id=""
            className="form-control py-3"
            name="category"
            value={formik.values.category || ""}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Select Category</option>
            {bCategorystate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.tags}
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
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};
export default Addblog;
