import { useState, useEffect } from 'react';
import { voucherApi } from '@/api/voucher';

interface SidebarStats {
    totalVouchers: number;
    activeVouchers: number;
    pendingOrders: number;
    totalUsers: number;
    pendingComments: number;
    notifications: number;
}

export const useSidebarStats = () => {
    const [stats, setStats] = useState<SidebarStats>({
        totalVouchers: 0,
        activeVouchers: 0,
        pendingOrders: 12, // Tạm thời dùng giá trị cố định cho các module chưa có API
        totalUsers: 0,
        pendingComments: 5,
        notifications: 8,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);

            // Lấy thống kê voucher
            const voucherResponse = await voucherApi.getAllVouchers({ limit: 1 }); // Chỉ cần metadata
            const totalVouchers = voucherResponse.total || 0;

            // Lấy voucher đang hoạt động
            const activeVoucherResponse = await voucherApi.getAllVouchers({
                limit: 1,
                status: 'active'
            });
            const activeVouchers = activeVoucherResponse.total || 0;

            setStats(prev => ({
                ...prev,
                totalVouchers,
                activeVouchers,
            }));

        } catch (err: any) {
            console.error('Error fetching sidebar stats:', err);
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải thống kê');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const refresh = () => {
        console.log('Refreshing sidebar stats...');
        fetchStats();
    }; return {
        stats,
        loading,
        error,
        refresh,
    };
};