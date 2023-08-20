import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
} from "../features/enquiry/enquirySlice";
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
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Phone Number",
    dataIndex: "mobile",
  },
  {
    title: "Message",
    dataIndex: "comment",
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
const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const enqstate = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];

  for (let i = 0; i < enqstate.length; i++) {
    data1.push({
      key: i + 1,
      email: enqstate[i].email,
      mobile: enqstate[i].mobile,
      comment: enqstate[i].comment,
      date: new Date(enqstate[i].createdAt).toLocaleString(),
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3 text-danger"
              to={`/admin/enquiry/${enqstate[i]._id}`}
            >
              <MdOutlineRemoveRedEye />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(enqstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delEnq = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquires</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delEnq(enquiryId);
        }}
        title="Are sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
