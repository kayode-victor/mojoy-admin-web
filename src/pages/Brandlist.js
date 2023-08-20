import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
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

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const brandstate = useSelector((state) => state.brand.brands);
  const data1 = [];

  for (let i = 0; i < brandstate.length; i++) {
    data1.push({
      key: i + 1,
      title: brandstate[i].title,
      action: (
        <>
          <div>
            <Link
              className="fs-5 ms-3"
              to={`/admin/brand/${brandstate[i]._id}`}
            >
              <MdEdit />
            </Link>
            <button
              className="ms-3 fs-5 text-danger bg-transparent border-0"
              onClick={() => showModal(brandstate[i]._id)}
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const delBrand = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Brands List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delBrand(brandId);
        }}
        title="Are sure you want to delete this Brand?"
      />
    </div>
  );
};

export default Brandlist;
