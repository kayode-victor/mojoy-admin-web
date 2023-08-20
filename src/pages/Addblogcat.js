/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/blogcategory/bcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Category Name is Required"),
});
const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogCategoryId = location.pathname.split("/")[3];

  const newBlogCategory = useSelector((state) => state.bcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    BlogCategoryName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getBlogCategory(getBlogCategoryId));
      formik.values.title = BlogCategoryName;
    } else {
      dispatch(resetState());
    }
  }, [BlogCategoryName, dispatch, getBlogCategoryId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Add successfully!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlogCategory, updatedBlogCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCategoryId !== undefined) {
        const data = { id: getBlogCategoryId, bcategoryData: values };
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(createBlogCategory(values));
        dispatch(resetState());
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
        {getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            id="blog-category"
            type="text"
            label="Enter Blog Category"
            name="title"
            val={formik.values.title || ""}
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
