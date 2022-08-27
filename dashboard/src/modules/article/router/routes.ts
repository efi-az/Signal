import type {RouteRecordType} from '@/common/types/route.type';

const articleRoutes: RouteRecordType[] = [
    {
        name: 'article',
        path: '/article',
        component: () => import('@/layouts/PanelLayout.vue'),
        meta: {
            title: 'مقالات', icon: 'article', order: 3
        },
        children: [
            {
                name: 'article-list',
                path: '',
                component: () => import('../pages/ArticlePage.vue'),
                meta: {
                    showInMenu: false
                },
            },
            {
                name: 'article-new',
                path: 'new',
                component: () => import('../pages/ArticleActionPage.vue'),
                meta: {
                    showInMenu: false
                },
            },
            {
                name: 'article-edit',
                path: ':slug',
                component: () => import('../pages/ArticleActionPage.vue'),
                meta: {
                    showInMenu: false
                },
            }
        ]
    },
];


export default articleRoutes