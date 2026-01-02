import type { PaginationResponse } from "./baseresponse";
import type { WalletStatus } from "@/enum/status";
export interface WalletResource {
    id: string;
    walletNumber?: string;
    merchantName?: string;
    username?: string;
    status: WalletStatus;
    balance?: number;
    mail?: string;
    verified?: boolean;
}
export interface FilterWallets {
    keyword?: string;
    status?: WalletStatus;
    sort_by?: string;
}

export type WalletPaginationResponse = PaginationResponse<WalletResource>;
export type WalletResponse = WalletResource;


export interface PayLaterResource {
    id: string;
    username?: string;
    type?: string;
    requestedCreditLimit?: number;
    approvedLimit?: number;
    reason?: string;
    rejectionReason?: string;
    status: string;
    approvedBy?: string;
    appliedAt?: string; 
    processedAt?: string;
}

export interface FilterPayLaters {
    keyword: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
}
export type PayLaterPaginationResponse = PaginationResponse<PayLaterResource>;