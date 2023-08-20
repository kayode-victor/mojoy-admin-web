import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",

    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Sold",
    dataIndex: "sold",
    sorter: (a, b) => a.sold - b.sold,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productstate = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productstate.length; i++) {
    data1.push({
      key: i + 1,
      title: productstate[i].title,
      category: productstate[i].category,
      brand: productstate[i].brand,
      price: `₦ ${productstate[i].price}`,
      quantity: productstate[i].quantity,
      sold: productstate[i].sold,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/product/${productstate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(productstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delProduct = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delProduct(productId);
        }}
        title="Are sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
