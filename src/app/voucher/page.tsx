"use client";

import { 
  Gift, Plus, Edit, Trash2, Copy, Eye, Calendar, 
  Percent, DollarSign, Users, Tag, MoreVertical 
} from "lucide-react";

const vouchers = [
  { 
    id: 1,
    code: "SALE50",
    name: "Giảm 50% cho đơn đầu tiên",
    type: "percentage",
    value: 50,
    minOrder: "$50",
    maxDiscount: "$25",
    quantity: 100,
    used: 45,
    startDate: "01/10/2025",
    endDate: "31/12/2025",
    status: "active"
  },
  { 
    id: 2,
    code: "FREESHIP",
    name: "Miễn phí vận chuyển",
    type: "shipping",
    value: 0,
    minOrder: "$30",
    maxDiscount: "N/A",
    quantity: 500,
    used: 234,
    startDate: "15/10/2025",
    endDate: "15/11/2025",
    status: "active"
  },
  { 
    id: 3,
    code: "WELCOME20",
    name: "Chào mừng thành viên mới",
    type: "fixed",
    value: 20,
    minOrder: "$100",
    maxDiscount: "$20",
    quantity: 200,
    used: 156,
    startDate: "01/09/2025",
    endDate: "30/09/2025",
    status: "expired"
  },
  { 
    id: 4,
    code: "BLACKFRIDAY",
    name: "Black Friday Sale",
    type: "percentage",
    value: 30,
    minOrder: "$75",
    maxDiscount: "$50",
    quantity: 1000,
    used: 0,
    startDate: "25/11/2025",
    endDate: "27/11/2025",
    status: "scheduled"
  },
];

const stats = [
  { label: "Tổng voucher", value: "24", color: "blue", icon: Gift },
  { label: "Đang hoạt động", value: "12", color: "green", icon: Gift },
  { label: "Sắp hết hạn", value: "5", color: "amber", icon: Calendar },
  { label: "Đã sử dụng", value: "2,456", color: "purple", icon: Users },
];

export default function VoucherPage() {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'percentage': return Percent;
      case 'fixed': return DollarSign;
      case 'shipping': return Tag;
      default: return Gift;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'expired': return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
      case 'scheduled': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Đang hoạt động';
      case 'expired': return 'Đã hết hạn';
      case 'scheduled': return 'Đã lên lịch';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mã giảm giá</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Tạo và quản lý các chương trình khuyến mãi</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          <span>Tạo voucher mới</span>
        </button>
      </div>

      {/* Stats */}
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

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">Tất cả</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đang hoạt động
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã lên lịch
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Hết hạn
        </button>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => {
          const TypeIcon = getTypeIcon(voucher.type);
          const usagePercent = (voucher.used / voucher.quantity) * 100;
          
          return (
            <div key={voucher.id} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all relative overflow-hidden">
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher.status)}`}>
                      {getStatusText(voucher.status)}
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
                    <button className="p-1 hover:bg-white/10 rounded transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white/80 text-sm">{voucher.name}</p>
                </div>

                {/* Value */}
                <div className="bg-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Giảm giá</span>
                    <span className="font-semibold">
                      {voucher.type === 'percentage' ? `${voucher.value}%` : 
                       voucher.type === 'fixed' ? `$${voucher.value}` : 'Miễn phí'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Đơn tối thiểu</span>
                    <span>{voucher.minOrder}</span>
                  </div>
                </div>

                {/* Usage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/80">Đã sử dụng</span>
                    <span>{voucher.used} / {voucher.quantity}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all" 
                      style={{ width: `${usagePercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between text-sm text-white/80 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{voucher.startDate}</span>
                  </div>
                  <span>-</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{voucher.endDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Xem</span>
                  </button>
                  <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Sửa</span>
                  </button>
                  <button className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors backdrop-blur-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}