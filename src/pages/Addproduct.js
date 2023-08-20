/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
  deleteImg,
  uploadImg,
  clearImages,
} from "../features/upload/uploadSlice";
import {
  createProduct,
  getProduct,
  updateProduct,
  resetState,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.string().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[3];
  const brandstate = useSelector((state) => state.brand.brands);
  const pCategorystate = useSelector((state) => state.pCategory.pCategories);
  const colorstate = useSelector((state) => state.color.colors);
  const imgstate = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    pName,
    pDesc,
    pPrice,
    pCat,
    pBrand,
    pQuantity,
    pColor,
    pTags,
    pImages,
  } = newProduct;
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getProductId]);

  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [dispatch]);

  const coloropt = colorstate.map((color) => (
    <Select.Option key={color._id} value={color._id}>
      {color.title}
    </Select.Option>
  ));

  useEffect(() => {
    if (
      pName !== undefined &&
      pDesc !== undefined &&
      pPrice !== undefined &&
      pCat !== undefined &&
      pBrand !== undefined &&
      pQuantity !== undefined &&
      pColor !== undefined &&
      pTags !== undefined &&
      pImages !== undefined
    ) {
      formik.setFieldValue("title", pName);
      formik.setFieldValue("description", pDesc);
      formik.setFieldValue("price", pPrice);
      formik.setFieldValue("brand", pBrand);
      formik.setFieldValue("category", pCat);
      formik.setFieldValue("tags", pTags);
      formik.setFieldValue("quantity", pQuantity);
      formik.setFieldValue("images", pImages);

      const selectedColor = pColor.map((color) => color._id); // Fixed: Map pColor to extract the color IDs
      setColor(selectedColor); // Fixed: Set selected color IDs

      const imageUrls = pImages.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      dispatch(uploadImg(imageUrls));
    }
  }, [pName, pDesc, pPrice, pCat, pBrand, pQuantity, pColor, pTags, pImages]);

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
    formik.values.color = color ? color : [];
  }, [color]);

  const handleColors = (e) => {
    setColor(e);
  };
  useEffect(() => {
    formik.setFieldValue("images", [...img]);
  }, [img]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Add successfully!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated successfully!");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct, updatedProduct]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      color: "",
      brand: "",
      category: "",
      tags: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateProduct(data));
        dispatch(clearImages()); // Clear the uploaded images
      } else {
        dispatch(createProduct(values));
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
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
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
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            val={formik.values.price || ""}
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            id=""
            className="form-control py-3"
            name="brand"
            value={formik.values.brand || ""}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
          >
            <option value="">Select Brand</option>
            {brandstate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
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
            {pCategorystate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            id=""
            className="form-control py-3"
            name="tags"
            value={formik.values.tags || ""}
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
          >
            <option value="" disabled>
              Tags
            </option>
            <option value="Featured">Featured</option>
            <option value="Popular">Popular</option>
            <option value="Special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Please select atleast one color"
            defaultValue={color}
            onChange={handleColors}
          >
            {coloropt}
          </Select>
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            val={formik.values.quantity || ""}
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
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
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
