import type { RouteRecordType } from '@/common/types/route.type';

const authRoutes: RouteRecordType[] = [
    {
        name: 'auth',
        path: '/auth',
        component: () => import('../layouts/AuthLayout.vue'),
        meta: {
            showInMenu: false
        },
        children: [
            {
                name: 'login',
                path: 'login',
                component: () => import('../pages/LoginPage.vue'),
                meta: { showInMenu: false, title: 'ورود' },
            }
        ]
    },
    {
        name: 'user-dashboard',
        path: '/user/dashboard',
        component: () => import('@/layouts/PanelLayout.vue'),
        meta: {
            title: 'داشبورد', icon: 'dashboard', order: 1
        },
        children: [
            {
                name: 'user-dashboard-report',
                path: '',
                component: () => import('../pages/UserDashboardPage.vue'),
                meta: { showInMenu: false },
            }
        ]
    },
];


export default authRoutes