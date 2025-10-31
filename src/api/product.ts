import axiosClient from "./axiosClient";

export const getTotalProducts = async (params = {}) => {
  const defaultParams = {
    page: 0,
    limit: 5,
    category: "",
  };

  const query = { ...defaultParams, ...params };

  return axiosClient.get("/products", { params: query });
};