// Utility functions for voucher formatting and calculations

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getVoucherStatus = (startDate: string, expiryDate: string): 'active' | 'expired' | 'upcoming' => {
    const now = new Date();
    const start = new Date(startDate);
    const expiry = new Date(expiryDate);

    if (now < start) {
        return 'upcoming';
    } else if (now > expiry) {
        return 'expired';
    } else {
        return 'active';
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
            return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
        case 'expired':
            return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
        case 'upcoming':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
        default:
            return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
};

export const getStatusText = (status: string) => {
    switch (status) {
        case 'active': return 'Đang hoạt động';
        case 'expired': return 'Đã hết hạn';
        case 'upcoming': return 'Sắp diễn ra';
        default: return status;
    }
};

export const calculateUsagePercentage = (used: number, total: number): number => {
    if (total === 0) return 0;
    return Math.min((used / total) * 100, 100);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const isVoucherExpiringSoon = (expiryDate: string, daysThreshold: number = 7): boolean => {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
};