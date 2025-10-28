# Voucher Management System - NextJS Frontend

Hệ thống quản lý voucher tích hợp với NestJS backend API.

## 🚀 Tính năng đã implement

### ✅ API Integration
- Tích hợp đầy đủ với NestJS voucher API
- Axios client với authentication tự động
- Error handling và retry logic

### ✅ Voucher Management
- Hiển thị danh sách voucher với pagination
- Tìm kiếm voucher theo mã
- Filter theo loại voucher (percentage/fixed)
- Filter theo trạng thái (active/expired/upcoming)
- Xóa voucher với confirmation
- Copy mã voucher vào clipboard

### ✅ Real-time Stats
- Tổng số voucher
- Voucher đang hoạt động
- Voucher sắp hết hạn
- Tổng số lượt sử dụng

### ✅ UX/UI Features
- Loading skeleton cho trải nghiệm mượt mà
- Toast notifications cho feedback
- Responsive design
- Dark mode support
- Error states with retry options

## 📁 Cấu trúc file

```
src/
├── api/
│   ├── axiosClient.ts      # Axios configuration với auth
│   └── voucher.ts          # Voucher API functions
├── hooks/
│   └── useVoucher.ts       # Custom hooks cho voucher operations
├── components/
│   ├── Toast.tsx           # Toast notification component
│   ├── VoucherSkeleton.tsx # Loading skeletons
│   └── Pagination.tsx      # Pagination component
├── lib/
│   ├── utils.ts           # General utilities
│   └── voucherUtils.ts    # Voucher-specific utilities
└── app/voucher/
    └── page.tsx           # Main voucher page
```

## 🔧 API Endpoints sử dụng

### Admin Endpoints
- `GET /voucher` - Lấy danh sách voucher với pagination/filter
- `GET /voucher/:id` - Lấy chi tiết voucher
- `POST /voucher` - Tạo voucher mới
- `PUT /voucher/:id` - Cập nhật voucher
- `DELETE /voucher/:id` - Xóa voucher
- `PATCH /voucher/:id/toggle` - Toggle trạng thái public/private
- `POST /voucher/:id/assign` - Gán voucher cho users
- `GET /voucher/:id/stats` - Thống kê voucher

### User Endpoints
- `GET /voucher/my` - Lấy voucher của user hiện tại

## 🎯 Cách sử dụng

### 1. Thiết lập môi trường
Đảm bảo `NEXT_PUBLIC_API_URL` được cấu hình đúng trong `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:6969
```

### 2. Authentication
System tự động lấy token từ:
- `localStorage.getItem("access_token")`
- Redux persist state (nếu có)

### 3. Sử dụng hooks

```tsx
// Lấy danh sách voucher
const { data, loading, error, updateParams, refresh } = useVouchers({
  page: 1,
  limit: 10,
  status: 'active'
});

// Thao tác với voucher
const { createVoucher, updateVoucher, deleteVoucher } = useVoucherMutations();

// Xóa voucher
await deleteVoucher(voucherId);
```

### 4. Filter và Search
```tsx
// Search theo mã voucher
updateParams({ search: 'SUMMER' });

// Filter theo trạng thái
updateParams({ status: 'active' });

// Filter theo loại
updateParams({ type: 'percentage' });

// Pagination
updateParams({ page: 2 });
```

## 🔄 Data Flow

1. **Component mount** → `useVouchers` hook → API call
2. **User action** (search/filter) → `updateParams` → New API call
3. **CRUD operations** → `useVoucherMutations` → API call → `refresh` data
4. **Success/Error** → Toast notification

## 📝 Type Safety

Tất cả API responses được type theo interface:
```tsx
interface Voucher {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  expiryDate: string;
  minOrderValue: number;
  usageLimit: number;
  isPublic: boolean;
  usedCount?: number;
  status?: 'active' | 'expired' | 'upcoming';
}
```

## 🎨 UI Components

### VoucherCard
- Gradient background với glass morphism effect
- Real-time usage progress bar
- Status badges với color coding
- Copy-to-clipboard functionality

### Loading States
- Skeleton loading cho better UX
- Animated placeholders
- Progressive data loading

### Error Handling
- User-friendly error messages
- Retry mechanisms
- Fallback UI states

## 🚀 Next Steps

### Planned Features
- [ ] Tạo/Sửa voucher modal
- [ ] Bulk operations (assign multiple vouchers)
- [ ] Voucher usage analytics charts
- [ ] Export voucher data
- [ ] Voucher templates
- [ ] Advanced filters (date range, usage count)
- [ ] Real-time notifications

### Performance Optimizations
- [ ] Virtual scrolling cho large lists
- [ ] Debounced search
- [ ] Optimistic updates
- [ ] Cache management với React Query

## 🐛 Troubleshooting

### Common Issues

1. **API không kết nối được**
   - Kiểm tra `NEXT_PUBLIC_API_URL`
   - Đảm bảo backend đang chạy
   - Kiểm tra CORS settings

2. **Authentication failed**
   - Kiểm tra token trong localStorage
   - Token có thể đã expired
   - Đăng nhập lại

3. **Data không load**
   - Kiểm tra network tab trong DevTools
   - Xem console errors
   - Thử refresh page

### Debug Mode

Bật debug logs bằng cách thêm vào browser console:
```javascript
localStorage.setItem('debug', 'voucher:*');
```

## 📞 Support

Nếu có vấn đề gì, hãy:
1. Kiểm tra console errors
2. Kiểm tra network requests
3. Kiểm tra backend logs
4. Tạo issue với detailed information