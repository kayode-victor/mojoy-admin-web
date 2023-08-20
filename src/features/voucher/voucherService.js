import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getVouchers = async () => {
  const response = await axios.get(`${base_url}voucher/`);

  return response.data;
};
const getVoucher = async (id) => {
  const response = await axios.get(`${base_url}voucher/${id}`, config);
  return response.data;
};
const createVoucher = async (voucher) => {
  const response = await axios.post(`${base_url}voucher/`, voucher, config);
  return response.data;
};

const deleteVoucher = async (id) => {
  const response = await axios.delete(`${base_url}voucher/${id}`, config);
  return response.data;
};

const voucherService = {
  getVouchers,
  getVoucher,
  createVoucher,
  deleteVoucher,
};
export default voucherService;
