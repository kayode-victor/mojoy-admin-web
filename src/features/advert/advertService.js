import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAdverts = async () => {
  const response = await axios.get(`${base_url}advert/`);
  return response.data;
};
const getAdvert = async (id) => {
  const response = await axios.get(`${base_url}advert/${id}`, config);
  return response.data;
};
const createAdvert = async (advert) => {
  const response = await axios.post(`${base_url}advert/`, advert, config);

  return response.data;
};
const updateAdvert = async (advert) => {
  const response = await axios.put(
    `${base_url}advert/${advert.id}`,
    { title: advert.advertData.title, images: advert.advertData.images },
    config
  );
  return response.data;
};

const deleteAdvert = async (id) => {
  const response = await axios.delete(`${base_url}advert/${id}`, config);
  return response.data;
};

const advertService = {
  getAdverts,
  getAdvert,
  createAdvert,
  updateAdvert,
  deleteAdvert,
};
export default advertService;
