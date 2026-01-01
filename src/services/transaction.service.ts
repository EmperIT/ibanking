import type { AxiosResponse } from "axios";
import httpClient from "@/config/axiosConfig";
import API_ROUTES from "@/config/apiRoutes";

import type {
    FilterTransactions,
    TransactionPaginationResponse,
    CreateCashTransaction,
    CreateCashTransactionResponse,
} from "@/types/transaction.type";

export const transactionService = {
    filterTransactions: async (data: FilterTransactions): Promise<TransactionPaginationResponse> => {  
        const response: AxiosResponse<TransactionPaginationResponse> = await httpClient.post<TransactionPaginationResponse>(API_ROUTES.transaction.filterTransactions, data);
        return response.data;
    },
    createCashTransaction: async (data: CreateCashTransaction): Promise<CreateCashTransactionResponse> => { 
        const response: AxiosResponse<CreateCashTransactionResponse> = await httpClient.post<CreateCashTransactionResponse>(API_ROUTES.transaction.createCash, data);
        return response.data;
    },
}