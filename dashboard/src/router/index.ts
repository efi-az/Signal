import {createRouter, createWebHistory} from 'vue-router'
import {routes} from './routes'
import {authGuard} from "@/boot/guards";

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
// authGuard(router)
