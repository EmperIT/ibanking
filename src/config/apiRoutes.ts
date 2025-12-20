const baseURL = import.meta.env.VITE_API_BASE_URL;
// const buildQuery = (endpoint: string, params: Record<string, any>) => {
//     const query = new URLSearchParams();

//     Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== "") {
//             query.append(key, String(value));
//         }
//     });

//     return `${baseURL}${endpoint}?${query.toString()}`;
// };

const API_ROUTES = {
    auth: {
        login: `${baseURL}/auth/login`,
        refresh: `${baseURL}/auth/refresh`,
        

    },
    notify: {
        createNotification: `${baseURL}/manage/notifications/`,
        filterNotifications: `${baseURL}/manage/notifications/filter`,
        filterLogMails: `${baseURL}/manage/logs/emails/filter`,
    },
    transaction: {
        createCash: `${baseURL}/manage/transactions/cash`,
        filterTransactions: `${baseURL}/manage/transactions/filter`,
        statsTransactions: (params: { date: string }) => `${baseURL}/api/manage/transactions/statistics/stats?${new URLSearchParams(params).toString()}`,
        trendsForManage: `${baseURL}/api/manage/transactions/statistics/trends`,
        distributionForManage: `${baseURL}/api/manage/transactions/statistics/distribution`,
        topUsersForManage: `${baseURL}/api/manage/transactions/statistics/users/top`,
    },
    wallet: {
        updateStatus: `${baseURL}/manage/wallets/status`,
        filterAccounts: `${baseURL}/manage/wallets/filter`,
        getWalletInfo: `${baseURL}/manage/wallets/14032004`,
        filterApplications: `${baseURL}/manage/pay-later/applications/filter`,
        processApplication: `${baseURL}/manage/pay-later/applications/process`,
        filterAccountsPaylater: `${baseURL}/manage/pay-later/accounts/filter`,
        getPayLaterInfo: `${baseURL}/manage/pay-later/accounts/14032004`,
    },
    user: {
        createBatchUsers: `${baseURL}/api/v1/users/management/create-batch-users`,
        getStatsUsers: `${baseURL}/api/users/statistics/summary`,
   }
}
export default API_ROUTES;
