import { RevenueParams, RevenueResponse } from "@/types/revenue.dto";
import axiosClient from "./axiosClient";
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
    axiosClient.get<RevenueResponse>("/admin/stats/revenue", { params }),
};