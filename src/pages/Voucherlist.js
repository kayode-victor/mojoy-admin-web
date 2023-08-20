import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getVouchers,
  deleteVoucher,
  resetState,
} from "../features/voucher/voucherSlice";
import CustomModal from "../components/CustomModal";

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
    title: "Expiry Date",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Voucherlist = () => {
  const [open, setOpen] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setvoucherId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getVouchers());
  }, [dispatch]);

  const voucherstate = useSelector((state) => state.voucher.vouchers);
  const data1 = [];

  for (let i = 0; i < voucherstate.length; i++) {
    data1.push({
      key: i + 1,
      name: voucherstate[i].name,
      expiry: new Date(voucherstate[i].expiry).toLocaleString(),
      discount: voucherstate[i].discount,

      action: (
        <>
          <div>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(voucherstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delVoucher = (e) => {
    dispatch(deleteVoucher(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getVouchers());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delVoucher(voucherId);
        }}
        title="Are sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Voucherlist;
