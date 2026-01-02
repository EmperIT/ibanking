// types/transaction.type.ts
import { TransactionStatus, ActionType } from "@/enum/status";
import type {PaginationResponse} from "./baseresponse";
export interface TransactionResource {
  id: string;
  sourceAccountNumber?: string;
  toWalletNumber?: string;
  amount?: number;
  sourceBalanceUpdated?: number;
  destinationBalanceUpdated?: string;
  description?: string;
  status?: TransactionStatus;
  metaData?: string;
  processedAt?: string;
}

export interface FilterTransactions {
  accountNumber?: string;
  accountType?: "WALLET" | "PAY_LATER";
  type?: ActionType;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
}


export interface CreateCashTransaction {
  actionType: ActionType;
  amount: number;
  sourceWalletNumber: string;
}

export type TransactionPaginationResponse = PaginationResponse<TransactionResource>;
export type CreateCashTransactionResponse = {
  transactionId: string;
};