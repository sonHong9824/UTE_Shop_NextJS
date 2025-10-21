"use client";

import { 
  Package, Search, Filter, MoreVertical, Edit, Trash2, Eye, 
  Plus, Download, TrendingUp, TrendingDown, AlertCircle 
} from "lucide-react";
import Image from "next/image";

const products = [
  { 
    id: 1, 
    name: "iPhone 15 Pro Max", 
    category: "Điện thoại",
    price: "$1,199", 
    stock: 45,
    sold: 234,
    status: "active",
    image: null,
    sku: "IP15PM-256"
  },
  { 
    id: 2, 
    name: "Samsung Galaxy S24", 
    category: "Điện thoại",
    price: "$999", 
    stock: 67,
    sold: 189,
    status: "active",
    image: null,
    sku: "SGS24-128"
  },
  { 
    id: 3, 
    name: "MacBook Pro M3", 
    category: "Laptop",
    price: "$2,499", 
    stock: 12,
    sold: 98,
    status: "low_stock",
    image: null,
    sku: "MBP-M3-512"
  },
  { 
    id: 4, 
    name: "AirPods Pro 2", 
    category: "Phụ kiện",
    price: "$249", 
    stock: 156,
    sold: 567,
    status: "active",
    image: null,
    sku: "APP2-WH"
  },
  { 
    id: 5, 
    name: "iPad Air M2", 
    category: "Tablet",
    price: "$599", 
    stock: 0,
    sold: 345,
    status: "out_of_stock",
    image: null,
    sku: "IPA-M2-256"
  },
];

const stats = [
  { label: "Tổng sản phẩm", value: "342", color: "blue", icon: Package, change: "+12" },
  { label: "Sắp hết hàng", value: "23", color: "amber", icon: AlertCircle, change: "-5" },
  { label: "Hết hàng", value: "8", color: "red", icon: TrendingDown, change: "+2" },
  { label: "Bán chạy", value: "45", color: "green", icon: TrendingUp, change: "+15" },
];

export default function ProductPage() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'low_stock': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'out_of_stock': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Còn hàng';
      case 'low_stock': return 'Sắp hết';
      case 'out_of_stock': return 'Hết hàng';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý sản phẩm</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Quản lý danh mục và kho hàng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            <span>Thêm sản phẩm</span>
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
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') 
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên, SKU..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <select className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white">
              <option>Tất cả danh mục</option>
              <option>Điện thoại</option>
              <option>Laptop</option>
              <option>Tablet</option>
              <option>Phụ kiện</option>
            </select>
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Sản phẩm</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">SKU</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Danh mục</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Giá</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Tồn kho</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Đã bán</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-mono">{product.sku}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${
                      product.stock === 0 
                        ? 'text-red-600 dark:text-red-400'
                        : product.stock < 20
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{product.sold}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </button>
                      <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
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
          <p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị 1-5 trong 342 sản phẩm</p>
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