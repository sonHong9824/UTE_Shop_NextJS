"use client";

import {
  Gift, Plus, Edit, Trash2, Copy, Eye, Calendar,
  Percent, DollarSign, Users, Tag, MoreVertical, Search,
  AlertCircle, RefreshCw
} from "lucide-react";
import { useVouchers, useVoucherMutations } from "@/hooks/useVoucher";
import { useState, useMemo } from "react";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
  copyToClipboard as copyText
} from "@/lib/voucherUtils";
import { useToast } from "@/components/Toast";
import { VoucherListSkeleton, StatsListSkeleton } from "@/components/VoucherSkeleton";
import { Pagination, PaginationInfo } from "@/components/Pagination";
import { type Voucher } from "@/types/Voucher";
import { VoucherModal } from "@/components/VoucherModal";
import { VoucherDetailModal } from "@/components/VoucherDetailModal";
import { VoucherEditModal } from "@/components/VoucherEditModal";
import { useStatsContext } from "@/contexts/StatsContext";

export default function VoucherPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'upcoming'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'percentage' | 'fixed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const { showToast, ToastContainer } = useToast();
  const { refreshStats } = useStatsContext();

  // Fetch vouchers with pagination and filters
  const {
    data: voucherData,
    loading,
    error,
    updateParams,
    refresh,
    params
  } = useVouchers({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const { deleteVoucher, toggleVoucherStatus, createVoucher, updateVoucher, loading: mutationLoading } = useVoucherMutations();

  // Filter vouchers based on search and filters
  const filteredVouchers = useMemo(() => {
    if (!voucherData?.data || !Array.isArray(voucherData.data)) return [];

    return voucherData.data.filter((voucher: Voucher) => {
      const matchesSearch = voucher.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || voucher.status === statusFilter;
      const matchesType = typeFilter === 'all' || voucher.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [voucherData?.data, searchTerm, statusFilter, typeFilter]);

  // Calculate stats from real data
  const stats = useMemo(() => {
    if (!voucherData?.data || !Array.isArray(voucherData.data)) {
      console.log('>>> tới đây');
      return [
        { label: "Tổng voucher", value: "0", color: "blue", icon: Gift },
        { label: "Đang hoạt động", value: "0", color: "green", icon: Gift },
        { label: "Sắp hết hạn", value: "0", color: "amber", icon: Calendar },
        { label: "Đã sử dụng", value: "0", color: "purple", icon: Users },
      ];
    }

    const total = voucherData.data.length;
    const active = voucherData.data.filter((v: Voucher) => v.status === 'active').length;
    const upcoming = voucherData.data.filter((v: Voucher) => v.status === 'upcoming').length;
    const totalUsed = voucherData.data.reduce((sum: number, v: Voucher) => sum + (v.usedCount || 0), 0);

    return [
      { label: "Tổng voucher", value: total.toString(), color: "blue", icon: Gift },
      { label: "Đang hoạt động", value: active.toString(), color: "green", icon: Gift },
      { label: "Sắp hết hạn", value: upcoming.toString(), color: "amber", icon: Calendar },
      { label: "Đã sử dụng", value: totalUsed.toString(), color: "purple", icon: Users },
    ];
  }, [voucherData?.data]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status: 'all' | 'active' | 'expired' | 'upcoming') => {
    setStatusFilter(status);
    if (status === 'all') {
      updateParams({ status: undefined });
    } else {
      updateParams({ status });
    }
  };

  const handleTypeFilter = (type: 'all' | 'percentage' | 'fixed') => {
    setTypeFilter(type);
    if (type === 'all') {
      updateParams({ type: undefined });
    } else {
      updateParams({ type });
    }
  };

  const handleDeleteVoucher = async (voucherId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      try {
        await deleteVoucher(voucherId);
        showToast('success', 'Xóa voucher thành công!');
        refresh();
        refreshStats(); // Refresh sidebar stats
      } catch (error) {
        showToast('error', 'Có lỗi xảy ra khi xóa voucher');
        console.error('Lỗi khi xóa voucher:', error);
      }
    }
  };

  const handleToggleStatus = async (voucherId: string) => {
    try {
      await toggleVoucherStatus(voucherId);
      showToast('success', 'Cập nhật trạng thái voucher thành công!');
      refresh();
      refreshStats(); // Refresh sidebar stats
    } catch (error) {
      showToast('error', 'Có lỗi xảy ra khi thay đổi trạng thái voucher');
      console.error('Lỗi khi thay đổi trạng thái voucher:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    const success = await copyText(text);
    if (success) {
      showToast('success', `Đã sao chép mã "${text}" vào clipboard!`);
    } else {
      showToast('error', 'Không thể sao chép mã voucher');
    }
  };

  const handleCreateVoucher = async (data: any) => {
    try {
      await createVoucher(data);
      showToast('success', 'Tạo voucher thành công!');
      refresh();
      refreshStats(); // Refresh sidebar stats
      setIsModalOpen(false);
    } catch (error: any) {
      showToast('error', error.message || 'Có lỗi xảy ra khi tạo voucher');
    }
  };

  const handleViewVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDetailModalOpen(true);
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsEditModalOpen(true);
  };

  const handleUpdateVoucher = async (id: string, data: any) => {
    try {
      await updateVoucher(id, data);
      showToast('success', 'Cập nhật voucher thành công!');
      refresh();
      refreshStats(); // Refresh sidebar stats
      setIsEditModalOpen(false);
      setSelectedVoucher(null);
    } catch (error: any) {
      showToast('error', error.message || 'Có lỗi xảy ra khi cập nhật voucher');
    }
  };

  const handleCloseModals = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedVoucher(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage': return Percent;
      case 'fixed': return DollarSign;
      case 'shipping': return Tag;
      default: return Gift;
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mã giảm giá</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Tạo và quản lý các chương trình khuyến mãi</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            <span>Tạo voucher mới</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm mã voucher..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => handleTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          >
            <option value="all">Tất cả loại</option>
            <option value="percentage">Phần trăm</option>
            <option value="fixed">Cố định</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="expired">Đã hết hạn</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && <VoucherListSkeleton />}

      {/* Stats */}
      {loading ? (
        <StatsListSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => handleStatusFilter('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${statusFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => handleStatusFilter('active')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${statusFilter === 'active'
            ? 'bg-blue-600 text-white'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          Đang hoạt động
        </button>
        <button
          onClick={() => handleStatusFilter('upcoming')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${statusFilter === 'upcoming'
            ? 'bg-blue-600 text-white'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          Sắp diễn ra
        </button>
        <button
          onClick={() => handleStatusFilter('expired')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${statusFilter === 'expired'
            ? 'bg-blue-600 text-white'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          Hết hạn
        </button>
      </div>

      {/* Vouchers Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVouchers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Gift className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Không có voucher nào
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Không tìm thấy voucher phù hợp với bộ lọc.'
                  : 'Chưa có voucher nào được tạo.'}
              </p>
            </div>
          ) : (
            filteredVouchers.map((voucher: Voucher) => {
              const TypeIcon = getTypeIcon(voucher.type);
              const usagePercent = voucher.usageLimit > 0
                ? ((voucher.usedCount || 0) / voucher.usageLimit) * 100
                : 0;

              return (
                <div key={voucher._id} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher.status || 'active')}`}>
                          {getStatusText(voucher.status || 'active')}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Code */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold">{voucher.code}</h3>
                        <button
                          onClick={() => copyToClipboard(voucher.code)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white/80 text-sm">
                        {voucher.type === 'percentage' ? 'Giảm phần trăm' : 'Giảm cố định'}
                      </p>
                    </div>

                    {/* Value */}
                    <div className="bg-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/80">Giảm giá</span>
                        <span className="font-semibold">
                          {voucher.type === 'percentage'
                            ? `${voucher.discountValue}%`
                            : formatCurrency(voucher.discountValue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80">Đơn tối thiểu</span>
                        <span>{formatCurrency(voucher.minOrderValue)}</span>
                      </div>
                    </div>

                    {/* Usage */}
                    {voucher.usageLimit > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/80">Đã sử dụng</span>
                          <span>{voucher.usedCount || 0} / {voucher.usageLimit}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white rounded-full h-2 transition-all"
                            style={{ width: `${usagePercent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center justify-between text-sm text-white/80 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(voucher.startDate)}</span>
                      </div>
                      <span>-</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(voucher.expiryDate)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewVoucher(voucher)}
                        className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Xem</span>
                      </button>
                      <button
                        onClick={() => handleEditVoucher(voucher)}
                        className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteVoucher(voucher._id)}
                        disabled={mutationLoading}
                        className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors backdrop-blur-sm disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && voucherData && voucherData.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <PaginationInfo
            currentPage={voucherData.page}
            totalPages={voucherData.totalPages}
            totalItems={voucherData.total}
            itemsPerPage={voucherData.limit}
          />
          <Pagination
            currentPage={voucherData.page}
            totalPages={voucherData.totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </div>
      )}

      {/* Voucher Modal */}
      <VoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateVoucher}
        loading={mutationLoading}
      />

      {/* Voucher Detail Modal */}
      <VoucherDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        voucher={selectedVoucher}
        onEdit={() => {
          setIsDetailModalOpen(false);
          setIsEditModalOpen(true);
        }}
      />

      {/* Voucher Edit Modal */}
      <VoucherEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        voucher={selectedVoucher}
        onSubmit={handleUpdateVoucher}
        loading={mutationLoading}
      />
    </div>
  );
}