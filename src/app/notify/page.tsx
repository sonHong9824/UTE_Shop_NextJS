"use client";

import { 
  Bell, Plus, Send, Eye, Trash2, Users, 
  Mail, MessageSquare, Clock, CheckCircle 
} from "lucide-react";

const notifications = [
  { 
    id: 1,
    title: "Khuyến mãi Black Friday",
    message: "Giảm giá lên đến 50% cho tất cả sản phẩm. Nhanh tay đặt hàng ngay!",
    type: "promotion",
    recipients: "Tất cả khách hàng",
    recipientCount: 1234,
    channel: "email",
    status: "sent",
    sentDate: "21/10/2025 10:30",
    readCount: 856
  },
  { 
    id: 2,
    title: "Đơn hàng của bạn đã được giao",
    message: "Đơn hàng #ORD001 đã được giao thành công. Cảm ơn bạn đã mua hàng!",
    type: "order",
    recipients: "Khách hàng cụ thể",
    recipientCount: 1,
    channel: "push",
    status: "sent",
    sentDate: "21/10/2025 09:15",
    readCount: 1
  },
  { 
    id: 3,
    title: "Sản phẩm mới đã có mặt",
    message: "iPhone 15 Pro Max chính thức ra mắt. Đặt hàng ngay để nhận ưu đãi!",
    type: "product",
    recipients: "Khách hàng VIP",
    recipientCount: 85,
    channel: "sms",
    status: "scheduled",
    sentDate: "25/10/2025 08:00",
    readCount: 0
  },
  { 
    id: 4,
    title: "Nhắc nhở thanh toán",
    message: "Đơn hàng #ORD045 của bạn chưa được thanh toán. Vui lòng hoàn tất thanh toán.",
    type: "reminder",
    recipients: "Khách hàng cụ thể",
    recipientCount: 5,
    channel: "email",
    status: "draft",
    sentDate: null,
    readCount: 0
  },
];

const stats = [
  { label: "Đã gửi", value: "2,456", color: "blue", icon: Send },
  { label: "Đã đọc", value: "1,834", color: "green", icon: CheckCircle },
  { label: "Đang chờ", value: "12", color: "amber", icon: Clock },
  { label: "Nháp", value: "8", color: "gray", icon: Bell },
];

const templates = [
  { id: 1, name: "Chào mừng khách hàng mới", type: "welcome", icon: "👋" },
  { id: 2, name: "Xác nhận đơn hàng", type: "order", icon: "📦" },
  { id: 3, name: "Khuyến mãi", type: "promotion", icon: "🎉" },
  { id: 4, name: "Nhắc nhở giỏ hàng", type: "cart", icon: "🛒" },
];

export default function NotifyPage() {
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'promotion': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'order': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'product': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'reminder': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'sent': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'draft': return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Thông báo & Marketing</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gửi thông báo và email marketing đến khách hàng</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          <span>Tạo thông báo mới</span>
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

      {/* Quick Templates */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mẫu thông báo nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <button 
              key={template.id}
              className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{template.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">Tất cả</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã gửi
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã lên lịch
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Nháp
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                {getChannelIcon(notification.channel)}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status === 'sent' ? 'Đã gửi' : 
                         notification.status === 'scheduled' ? 'Đã lên lịch' : 'Nháp'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{notification.message}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{notification.recipients} ({notification.recipientCount})</span>
                  </div>
                  {notification.sentDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{notification.sentDate}</span>
                    </div>
                  )}
                  {notification.status === 'sent' && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{notification.readCount} đã đọc</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    Xem chi tiết
                  </button>
                  {notification.status === 'draft' && (
                    <button className="px-3 py-1.5 text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center gap-1">
                      <Send className="w-4 h-4" />
                      Gửi ngay
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}