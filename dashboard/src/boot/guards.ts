import type { Router } from "vue-router";
import { useUserStore } from "@/stores/user.store";
// import { useGetUser } from '@/modules/auth/common/composable/login.composable';

export const authGuard = async (router: Router) => {
    
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();
        userStore.getToken
    
        // if (!userStore.isLoggedIn) {
        //     const { getUser } = useGetUser()
        //     await getUser()
        // }

        const isLoggedIn = userStore.isLoggedIn;
        document.title = (to.meta.title as string) || 'Signal';
        if (isLoggedIn && to.name === 'login') {
            return next({ name: 'home' });
        }

        if (!isLoggedIn && to.name !== 'login') {
            return next({ name: 'login' });
        }

        const { activeRole } = useUserStore();

        if (
            (to.meta as any)?.accessRoles &&
            !(to.meta as any)?.accessRoles.includes(activeRole)
        )
            return next('/404');
        next();
    });
};
