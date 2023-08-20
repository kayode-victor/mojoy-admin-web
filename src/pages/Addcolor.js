/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createColor,
  resetState,
  getColor,
  updateColor,
} from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Color Name is Required"), // Validate as hexadecimal color code
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    ColorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
      formik.values.title = ColorName;
    } else {
      dispatch(resetState());
    }
  }, [ColorName, dispatch, getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Add successfully!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            id="color"
            type="color"
            label="Enter Color Name"
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
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
