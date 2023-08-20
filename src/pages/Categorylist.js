import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductCategories,
  deleteProductCategory,
  resetState,
} from "../features/pcategory/pcategorySlice";
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
const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);

  const pCategorystate = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCategorystate.length; i++) {
    data1.push({
      key: i + 1,
      title: pCategorystate[i].title,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/category/${pCategorystate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(pCategorystate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delCategory = (e) => {
    dispatch(deleteProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product Categories List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCategory(categoryId);
        }}
        title="Are sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default Categorylist;
