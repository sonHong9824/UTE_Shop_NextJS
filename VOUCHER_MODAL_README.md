# Voucher Management - Modal Create Feature

## 🎯 Tính năng mới: Modal tạo voucher

### ✅ Đã hoàn thành:

1. **VoucherModal Component** (`/src/components/VoucherModal.tsx`)
   - Form validation đầy đủ
   - Responsive design
   - Error handling
   - Loading states
   - Date validation
   - Type-specific validation (percentage ≤ 100%)

2. **Integration với Page** (`/src/app/voucher/page.tsx`)
   - Modal state management
   - API integration với `createVoucher`
   - Toast notifications
   - Auto refresh sau khi tạo thành công

3. **Backend Response Fix** (`voucher.service.ts`)
   - Sửa `createVoucher` trả về `VoucherResponseDto` format
   - Consistent response structure

## 🔧 Cách sử dụng:

1. **Mở trang voucher** → `/voucher`
2. **Click nút "Tạo voucher mới"** → Modal hiện ra
3. **Điền form:**
   - Mã voucher (bắt buộc)
   - Loại: Phần trăm hoặc Cố định
   - Giá trị giảm (bắt buộc)
   - Ngày bắt đầu (tùy chọn, mặc định là hiện tại)
   - Ngày hết hạn (bắt buộc)
   - Giá trị đơn hàng tối thiểu
   - Giới hạn sử dụng (0 = không giới hạn)
   - Voucher công khai/riêng tư

4. **Click "Tạo voucher"** → API call → Toast notification → Modal đóng → List refresh

## 🎨 UI/UX Features:

- **Responsive modal** - Hoạt động tốt trên mobile
- **Real-time validation** - Lỗi hiển thị ngay khi nhập
- **Loading states** - Button disabled khi đang tạo
- **Toast feedback** - Thông báo thành công/lỗi
- **Auto focus** - Tự động focus vào field đầu tiên
- **Escape to close** - Nhấn ESC để đóng modal

## 🔍 Validation Rules:

- **Mã voucher**: Bắt buộc, tự động uppercase
- **Giá trị giảm**: 
  - Phần trăm: 1-100%
  - Cố định: > 0 VNĐ
- **Ngày hết hạn**: Phải trong tương lai
- **Ngày bắt đầu**: Phải trước ngày hết hạn
- **Giá trị đơn hàng**: ≥ 0
- **Giới hạn sử dụng**: ≥ 0

## 🚀 Test Cases:

### ✅ Happy Path:
```
Mã: SUMMER2025
Loại: Phần trăm
Giá trị: 20%
Ngày hết hạn: 31/12/2025
→ Tạo thành công
```

### ❌ Error Cases:
```
1. Mã trống → "Mã voucher là bắt buộc"
2. Giá trị 0 → "Giá trị giảm giá phải lớn hơn 0"
3. Phần trăm > 100% → "Giá trị phần trăm không được vượt quá 100%"
4. Ngày hết hạn trong quá khứ → "Ngày hết hạn phải trong tương lai"
5. Mã trùng → "Mã voucher đã tồn tại" (từ API)
```

## 🔧 Technical Details:

### API Endpoint:
```
POST /voucher
Content-Type: application/json
Authorization: Bearer <token>

Body: {
  "code": "SUMMER2025",
  "type": "percentage",
  "discountValue": 20,
  "startDate": "2025-10-28T00:00:00.000Z",
  "expiryDate": "2025-12-31T23:59:59.000Z",
  "minOrderValue": 100000,
  "usageLimit": 100,
  "isPublic": true
}
```

### Response:
```json
{
  "_id": "...",
  "code": "SUMMER2025",
  "type": "percentage",
  "discountValue": 20,
  "startDate": "2025-10-28T00:00:00.000Z",
  "expiryDate": "2025-12-31T23:59:59.000Z",
  "minOrderValue": 100000,
  "usageLimit": 100,
  "isPublic": true,
  "createdAt": "2025-10-28T10:00:00.000Z",
  "updatedAt": "2025-10-28T10:00:00.000Z",
  "usedCount": 0,
  "status": "active"
}
```

## 🐛 Troubleshooting:

1. **Modal không hiện** → Check `isModalOpen` state
2. **Form không submit** → Check validation errors trong console
3. **API error** → Check network tab, token, CORS
4. **Toast không hiện** → Check `ToastContainer` đã import
5. **List không refresh** → Check `refresh()` function call

## 🎯 Next Steps:

- [ ] Edit voucher modal
- [ ] Delete confirmation modal  
- [ ] Bulk create vouchers
- [ ] Voucher preview
- [ ] Advanced filters in modal
- [ ] Image upload for voucher
- [ ] Voucher templates