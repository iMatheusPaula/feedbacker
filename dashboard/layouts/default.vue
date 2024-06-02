<script setup lang="ts">
import useModal from "@/assets/js/useModal";
const modal = useModal();
const auth = useAuthStore();
function handleLogin(){
  modal.open({
    component: 'ModalLogin'
  });
}
function handleCreateAccount(){
  modal.open({
    component: 'ModalCreateAccount'
  });
}
</script>
<template>
  <!--coluna logo e botoes-->
  <header class="header">
    <div class="header-container">
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <NuxtLink to="/"><img src="/images/logo-white.png" alt="Logo" class="w-full"></NuxtLink>
        </div>
        <!--LOGGED-->
        <div class="flex" v-if="auth.isLoggedIn">
          <ul class="flex list-none">
            <li class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
              <NuxtLink to="/credentials">Credenciais</NuxtLink>
            </li>
            <li class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
              <NuxtLink to="/feedbacks">Feedbacks</NuxtLink>
            </li>
            <li class="px-6 py-2 font-bold bg-white rounded-full cursor-pointers text-brand-main focus:outline-none">
              {{ auth.user?.name }} <span class="cursor-pointer" @click="auth.logout" id="btnLogout">(Sair)</span>
            </li>
          </ul>
        </div>
        <!--NOT LOGGED-->
        <div class="flex" v-else>
          <button
              id="header-create-account-button" @click="handleCreateAccount()"
              class="px-6 py-2 font-bold text-white focus:outline-none">
            Crie uma conta
          </button>
          <button
              id="header-login-button" @click="handleLogin()"
              class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none">
            Entrar
          </button>
        </div>
      </div>
    </div>
  </header>
  <slot />
  <footer>
    <div class="flex justify-center py-10 bg-brand-gray">
      <p class="font-medium text-center text-gray-800">feedbacker c 2024</p>
    </div>
  </footer>
</template>
<style scoped>
.header{
  @apply bg-brand-main w-full flex justify-center;
  /* height: 700px; */
}
.header-container{
  @apply flex flex-col w-4/5 max-w-6xl;
}
</style>
