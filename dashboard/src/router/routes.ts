import type { RouteRecordType } from '@/common/types/route.type';

const modulesRoutes: RouteRecordType[] = Object.values(
  import.meta.globEager('/src/modules/**/routes.ts')
).reduce((prevItem: RouteRecordType[], currentItem) => {
  return [...prevItem, ...currentItem.default];
}, [] as RouteRecordType[]).sort((a, b) => {
  return (a.meta.order || 1) - (b.meta.order || 1);
});

export const routes: RouteRecordType[] = [
  {
    name: 'home',
    path: '/',
    redirect: '/user/dashboard',
    component: () => import('@/layouts/HomeLayout.vue'),
    meta: {
      showInMenu: false
    },
    children: [
      ...modulesRoutes,
    ]
  },
  {
    name: 'styleGuide',
    path: '/styleGuide',
    component: () => import('@/pages/StyleGuidePage.vue'),
    meta: { showInMenu: false },
  },
];
