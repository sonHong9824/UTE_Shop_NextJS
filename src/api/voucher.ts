import { type AssignVoucherData, type CreateVoucherData, type PaginatedVoucherResponse, type QueryVoucherParams, type UpdateVoucherData, type Voucher, type VoucherStats } from "@/types/Voucher";
import axiosClient from "./axiosClient";

export const voucherApi = {
    // Get all vouchers with pagination and filters
    getAllVouchers: (params?: QueryVoucherParams): Promise<PaginatedVoucherResponse> => {
        const searchParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, value.toString());
                }
            });
        }

        const queryString = searchParams.toString();
        console.log('Query String:', queryString); // Debug log
        return axiosClient.get(`/voucher${queryString ? `?${queryString}` : ''}`);
    },

    // Get voucher by ID
    getVoucherById: (id: string): Promise<Voucher> => {
        return axiosClient.get(`/voucher/${id}`);
    },

    // Create new voucher
    createVoucher: (data: CreateVoucherData): Promise<Voucher> => {
        return axiosClient.post('/voucher', data);
    },

    // Update voucher
    updateVoucher: (id: string, data: UpdateVoucherData): Promise<Voucher> => {
        return axiosClient.put(`/voucher/${id}`, data);
    },

    // Delete voucher
    deleteVoucher: (id: string): Promise<void> => {
        return axiosClient.delete(`/voucher/${id}`);
    },

    // Assign voucher to users
    assignVoucherToUsers: (id: string, data: AssignVoucherData): Promise<void> => {
        return axiosClient.post(`/voucher/${id}/assign`, data);
    },

    // Get voucher stats
    getVoucherStats: (id: string): Promise<VoucherStats> => {
        return axiosClient.get(`/voucher/${id}/stats`);
    },

    // Toggle voucher status (public/private)
    toggleVoucherStatus: (id: string): Promise<Voucher> => {
        return axiosClient.patch(`/voucher/${id}/toggle`);
    },

    // Get user's vouchers
    getMyVouchers: (): Promise<Voucher[]> => {
        return axiosClient.get('/voucher/my');
    },
};