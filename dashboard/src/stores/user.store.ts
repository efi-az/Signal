import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            isLoggedIn: false,
            mobile: '',
            email: '',
            roles: [''],
            activeRole: '',
            token: localStorage.getItem('access-token') || '',
        }
    },

    getters: {
        getToken(state): string {
            return state.token
        },

        getActiveRole(state): string {
            return state.activeRole
        }
    },

    actions: {
        setIsLoggedIn(isLoggedIn: boolean) {
            this.isLoggedIn = isLoggedIn;
        },

        setMobile(mobile: string) {
            this.mobile = mobile;
        },

        setEmail(email: string) {
            this.email = email;
        },

        setRoles(roles: string[]) {
            this.roles = roles;
        },

        setActiveRole(role: string) {
            this.activeRole = role;
        },

        setToken(token: string) {
            this.token = token;
        },
    },
    persist: true
})