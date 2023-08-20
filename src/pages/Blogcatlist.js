import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCategories,
  deleteBlogCategory,
  resetState,
} from "../features/blogcategory/bcategorySlice";
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

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bcategoryId, setbcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const bCategorystate = useSelector((state) => state.bcategory.bcategories);
  const data1 = [];
  for (let i = 0; i < bCategorystate.length; i++) {
    data1.push({
      key: i + 1,
      title: bCategorystate[i].title,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/blog-category/${bCategorystate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(bCategorystate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delBlogCategory = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delBlogCategory(bcategoryId);
        }}
        title="Are sure you want to delete this Blog Category?"
      />
    </div>
  );
};

export default Blogcatlist;
