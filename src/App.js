import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Viewenq from "./pages/Viewenq";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Productlist from "./pages/Productlist";
import Brandlist from "./pages/Brandlist";
import Categorylist from "./pages/Categorylist";
import Colorlist from "./pages/Colorlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import EditStore from "./pages/EditStore";
import Addadvert from "./pages/Addadvert";
import Advertlist from "./pages/Advertlist";
import Addvoucher from "./pages/Addvoucher";
import Voucherlist from "./pages/Voucherlist";
import Banner from "./pages/Banner";
import Vieworder from "./pages/Vieworder";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiry" element={<Enquiries />} />
          <Route path="enquiry/:id" element={<Viewenq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="category" element={<Addcategory />} />
          <Route path="category/:id" element={<Addcategory />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="store" element={<EditStore />} />
          <Route path="voucher-list" element={<Voucherlist />} />
          <Route path="voucher" element={<Addvoucher />} />
          <Route path="voucher/:id" element={<Addvoucher />} />
          <Route path="banner" element={<Banner />} />
          <Route path="advert-list" element={<Advertlist />} />
          <Route path="advert" element={<Addadvert />} />
          <Route path="advert/:id" element={<Addadvert />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<Vieworder />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
