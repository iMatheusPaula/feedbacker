import { defineStore } from "pinia";

type User = {
    id: number,
    name: string,
    email: string
    api_token: string
}

type Credentials = {
    email: string,
    password: string
}

type RegisterInfo = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

type Options = {}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => !!user.value);

    //Fetch User
    async function fetchUser(){
        const { data, error } = await useApiFetch("/api/user");
        user.value = data.value as User;
    }

    //Login
    async function login(credentials: Credentials, options: Options){
        await useApiFetch("/sanctum/csrf-cookie");
        const login = await useApiFetch("/api/login", {
            method: "POST",
            body: credentials,
            ...options
        });
        await fetchUser();
        return login;
    }

    //Register
    async function register(info: RegisterInfo){
        await useApiFetch("/sanctum/csrf-cookie");
        const register = await useApiFetch("/api/register", {
            method: "POST",
            body: info,
        });
        await fetchUser();
        return register;
    }

    //Logout
    async function logout(){
        await useApiFetch('/api/logout', {method: "POST"})
        user.value = null
        navigateTo('/')
    }

    return { user, login, isLoggedIn, fetchUser, logout, register }
}, { persist: true})
