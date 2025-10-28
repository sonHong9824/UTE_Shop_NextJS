import { X, Calendar, Percent, DollarSign, Users, Eye, Gift } from "lucide-react";
import { type Voucher } from "@/types/Voucher";
import { formatCurrency, formatDate, getStatusColor, getStatusText } from "@/lib/voucherUtils";

interface VoucherDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    voucher: Voucher | null;
    onEdit?: () => void;
}

export const VoucherDetailModal = ({ isOpen, onClose, voucher, onEdit }: VoucherDetailModalProps) => {
    if (!isOpen || !voucher) return null;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'percentage': return Percent;
            case 'fixed': return DollarSign;
            default: return Gift;
        }
    };

    const TypeIcon = getTypeIcon(voucher.type);
    const usagePercent = voucher.usageLimit > 0
        ? ((voucher.usedCount || 0) / voucher.usageLimit) * 100
        : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <TypeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Chi tiết voucher
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">{voucher.code}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(voucher.status || 'active')}`}>
                            {getStatusText(voucher.status || 'active')}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Tạo: {formatDate(voucher.createdAt || voucher.startDate)}</span>
                        </div>
                    </div>

                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin cơ bản</h3>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mã voucher
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-lg">
                                        {voucher.code}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Loại giảm giá
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        {voucher.type === 'percentage' ? 'Phần trăm (%)' : 'Cố định (VNĐ)'}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Giá trị giảm
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg font-semibold text-lg">
                                        {voucher.type === 'percentage'
                                            ? `${voucher.discountValue}%`
                                            : formatCurrency(voucher.discountValue)}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Đơn hàng tối thiểu
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        {formatCurrency(voucher.minOrderValue)}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Trạng thái
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        {voucher.isPublic ? 'Công khai' : 'Riêng tư'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Usage & Dates */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sử dụng & Thời gian</h3>

                            <div className="space-y-3">
                                {/* Usage Stats */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Thống kê sử dụng
                                    </label>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Đã sử dụng</span>
                                            <span className="font-semibold">
                                                {voucher.usedCount || 0} / {voucher.usageLimit || 'Không giới hạn'}
                                            </span>
                                        </div>
                                        {voucher.usageLimit > 0 && (
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 rounded-full h-2 transition-all"
                                                    style={{ width: `${usagePercent}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Dates */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Ngày bắt đầu
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{formatDate(voucher.startDate)}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Ngày hết hạn
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{formatDate(voucher.expiryDate)}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Cập nhật lần cuối
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{formatDate(voucher.updatedAt || voucher.createdAt || voucher.startDate)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Usage Limit Info */}
                    {voucher.usageLimit > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Giới hạn sử dụng</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                        Voucher này có thể được sử dụng tối đa {voucher.usageLimit} lần.
                                        Hiện tại đã được sử dụng {voucher.usedCount || 0} lần
                                        ({voucher.usageLimit - (voucher.usedCount || 0)} lần còn lại).
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Public/Private Info */}
                    <div className={`${voucher.isPublic ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'} border rounded-lg p-4`}>
                        <div className="flex items-start gap-3">
                            <Eye className={`w-5 h-5 mt-0.5 ${voucher.isPublic ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                            <div>
                                <h4 className={`font-semibold ${voucher.isPublic ? 'text-green-900 dark:text-green-100' : 'text-amber-900 dark:text-amber-100'}`}>
                                    {voucher.isPublic ? 'Voucher công khai' : 'Voucher riêng tư'}
                                </h4>
                                <p className={`text-sm mt-1 ${voucher.isPublic ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                                    {voucher.isPublic
                                        ? 'Voucher này có thể được tìm thấy và sử dụng bởi tất cả người dùng.'
                                        : 'Voucher này chỉ có thể được sử dụng khi được gán trực tiếp cho người dùng.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Đóng
                    </button>
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            Chỉnh sửa
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};