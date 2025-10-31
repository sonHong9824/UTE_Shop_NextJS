"use client";

import { useEffect, useState } from "react";
import { orderApi } from "@/api/order";
import { IOrder } from "@/types/order";
import {
  Eye,
  Plus,
  X,
  CheckCircle,
  XCircle,
  Truck,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Toast";

export default function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { showToast, ToastContainer } = useToast();

  // 🧩 Load orders theo status
  const fetchOrders = async (statusFilter?: string) => {
    try {
      setLoading(true);
      const res = await orderApi.getAllOrders(statusFilter);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      showToast("error", "Không thể tải danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = (newStatus: string) => {
    setStatus(newStatus);
    fetchOrders(newStatus);
  };

  // 🧩 Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      showToast("success", `Cập nhật trạng thái thành công (${getStatusText(newStatus)})`);
      setShowModal(false);
      setStatus(newStatus); // 🔄 chuyển sang tab mới
      fetchOrders(newStatus); // 🔁 load danh sách tab mới
    } catch (error) {
      console.error(error);
      showToast("error", "Cập nhật trạng thái thất bại!");
    }
  };

  // 🧩 Màu theo trạng thái
  const getStatusColor = (status: string, isDelivered: boolean) => {
    if (status === "delivering" && isDelivered) return "bg-yellow-100 text-yellow-700"; // Chờ xác nhận
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "preparing":
        return "bg-blue-100 text-blue-700";
      case "delivering":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 🧩 Tên hiển thị trạng thái
  const getStatusText = (status: string, isDelivered?: boolean) => {
    if (status === "delivering" && isDelivered) return "Chờ xác nhận";
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "preparing":
        return "Đang chuẩn bị";
      case "delivering":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const calculateDiscountPrice = (price: number, discount: number) =>
    price - (price * discount) / 100;

  return (
    <div className="space-y-6 relative">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-gray-500">Theo dõi và xử lý đơn hàng</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Tạo đơn hàng</span>
        </button>
      </div>

      {/* ===== FILTER TABS ===== */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { key: "", label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "preparing", label: "Đang chuẩn bị" },
          { key: "delivering_false", label: "Đang giao" },
          { key: "delivering_true", label: "Chờ xác nhận" },
          { key: "delivered", label: "Đã giao" },
          { key: "cancelled", label: "Đã hủy" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleFilter(tab.key)}
            className={`px-4 py-2 rounded-lg border transition ${
              status === tab.key
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Đang tải dữ liệu...</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-gray-500">Không có đơn hàng nào.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6">Mã đơn</th>
                <th className="text-left py-3 px-6">Hình ảnh</th>
                <th className="text-left py-3 px-6">Khách hàng</th>
                <th className="text-left py-3 px-6">Ngày đặt</th>
                <th className="text-left py-3 px-6">Sản phẩm</th>
                <th className="text-left py-3 px-6">Tổng tiền</th>
                <th className="text-left py-3 px-6">Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium text-blue-600">
                    {order._id}
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src={order.items[0].product.images[0]?.url}
                      alt={order.items[0].product.name}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <p>{order.user?.username}</p>
                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-600">
                    {order.items.length} sản phẩm
                  </td>
                  <td className="py-3 px-6 font-semibold">
                    {order.totalPrice.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.statusOrder,
                        order.isDelivered
                      )}`}
                    >
                      {getStatusText(order.statusOrder, order.isDelivered)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-5 h-5 text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {showModal && selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Chi tiết đơn hàng #{selectedOrder._id}
              </h2>

              {/* Thông tin khách hàng */}
              <div className="space-y-3 mb-4">
                <p>
                  <strong>Khách hàng:</strong>{" "}
                  {selectedOrder.user?.username} ({selectedOrder.user?.email})
                </p>
                <p>
                  <strong>Địa chỉ giao hàng:</strong>{" "}
                  {selectedOrder.deliveryAddressId?.addressName} -{" "}
                  {selectedOrder.deliveryAddressId?.nameBuyer} -{" "}
                  {selectedOrder.deliveryAddressId?.phoneNumber}
                </p>
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>

              {/* Sản phẩm */}
              <div className="space-y-3 border-t pt-3">
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Giá gốc: {item.product.price.toLocaleString("vi-VN")}₫
                        </p>
                        <p className="text-sm text-green-600">
                          Sau giảm:{" "}
                          {calculateDiscountPrice(
                            item.product.price,
                            item.product.discount
                          ).toLocaleString("vi-VN")}
                          ₫
                        </p>
                      </div>
                    </div>
                    <p>x{item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Nút hành động */}
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold">
                  Tổng tiền:{" "}
                  {selectedOrder.totalPrice.toLocaleString("vi-VN")}₫
                </p>

                <div className="flex gap-2">
                  {selectedOrder.statusOrder === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(selectedOrder._id, "cancelled")
                        }
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        <XCircle className="w-4 h-4" /> Hủy
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(selectedOrder._id, "preparing")
                        }
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        <CheckCircle className="w-4 h-4" /> Duyệt
                      </button>
                    </>
                  )}

                  {selectedOrder.statusOrder === "preparing" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "delivering")
                      }
                      className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                    >
                      <Truck className="w-4 h-4" /> Giao hàng
                    </button>
                  )}

                  {selectedOrder.statusOrder === "delivering" &&
                    !selectedOrder.isDelivered && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(selectedOrder._id, "delivered")
                        }
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                      >
                        <Package className="w-4 h-4" /> Xác nhận giao
                      </button>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
