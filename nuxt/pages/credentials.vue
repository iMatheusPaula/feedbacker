<script setup lang="ts">
import {useToast} from "vue-toastification";
definePageMeta({
  middleware: 'auth'
});
const auth = useAuthStore();
const toast = useToast();

async function handleGenerateApiKey(){
  try{
    await useApiFetch("/api/user/generate", {
      method: "POST",
      headers: {
        accept: "application/json"
      }
    });
    await auth.fetchUser();
  }
  catch (error){
    toast.error(error);
  }
}

async function handleCopy(){
  toast.clear()
  try{
    await navigator.clipboard.writeText(auth.user?.api_token);
    toast.success('Copiado')
  }
  catch(error){

  }
}
</script>
<template>
  <bannerSection title="Credenciais" text="Guia de instalação e geração de suas credenciais" />
  <div class="flex justify-center w-full h-full bg-white">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">Instalação e configuração</h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">Este aqui é a sua chave de api</p>
      <contentLoader
        v-if="!auth.isLoggedIn"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div v-else class="flex justify-between py-3 pl-5 pr-5 mt-2 rounded items-center bg-brand-gray w-full lg:w-1/2">
        <span class="text-brand-darkgray">{{ auth.user?.api_token }}</span>
        <div class="flex ml-20">
          <iconFactory name="IconCopy" color="#C0BCB0" size="24" class="cursor-pointer"
                       @click="handleCopy"
          />
          <iconFactory name="IconLoading" color="#C0BCB0" size="24" class="cursor-pointer ml-3"
                       @click="handleGenerateApiKey"
          />
        </div>
      </div>
      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <div class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray text-brand-darkgray w-full lg:w-1/2 overflow-x-scroll">
        <pre>&lt;script scr="https://imatheuspaula-feedbacker-widget.netlify.app?apiKey={{auth.user?.api_token}}">&lt;/script></pre>
      </div>
    </div>
  </div>
</template>
