import { useState, useEffect } from 'react';
import { type PaginatedVoucherResponse, type QueryVoucherParams, type Voucher, type VoucherStats } from '@/types/Voucher';
import { voucherApi } from '@/api/voucher';

// Hook for fetching all vouchers with pagination and filters
export const useVouchers = (initialParams?: QueryVoucherParams) => {
    const [data, setData] = useState<PaginatedVoucherResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<QueryVoucherParams>(initialParams || {});

    const fetchVouchers = async (newParams?: QueryVoucherParams) => {
        try {
            setLoading(true);
            setError(null);
            const queryParams = newParams || params;
            const response = await voucherApi.getAllVouchers(queryParams);

            setData(response);
        } catch (err: any) {
            console.error('API Error:', err); // Debug log
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu voucher');
        } finally {
            setLoading(false);
        }
    };

    const updateParams = (newParams: Partial<QueryVoucherParams>) => {
        const updatedParams = { ...params, ...newParams };
        setParams(updatedParams);
        fetchVouchers(updatedParams);
    };

    const refresh = () => {
        fetchVouchers();
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    return {
        data,
        loading,
        error,
        params,
        updateParams,
        refresh,
        fetchVouchers,
    };
};

// Hook for fetching single voucher
export const useVoucher = (id: string | null) => {
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchVoucher = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await voucherApi.getVoucherById(id);
            setVoucher(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu voucher');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchVoucher();
        }
    }, [id]);

    return {
        voucher,
        loading,
        error,
        refresh: fetchVoucher,
    };
};

// Hook for voucher stats
export const useVoucherStats = (id: string | null) => {
    const [stats, setStats] = useState<VoucherStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await voucherApi.getVoucherStats(id);
            setStats(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải thống kê voucher');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStats();
        }
    }, [id]);

    return {
        stats,
        loading,
        error,
        refresh: fetchStats,
    };
};

// Hook for voucher mutations (create, update, delete)
export const useVoucherMutations = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createVoucher = async (data: any) => {
        try {
            setLoading(true);
            setError(null);
            const response = await voucherApi.createVoucher(data);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi tạo voucher';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateVoucher = async (id: string, data: any) => {
        try {
            setLoading(true);
            setError(null);
            const response = await voucherApi.updateVoucher(id, data);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật voucher';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteVoucher = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await voucherApi.deleteVoucher(id);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi xóa voucher';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const toggleVoucherStatus = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await voucherApi.toggleVoucherStatus(id);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi thay đổi trạng thái voucher';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const assignVoucherToUsers = async (id: string, userIds: string[]) => {
        try {
            setLoading(true);
            setError(null);
            await voucherApi.assignVoucherToUsers(id, { userIds });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi gán voucher cho users';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createVoucher,
        updateVoucher,
        deleteVoucher,
        toggleVoucherStatus,
        assignVoucherToUsers,
    };
};