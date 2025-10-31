import { IUser } from "./user";
import { IProduct } from "./product";

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  isCommented?: boolean;
  _id?: string;
}

export interface IDeliveryAddress {
  _id: string;
  addressName: string;
  defaultAddress: boolean;
  nameBuyer: string;
  phoneNumber: string;
  note?: string;
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "delivering"
  | "delivered"
  | "completed"
  | "cancelled";

export interface IOrder {
  _id: string;
  user: IUser;
  items: IOrderItem[];
  totalPrice: number;
  usedXu?: number;
  statusOrder: OrderStatus;
  isDelivered?: boolean;
  voucher?: string | null;
  discountAmount?: number;
  deliveryAddressId?: IDeliveryAddress; // 👈 thêm địa chỉ giao hàng
  autoUpdate?: boolean | null;
  createdAt: string;
  updatedAt: string;
}
