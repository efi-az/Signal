import type {RouteRecordType} from '@/common/types/route.type';

const signalRoutes: RouteRecordType[] = [
    {
        name: 'signal',
        path: '/signal',
        component: () => import('@/layouts/PanelLayout.vue'),
        meta: {
            title: 'سیگنال', icon: 'signal', order: 4
        },
        children: [
            {
                name: 'signal-list',
                path: '',
                component: () => import('../pages/SignalPage.vue'),
                meta: {
                    showInMenu: false
                },
            },
            {
                name: 'signal-new',
                path: 'new',
                component: () => import('../pages/SignalActionPage.vue'),
                meta: {
                    showInMenu: false
                },
            },
            {
                name: 'signal-edit',
                path: ':id',
                component: () => import('../pages/SignalActionPage.vue'),
                meta: {
                    showInMenu: false
                },
            }
        ]
    },
    {
        name: 'market',
        path: '/market',
        component: () => import('@/layouts/PanelLayout.vue'),
        meta: {
            title: 'مارکت', icon: 'market', order: 2
        },
        children: [
            {
                name: 'market-list',
                path: '',
                component: () => import('../pages/MarketPage.vue'),
                meta: {
                    showInMenu: false
                },
            }
        ]
    },
];


export default signalRoutes