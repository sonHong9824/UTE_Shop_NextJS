export interface RevenueStat {
  date: string;       // ví dụ: "2025-09" hoặc "2025-09-28"
  revenue: number;    // tổng doanh thu
  orders: number;     // số đơn hàng
}

export interface RevenueResponse {
  success: boolean;
  data: RevenueStat[];
}

export interface RevenueParams {
  from?: string;      // "01/01/2025"
  to?: string;        // "01/01/2026"
  groupBy?: "day" | "month";
}