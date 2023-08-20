import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  MdDashboard,
  MdShoppingCart,
  MdColorLens,
  MdViewList,
  MdStore,
  MdOutlineStoreMallDirectory,
  MdChat,
  MdNotifications,
  MdOutlineDashboard,
} from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUsers, FaCartPlus, FaBloggerB, FaAdversal } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory2, TbBrandBlogger } from "react-icons/tb";
import {
  RiCoupon2Fill,
  RiCoupon2Line,
  RiAdvertisementFill,
  RiAdvertisementLine,
} from "react-icons/ri";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="fs-5 text-center py-3 mb-0">
            <span className="text-white">Mo</span>
            <span>joy</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          defaultSelectedKeys={[""]}
          items={[
            {
              key: "",
              icon: <MdDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaUsers className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <MdShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <FaCartPlus className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaCartPlus className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <TbCategory2 className="fs-5" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <TbCategory2 className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <MdColorLens className="fs-4" />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <MdColorLens className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <MdViewList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "marketing",
              icon: <FaAdversal className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "voucher",
                  icon: <RiCoupon2Fill className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "voucher-list",
                  icon: <RiCoupon2Line className="fs-4" />,
                  label: "Coupon List",
                },
                {
                  key: "banner",
                  icon: <MdOutlineDashboard className="fs-4" />,
                  label: "HomePage Banner",
                },
                {
                  key: "advert",
                  icon: <RiAdvertisementFill className="fs-4" />,
                  label: "Add Advert",
                },
                {
                  key: "advert-list",
                  icon: <RiAdvertisementLine className="fs-4" />,
                  label: "Advert List",
                },
              ],
            },
            {
              key: "stores",
              icon: <MdStore className="fs-4" />,
              label: "Store",
              children: [
                {
                  key: "store",
                  icon: <MdOutlineStoreMallDirectory className="fs-4" />,
                  label: "Edit Store",
                },
              ],
            },
            {
              key: "enquiry",
              icon: <MdChat className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between px-3 pe-3"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <MdNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div
              className="d-flex gap-3 align-items-center"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div>
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <div>
                <h5 className="mb-0">MojoyAdmin</h5>
                <p className="mb-0">Mojoyadmin@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Sign Out
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="bottom-center"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
