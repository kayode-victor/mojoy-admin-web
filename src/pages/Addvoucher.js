/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createVoucher, resetState } from "../features/voucher/voucherSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Voucher Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const Addvoucher = () => {
  const dispatch = useDispatch();
  const newVoucher = useSelector((state) => state.voucher);

  const { isSuccess, isError, isLoading, createdVoucher } = newVoucher;

  useEffect(() => {
    if (isSuccess && createdVoucher) {
      toast.success("Voucher Add successfully!");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdVoucher]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createVoucher(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            id="name"
            type="text"
            label="Enter Voucher"
            name="name"
            val={formik.values.name}
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
            val={formik.values.expiry}
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
            val={formik.values.discount}
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
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addvoucher;
