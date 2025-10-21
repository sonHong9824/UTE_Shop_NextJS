"use client";

import { 
  ShoppingCart, Search, Filter, MoreVertical, Eye, Truck, 
  CheckCircle, XCircle, Clock, Package, Download, Plus 
} from "lucide-react";

const orders = [
  { 
    id: "#ORD001", 
    customer: "Nguyễn Văn A", 
    email: "nguyenvana@example.com",
    date: "21/10/2025", 
    total: "$129.00", 
    status: "completed",
    items: 3,
    payment: "Đã thanh toán",
    shipping: "Giao hàng nhanh"
  },
  { 
    id: "#ORD002", 
    customer: "Trần Thị B", 
    email: "tranthib@example.com",
    date: "20/10/2025", 
    total: "$89.50", 
    status: "pending",
    items: 1,
    payment: "Chưa thanh toán",
    shipping: "Giao hàng tiêu chuẩn"
  },
  { 
    id: "#ORD003", 
    customer: "Lê Văn C", 
    email: "levanc@example.com",
    date: "19/10/2025", 
    total: "$199.99", 
    status: "processing",
    items: 5,
    payment: "Đã thanh toán",
    shipping: "Giao hàng hỏa tốc"
  },
  { 
    id: "#ORD004", 
    customer: "Phạm Thị D", 
    email: "phamthid@example.com",
    date: "18/10/2025", 
    total: "$156.00", 
    status: "shipping",
    items: 2,
    payment: "Đã thanh toán",
    shipping: "Giao hàng nhanh"
  },
  { 
    id: "#ORD005", 
    customer: "Hoàng Văn E", 
    email: "hoangvane@example.com",
    date: "17/10/2025", 
    total: "$75.00", 
    status: "cancelled",
    items: 1,
    payment: "Đã hoàn tiền",
    shipping: "N/A"
  },
];

const stats = [
  { label: "Tổng đơn hàng", value: "856", color: "blue", icon: ShoppingCart, change: "+12%" },
  { label: "Chờ xử lý", value: "45", color: "amber", icon: Clock, change: "+5%" },
  { label: "Đang giao", value: "123", color: "purple", icon: Truck, change: "+8%" },
  { label: "Hoàn thành", value: "654", color: "green", icon: CheckCircle, change: "+15%" },
];

export default function OrderPage() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'pending': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'processing': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'shipping': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'shipping': return 'Đang giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý đơn hàng</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Theo dõi và xử lý đơn hàng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            <span>Tạo đơn hàng</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">Tất cả (856)</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Chờ xử lý (45)
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đang xử lý (89)
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đang giao (123)
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Hoàn thành (654)
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã hủy (34)
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Filter className="w-5 h-5" />
              <span>Lọc</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Mã đơn</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Khách hàng</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Ngày đặt</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Sản phẩm</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Tổng tiền</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Thanh toán</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">{order.items} sản phẩm</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs ${
                      order.payment === 'Đã thanh toán' 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị 1-5 trong 856 đơn hàng</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              Trước
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}