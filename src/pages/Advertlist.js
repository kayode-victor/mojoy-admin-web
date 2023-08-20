import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdverts,
  deleteAdvert,
  resetState,
} from "../features/advert/advertSlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const Advertlist = () => {
  const [open, setOpen] = useState(false);
  const [advertId, setadvertId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setadvertId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAdverts());
  }, [dispatch]);

  const advertstate = useSelector((state) => state.advert.adverts);
  const data1 = [];

  for (let i = 0; i < advertstate.length; i++) {
    data1.push({
      key: i + 1,
      title: advertstate[i].title,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/advert/${advertstate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(advertstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delAdvert = (e) => {
    dispatch(deleteAdvert(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAdverts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Advert List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delAdvert(advertId);
        }}
        title="Are sure you want to delete this Advert?"
      />
    </div>
  );
};

export default Advertlist;
