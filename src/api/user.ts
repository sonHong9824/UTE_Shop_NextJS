import axiosClient from "./axiosClient";

export const userApi = {
  async getNewUsers(params: {
    from?: string;
    to?: string;
    groupBy?: "day" | "month";
  }) {
    const res = await axiosClient.get("/admin/stats/users", { params });
    // Vì BE bọc response 2 tầng: { statusCode, message, data: { success, data } }
    return res.data; // => Mảng [{ date, users }]
  },
};
