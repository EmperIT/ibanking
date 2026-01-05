import { createRoute } from "@tanstack/react-router";
import { dashboardLayoutRoute } from "./layout";
import { Outlet } from "@tanstack/react-router";
import UserManagementPage from "@/pages/dashboard/user/UserManagement";
import UserDetailPage from "@/pages/dashboard/user/UserDetail";
import WalletManagementPage from "@/pages/dashboard/wallet/WalletManagementPage";
import WalletDetailPage from "@/pages/dashboard/wallet/WalletDetail";
import WalletVerificationManagementPage from "@/pages/dashboard/wallet/WalletVerificationManagementPage";
import PayLaterAccountPage from "@/pages/dashboard/paylater/PaylaterAccountPage";
import PayLaterApplicationPage from "@/pages/dashboard/paylater/PaylaterApplicationPage";
import PaylaterDetailPage from "@/pages/dashboard/paylater/PaylaterDetail";
import RoleManagementPage from "@/pages/dashboard/role/RolePage";
import TransactionManagementPage from "@/pages/dashboard/transaction/TransactionPage";
import TransactionDetailPage from "@/pages/dashboard/transaction/TransactionDetail";
import AiTrainingDataPage from "@/pages/dashboard/ai-content/AiTrainingDataPage";
import CreditPolicyPage from "@/pages/dashboard/credit/CreaditPolicyPage";
export const usermanagementRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "users",
    component: () => <div><Outlet /></div>
});

export const userListRoute = createRoute({
    getParentRoute: () => usermanagementRoute,
    path: "list",
    component: () => <div><Outlet /></div>
});
export const userListIndexRoute = createRoute({
    getParentRoute: () => userListRoute,
    path: "/",
    component: UserManagementPage,
});

export const addUserDetailRoute = createRoute({
    getParentRoute: () => userListRoute,
    path: "detail",
    component: UserDetailPage,
});

export const editUserDetailRoute = createRoute({    
    getParentRoute: () => userListRoute,
    path: "detail/$userId/edit",
    component: UserDetailPage,
});

export const walletManagementRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "wallets-management",
    component: () => <div><Outlet /></div>
});

export const walletNormalManagementRoute = createRoute({
    getParentRoute: () => walletManagementRoute,
    path: "wallets",
    component: () => <div><Outlet /></div>
});

export const walletManagementIndexRoute = createRoute({
    getParentRoute: () => walletNormalManagementRoute,
    path: "/",
    component: WalletManagementPage,
});

export const walletDetailRoute = createRoute({
    getParentRoute: () => walletNormalManagementRoute,
    path: "$walletNumber",
    component: WalletDetailPage,
});

export const walletVerificationManagementRoute = createRoute({
    getParentRoute: () => walletManagementRoute,
    path: "wallet-verifications",
    component: WalletVerificationManagementPage,
});

export const paylaterAccountRoute = createRoute({
    getParentRoute: () => walletManagementRoute,
    path: "paylaters",
    component: () => <div><Outlet /></div>
});
export const paylaterAccountIndexRoute = createRoute({
    getParentRoute: () => paylaterAccountRoute,
    path: "/",
    component: PayLaterAccountPage,
});

export const paylaterDetailRoute = createRoute({
    getParentRoute: () => paylaterAccountRoute,
    path: "$payLaterAccountNumber",
    component: PaylaterDetailPage,
});

export const paylaterApplicationRoute = createRoute({
    getParentRoute: () => walletManagementRoute,
    path: "paylater-applications",
    component: () => <div><Outlet /></div>
});
export const paylaterApplicationIndexRoute = createRoute({
    getParentRoute: () => paylaterApplicationRoute,
    path: "/",
    component: PayLaterApplicationPage,
});
export const roleManagementRoute = createRoute({
    getParentRoute: () => usermanagementRoute,
    path: "roles",
    component: () => <div><Outlet /></div>
});

export const roleManagementIndexRoute = createRoute({
    getParentRoute: () => roleManagementRoute,
    path: "/",
    component: RoleManagementPage,
});

export const transactionManagementRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "transactions",
    component: () => <div><Outlet /></div>,
});

export const transactionManagementIndexRoute = createRoute({
    getParentRoute: () => transactionManagementRoute,
    path: "/",
    component: TransactionManagementPage,
});

export const transactionDetailRoute = createRoute({
    getParentRoute: () => transactionManagementRoute,
    path: "$id",
    component: TransactionDetailPage,
});

export const aiTrainingDataRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "ai-training-data",
    component: () => <AiTrainingDataPage />,
});

export const aiTrainingDataIndexRoute = createRoute({
    getParentRoute: () => aiTrainingDataRoute,
    path: "/",
    component: AiTrainingDataPage,
});

export const creditPolicyRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "credit-policy",
    component: () => <CreditPolicyPage />,
});

export const creditPolicyIndexRoute = createRoute({
    getParentRoute: () => creditPolicyRoute,
    path: "/",
    component: CreditPolicyPage,
});