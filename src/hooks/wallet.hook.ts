import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
    FilterWallets,
    WalletResponse,
    WalletPaginationResponse,
    FilterWalletVertifications,
    WalletsVerificationPaginationResponse,
    FilterPayLaters,
    FilterPayLatersApplications,
    PayLaterPaginationResponse,
    PayLaterApplicationPaginationResponse,
    PayLaterResponse,
} from "@/types/walltet.type";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/error.type";
import { walletService } from "@/services/wallet.service";

export function useFilterWallets(filterParams: FilterWallets) {
    return useQuery<WalletPaginationResponse>({
        queryKey: ['filterWallets', filterParams],
        queryFn: () => walletService.filterWallets(filterParams),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}

export function useGetWalletInfo(walletNumber?: string) {
    return useQuery<WalletResponse>({
        queryKey: ['getWalletInfo', walletNumber],
        enabled: !!walletNumber,
        queryFn: () => walletService.getWalletInfo(walletNumber as string),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}

export function useFilterWalletVerifications(filterParams: FilterWalletVertifications) {
    return useQuery<WalletsVerificationPaginationResponse>({
        queryKey: ['filterWalletVerifications', filterParams],
        queryFn: () => walletService.filterWalletVerifications(filterParams),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}

export function useFilterPayLaters(filterParams: FilterPayLaters) {
    return useQuery<PayLaterPaginationResponse>({
        queryKey: ['filterPayLaters', filterParams],
        queryFn: () => walletService.filterAccountPaylaters(filterParams),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}

export function useFilterPayLaterApplications(filterParams: FilterPayLatersApplications) {
    return useQuery<PayLaterApplicationPaginationResponse>({
        queryKey: ['filterPayLaterApplications', filterParams],
        queryFn: () => walletService.filterPaylaterApplications(filterParams),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}
export function useGetPayLaterInfo(payLaterAccountNumber?: string) {
    return useQuery<PayLaterResponse>({
        queryKey: ['getPayLaterInfo', payLaterAccountNumber],
        enabled: !!payLaterAccountNumber,
        queryFn: () => walletService.getPaylaterInfo(payLaterAccountNumber as string),
        staleTime: 5 * 60 * 1000,     // 5 phút coi data là "fresh"
        refetchOnWindowFocus: false, // không refetch khi focus lại tab
        refetchOnReconnect: false,   // không refetch khi mạng reconnect
        retry: 1,
    });
}
