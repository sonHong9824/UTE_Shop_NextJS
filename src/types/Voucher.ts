export interface Voucher {
    _id: string;
    code: string;
    type: 'percentage' | 'fixed';
    discountValue: number;
    startDate: string;
    expiryDate: string;
    minOrderValue: number;
    usageLimit: number;
    isPublic: boolean;
    createdAt?: string;
    updatedAt?: string;
    usedCount?: number;
    status?: 'active' | 'expired' | 'upcoming';
}

export interface PaginatedVoucherResponse {
    data: Voucher[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface VoucherStats {
    voucherId: string;
    code: string;
    totalUsed: number;
    totalAssigned: number;
    totalUsedByUsers: number;
    usageLimit: number;
    remainingUsage: number;
    status: 'active' | 'expired' | 'upcoming';
}

export interface QueryVoucherParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: 'percentage' | 'fixed';
    isPublic?: boolean;
    status?: 'active' | 'expired' | 'upcoming';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateVoucherData {
    code: string;
    type: 'percentage' | 'fixed';
    discountValue: number;
    startDate: string;
    expiryDate: string;
    minOrderValue: number;
    usageLimit: number;
    isPublic: boolean;
}

export interface UpdateVoucherData extends Partial<CreateVoucherData> { }

export interface AssignVoucherData {
    userIds: string[];
}