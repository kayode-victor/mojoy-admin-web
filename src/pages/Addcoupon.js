/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCoupon,
  resetState,
  getCoupon,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    CouponName,
    CouponExpiry,
    CouponDiscount,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
      formik.values.name = CouponName;
      formik.values.expiry = CouponExpiry;
      formik.values.discount = CouponDiscount;
    } else {
      dispatch(resetState());
    }
  }, [CouponName, dispatch, getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Add successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated successfully!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupon, updatedCoupon]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
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
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            id="name"
            type="text"
            label="Enter Coupon"
            name="name"
            val={formik.values.name || ""}
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            id="expiry"
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            val={formik.values.expiry || ""}
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            id="discount"
            type="number"
            label="Enter Discount Percentage"
            name="discount"
            val={formik.values.discount || ""}
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
