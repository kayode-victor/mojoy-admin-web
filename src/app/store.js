import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import advertReducer from "../features/advert/advertSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import bcategoryReducer from "../features/blogcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import voucherReducer from "../features/voucher/voucherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    advert: advertReducer,
    color: colorReducer,
    blog: blogReducer,
    bcategory: bcategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    voucher: voucherReducer,
    pCategory: pCategoryReducer,
  },
});
