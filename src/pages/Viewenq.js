import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const Viewenq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqstate = useSelector((state) => state.enquiry);
  const { EnqName, EnqMobile, EnqEmail, EnqComment } = enqstate;

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [dispatch, getEnqId]);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-2"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" />
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Name:</h5>
          <h6 className="mb-0">{EnqName}</h6>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Email:</h5>
          <h6 className="mb-0">
            <a href={`mailto:${EnqEmail}`}>{EnqEmail}</a>
          </h6>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Mobile:</h5>
          <h6 className="mb-0">
            <a href={`tel:+234${EnqMobile}`}>{EnqMobile}</a>
          </h6>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Comment:</h5>
          <h6 className="mb-0">{EnqComment}</h6>
        </div>
      </div>
    </div>
  );
};

export default Viewenq;
