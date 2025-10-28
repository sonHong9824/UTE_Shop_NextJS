import { useState } from "react";
import { X, Calendar, Percent, DollarSign } from "lucide-react";
import { type CreateVoucherData } from "@/types/Voucher";

interface VoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateVoucherData) => Promise<void>;
    loading?: boolean;
}

export const VoucherModal = ({ isOpen, onClose, onSubmit, loading = false }: VoucherModalProps) => {
    const [formData, setFormData] = useState<CreateVoucherData>({
        code: "",
        type: "percentage",
        discountValue: 0,
        startDate: "",
        expiryDate: "",
        minOrderValue: 0,
        usageLimit: 0,
        isPublic: true,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let processedValue: any = value;

        if (type === "number") {
            processedValue = parseFloat(value) || 0;
        } else if (type === "checkbox") {
            processedValue = (e.target as HTMLInputElement).checked;
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.code.trim()) {
            newErrors.code = "Mã voucher là bắt buộc";
        }

        if (formData.discountValue <= 0) {
            newErrors.discountValue = "Giá trị giảm giá phải lớn hơn 0";
        }

        if (formData.type === "percentage" && formData.discountValue > 100) {
            newErrors.discountValue = "Giá trị phần trăm không được vượt quá 100%";
        }

        if (!formData.expiryDate) {
            newErrors.expiryDate = "Ngày hết hạn là bắt buộc";
        }

        if (formData.startDate && formData.expiryDate) {
            const startDate = new Date(formData.startDate);
            const expiryDate = new Date(formData.expiryDate);

            if (expiryDate <= startDate) {
                newErrors.expiryDate = "Ngày hết hạn phải sau ngày bắt đầu";
            }

            if (expiryDate <= new Date()) {
                newErrors.expiryDate = "Ngày hết hạn phải trong tương lai";
            }
        }

        if (formData.minOrderValue < 0) {
            newErrors.minOrderValue = "Giá trị đơn hàng tối thiểu không được âm";
        }

        if (formData.usageLimit < 0) {
            newErrors.usageLimit = "Giới hạn sử dụng không được âm";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Prepare data for submission
            const submitData: CreateVoucherData = {
                ...formData,
                code: formData.code.toUpperCase().trim(),
                startDate: formData.startDate || new Date().toISOString(),
                expiryDate: formData.expiryDate,
            };

            await onSubmit(submitData);

            // Reset form on success
            setFormData({
                code: "",
                type: "percentage",
                discountValue: 0,
                startDate: "",
                expiryDate: "",
                minOrderValue: 0,
                usageLimit: 0,
                isPublic: true,
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error("Error creating voucher:", error);
        }
    };

    const handleClose = () => {
        setFormData({
            code: "",
            type: "percentage",
            discountValue: 0,
            startDate: "",
            expiryDate: "",
            minOrderValue: 0,
            usageLimit: 0,
            isPublic: true,
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Tạo voucher mới
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Voucher Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mã voucher *
                        </label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="VD: SUMMER2025"
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                }`}
                        />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    {/* Type and Discount Value */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Loại giảm giá *
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="percentage">Phần trăm (%)</option>
                                <option value="fixed">Cố định (VNĐ)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Giá trị giảm *
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="discountValue"
                                    value={formData.discountValue}
                                    onChange={handleInputChange}
                                    min="0"
                                    max={formData.type === "percentage" ? "100" : undefined}
                                    step={formData.type === "percentage" ? "1" : "1000"}
                                    className={`w-full px-4 py-2 pr-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.discountValue ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                        }`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {formData.type === "percentage" ? (
                                        <Percent className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                            </div>
                            {errors.discountValue && <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>}
                        </div>
                    </div>

                    {/* Start Date and Expiry Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ngày bắt đầu
                            </label>
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ngày hết hạn *
                            </label>
                            <input
                                type="datetime-local"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                    }`}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                    </div>

                    {/* Min Order Value and Usage Limit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Giá trị đơn hàng tối thiểu (VNĐ)
                            </label>
                            <input
                                type="number"
                                name="minOrderValue"
                                value={formData.minOrderValue}
                                onChange={handleInputChange}
                                min="0"
                                step="1000"
                                placeholder="0"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.minOrderValue ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                    }`}
                            />
                            {errors.minOrderValue && <p className="text-red-500 text-sm mt-1">{errors.minOrderValue}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Giới hạn sử dụng
                            </label>
                            <input
                                type="number"
                                name="usageLimit"
                                value={formData.usageLimit}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="0 = Không giới hạn"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.usageLimit ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                    }`}
                            />
                            {errors.usageLimit && <p className="text-red-500 text-sm mt-1">{errors.usageLimit}</p>}
                        </div>
                    </div>

                    {/* Public/Private */}
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={formData.isPublic}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Voucher công khai (người dùng có thể tìm thấy và sử dụng)
                            </span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Đang tạo..." : "Tạo voucher"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};