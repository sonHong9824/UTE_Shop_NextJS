"use client";

import { Star, ThumbsUp, MoreVertical, Eye, Trash2, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";

const comments = [
  { 
    id: 1, 
    customer: "Nguyễn Văn A", 
    product: "iPhone 15 Pro Max", 
    rating: 5, 
    comment: "Sản phẩm rất tốt, giao hàng nhanh! Rất hài lòng với chất lượng và dịch vụ.", 
    date: "21/10/2025",
    likes: 12,
    status: "approved",
    hasImage: true
  },
  { 
    id: 2, 
    customer: "Trần Thị B", 
    product: "Samsung Galaxy S24", 
    rating: 4, 
    comment: "Tạm ổn, giá hơi cao nhưng chất lượng tốt.", 
    date: "20/10/2025",
    likes: 5,
    status: "pending",
    hasImage: false
  },
  { 
    id: 3, 
    customer: "Lê Văn C", 
    product: "MacBook Pro M3", 
    rating: 5, 
    comment: "Máy chạy mượt, pin trâu, rất đáng tiền!", 
    date: "19/10/2025",
    likes: 23,
    status: "approved",
    hasImage: true
  },
  { 
    id: 4, 
    customer: "Phạm Thị D", 
    product: "AirPods Pro 2", 
    rating: 3, 
    comment: "Chất lượng âm thanh ổn nhưng giá hơi đắt.", 
    date: "18/10/2025",
    likes: 3,
    status: "rejected",
    hasImage: false
  },
  { 
    id: 5, 
    customer: "Hoàng Văn E", 
    product: "iPad Air M2", 
    rating: 5, 
    comment: "Sản phẩm tuyệt vời, đúng như mô tả!", 
    date: "17/10/2025",
    likes: 18,
    status: "approved",
    hasImage: true
  },
];

const stats = [
  { label: "Tổng đánh giá", value: "1,234", color: "blue", icon: Star },
  { label: "Chờ duyệt", value: "45", color: "amber", icon: Star },
  { label: "Đã duyệt", value: "1,156", color: "green", icon: CheckCircle },
  { label: "Đã từ chối", value: "33", color: "red", icon: XCircle },
];

export default function CommentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Đánh giá sản phẩm</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Quản lý và phản hồi đánh giá từ khách hàng</p>
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
          Chờ duyệt (45)
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã duyệt
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          Đã từ chối
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
          5 sao
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {review.customer.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{review.customer}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        review.status === 'approved' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : review.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {review.status === 'approved' ? 'Đã duyệt' : review.status === 'pending' ? 'Chờ duyệt' : 'Đã từ chối'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Đánh giá: {review.product}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < review.rating 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-gray-300 dark:text-gray-700'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>

                {/* Image indicator */}
                {review.hasImage && (
                  <div className="flex gap-2 mb-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{review.date}</span>
                    <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {review.status === 'pending' && (
                      <>
                        <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Eye className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
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
  );
}