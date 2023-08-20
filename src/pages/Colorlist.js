import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  deleteColor,
  resetState,
} from "../features/color/colorSlice";
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

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const colorstate = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorstate.length; i++) {
    data1.push({
      key: i + 1,
      title: colorstate[i].title,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/color/${colorstate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(colorstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delColor(colorId);
        }}
        title="Are sure you want to delete this Color?"
      />
    </div>
  );
};

export default Colorlist;
