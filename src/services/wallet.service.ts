import type { AxiosResponse } from "axios";
import httpClient from "@/config/axiosConfig";
import API_ROUTES from "@/config/apiRoutes";

import type {
    FilterWallets,
    WalletPaginationResponse,
    WalletResponse,
    FilterPayLaters,
    PayLaterPaginationResponse,
} from "@/types/walltet.type";

export const walletService = {
    filterWallets: async (data: FilterWallets): Promise<WalletPaginationResponse> => {
        const response: AxiosResponse<WalletPaginationResponse> = await httpClient.post<WalletPaginationResponse>(API_ROUTES.wallet.filterAccounts, data);
        return response.data;
    },
    getWalletInfo: async (walletNumber: string): Promise<WalletResponse> => {
        const response: AxiosResponse<WalletResponse> = await httpClient.get<WalletResponse>(API_ROUTES.wallet.getWalletInfo(walletNumber));
        return response.data;
    },

    filterPaylaters: async (data: FilterPayLaters): Promise<PayLaterPaginationResponse> => {
        const response: AxiosResponse<PayLaterPaginationResponse> = await httpClient.post<PayLaterPaginationResponse>(API_ROUTES.wallet.filterAccountsPaylater, data);
        return response.data;
    },
}