import React, { useEffect } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";

const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.key - b.key,
  },

  {
    title: "Product Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Count",
    dataIndex: "count",
    sorter: (a, b) => a.product - b.product,
  },
  {
    title: "Total Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Vieworder = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  });
  const orderstate = useSelector((state) => state.auth.orderbyuser.products);
  console.log(orderstate);
  const data1 = [];
  for (let i = 0; i < orderstate.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i].product.title,
      brand: orderstate[i].product.brand,
      color: orderstate[i].color,
      count: orderstate[i].count,
      amount: orderstate[i].product.price,
      date: new Date(orderstate[i].product.createdAt).toLocaleString(),
      action: (
        <>
          <div>
            <Link className="fs-5 ms-3" to="">
              <MdEdit />
            </Link>
            <Link to="/">
              <MdDelete className="fs-5 ms-3 text-danger" />
            </Link>
          </div>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />{" "}
      </div>
    </div>
  );
};

export default Vieworder;
