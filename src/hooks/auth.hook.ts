import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import type {
    LoginRequest,
    LoginResponse,

} from "@/types/auth.type";

import authService from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useLogin() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (_user: LoginRequest) => {
            const res = await authService.logIn(_user); 
            return res;
        },
        onSuccess: (_res: LoginResponse) => {
            const token = _res.access_token;
            localStorage.setItem('access_token', token);
            toast.success('Đăng nhập thành công');
            navigate({ to: '/manage' });
        },
        onError: (error) => {
            toast.error(`${(error as Error).message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'}`);
        }
    })

}

export function useLogout() {
    const navigate = useNavigate();
    return () => {
        localStorage.removeItem('access_token');
        toast.success('Đăng xuất thành công');
        navigate({ to: '/auth/login' });
    }
}