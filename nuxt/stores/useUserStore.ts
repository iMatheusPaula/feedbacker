import { defineStore } from "pinia";

type User = {
    id: number,
    name: string,
    email: string,
    api_token: string
}
export const useUserStore = defineStore('user', () => {
    // semelhante ao state (vazio)
    const user = ref<User | null>(null);
    // actions
    async function fetchUser(){
        const { data, error } = await useApiFetch("/api/user");
        user.value = data.value as User;
    }


})