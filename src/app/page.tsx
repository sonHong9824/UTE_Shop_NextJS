"use client";

import { orderApi } from "@/api/order";
import { getTotalProducts } from "@/api/product";
import { userApi } from "@/api/user";
import { RevenueStat } from "@/types/revenue.dto";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Filter,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface UserStats {
  date: string;
  users: number;
}

const recentOrders = [
  { id: "#ORD001", customer: "Nguyễn Văn A", total: "$129.00", status: "completed" },
  { id: "#ORD002", customer: "Trần Thị B", total: "$89.50", status: "pending" },
  { id: "#ORD003", customer: "Lê Văn C", total: "$199.99", status: "processing" },
  { id: "#ORD004", customer: "Phạm Thị D", total: "$156.00", status: "completed" },
];

export default function DashboardPage() {
    // Dữ liệu trả về từ API
  const [order, setOrder] = useState<RevenueStat[]>([]);

  // Các biến điều khiển bộ lọc
  const [from, setFrom] = useState<Dayjs | null>(dayjs("2025-01-01"));
  const [to, setTo] = useState<Dayjs | null>(dayjs("2026-01-01"));
  const [groupBy, setGroupBy] = useState<"day" | "month">("month");
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [salesData, setSalesData] = useState<{ month: string; orders: number }[]>([]);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleFilter = async () => {
    try {
      const res = await orderApi.getRevenue({
        from: from?.format('YYYY-MM-DD'),
        to: to?.format('YYYY-MM-DD'),
        groupBy,
      });
      setOrder(res);

      console.log("Revenue Data:", res);

      const total = res.reduce((sum, item) => sum + item.revenue, 0);
      console.log("Total Revenue:", total);
      setTotalRevenue(total);

      const totalOrders = res.reduce((sum, item) => sum + item.orders, 0);
      console.log("Total Orders:", totalOrders);
      setTotalOrders(totalOrders);

      const formatted = res.map((item: any) => ({
        month: item.date,
        orders: item.orders,
        revenue: item.revenue
      }));
    
      setSalesData(formatted);

      const userRes = await userApi.getNewUsers({
        from: from?.format("YYYY-MM-DD"),
        to: to?.format("YYYY-MM-DD"),
        groupBy,
      });
      console.log("User Stats:", userRes);
      setUserStats(userRes);

      const totalUsers = userRes.reduce((sum, item) => sum + item.users, 0);
      console.log("Total Users:", totalUsers);
      setTotalUsers(totalUsers);

      const productRes = await getTotalProducts();
      console.log("productRes", productRes)
      // Giả sử API trả về { statusCode: 200, data: { total: 42, products: [...] } }
      const totalProducts = productRes.pagination?.totalProducts
      console.log("Total Product:", totalProducts)
      setTotalProducts(totalProducts);
    } catch (err) {
      console.error("Error fetching order:", err);
    }

  };

  useEffect(() => {
    handleFilter(); // gọi 1 lần khi load
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
       {/* Left side */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tổng quan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Chào mừng trở lại! Đây là tổng quan về cửa hàng của bạn.
        </p>
      </div>

      {/* Right side (Filter controls) */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md">
          <DatePicker
            label="Từ ngày"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            format="DD/MM/YYYY"
            slotProps={{
              textField: { size: "small", sx: { minWidth: 140 } },
            }}
          />
          <DatePicker
            label="Đến ngày"
            value={to}
            onChange={(newValue) => setTo(newValue)}
            format="DD/MM/YYYY"
            slotProps={{
              textField: { size: "small", sx: { minWidth: 140 } },
            }}
          />
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all"
          >
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
        </div>
      </LocalizationProvider>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <DollarSign />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
              <span>12%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalRevenue} VND</h3>
          <p className="text-blue-100 text-sm">Tổng doanh thu</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
              <span>8%</span>
            </div>
          </div>
            <h3 className="text-3xl font-bold mb-1">{totalOrders.toLocaleString()}</h3>
          <p className="text-amber-100 text-sm">Đơn hàng</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
              <span>23%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">  
            {totalUsers}
          </h3>
          <p className="text-green-100 text-sm">Khách hàng</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Package className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <ArrowDownRight className="w-4 h-4" />
              <span>3%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalProducts}</h3>
          <p className="text-purple-100 text-sm">Sản phẩm</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Doanh thu theo tháng (LineChart dùng revenue) --- */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Doanh thu theo tháng</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis 
                  stroke="#6B7280" 
                  tickFormatter={(value) => {
                    // Format VNĐ ngắn gọn, ví dụ 1,000,000 -> 1M
                    if (value >= 1_000_000) return `${(value/1_000_000).toFixed(1)}M`;
                    if (value >= 1_000) return `${(value/1_000).toFixed(1)}k`;
                    return value.toString();
                  }}
                />
                <Tooltip
                  formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                  labelStyle={{ color: "#fff" }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Doanh thu (VND)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Đơn hàng theo tháng (BarChart dùng orders) --- */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đơn hàng theo tháng</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="orders" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Số đơn" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      {/* --- Người dùng mới theo tháng --- */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Người dùng mới theo tháng
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" allowDecimals={false} />
              <Tooltip
                formatter={(value: number) => [`${value}`, "Người dùng"]}
                labelStyle={{ color: "#fff" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Người dùng mới"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}