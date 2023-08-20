import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Serial No.",
    dataIndex: "key",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Order Details",
    dataIndex: "product",
  },
  {
    title: "Address",
    dataIndex: "address",
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

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewProduct = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };
  let data1 = [];

  if (Array.isArray(orderState.orders)) {
    data1 = orderState.orders.map((order, index) => ({
      key: index + 1,
      name: `${order.user.firstname} ${order.user.lastname}`,
      product: (
        <Button type="link" onClick={() => handleViewProduct(order)}>
          View Order
        </Button>
      ),
      amount: order.totalPriceAfterDiscount / 100,
      address: order.shippingInfo.address + " " + order.shippingInfo.state,
      date: new Date(order.createdAt).toLocaleString(),
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
    }));
  }

  return (
    <div>
      <h3 className="mb-4 title">View Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <Modal
        title="Product Details"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {/* Display the product details from selectedOrder.orderItems here */}
        {selectedOrder &&
          selectedOrder.orderItems.map((item, index) => (
            <div key={index} className="border">
              <p>Product: {item.product.title}</p>
              <p>Color: {item.color.title}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Add more details here */}
            </div>
          ))}
      </Modal>
    </div>
  );
};

export default Orders;
