import { RevenueParams, RevenueResponse } from "@/types/revenue.dto";
import axiosClient from "./axiosClient";
import { IOrder } from "@/types/order";
export const orderApi = {
    /**
   * Lấy thống kê doanh thu theo ngày hoặc tháng
   * @param {Object} params - Các tham số lọc
   * @param {string} params.from - Ngày bắt đầu (VD: "01/01/2025")
   * @param {string} params.to - Ngày kết thúc (VD: "01/01/2026")
   * @param {string} params.groupBy - Kiểu nhóm ('day' | 'month')
   * @returns {Promise<{success: boolean, data: Array<{date: string, revenue: number, orders: number}>}>}
   */
    getRevenue: (params: RevenueParams) =>
    axiosClient.get<RevenueResponse>("/admin/orders/stats/revenue", { params }),

    getAllOrders: async (status?: string): Promise<{ data: { orders: IOrder[] } }> => {
        const params = status ? { status } : {};
        return axiosClient.get("/admin/orders", { params });
    },


    updateOrderStatus: async (orderId: string, newStatusOrder: string): Promise<IOrder> => {
        const res = await axiosClient.put(`/admin/orders/${orderId}`, { newStatusOrder });
        return res.data.data;
    },

};
