<script setup>
import { reactive} from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import useModal from "@/assets/js/useModal";
import { validateEmptyAndLength, validateEmail } from "@/assets/js/validators";

// const`s
const modal = useModal();
const toast = useToast();
const auth = useAuthStore();

//vee-validate
const {value: nameValue, errorMessage: nameErrorMessage} = useField('name', validateEmptyAndLength);
const {value: emailValue, errorMessage: emailErrorMessage} = useField('email', validateEmail);
const {value: passwordValue, errorMessage: passwordErrorMessage} = useField('password', validateEmptyAndLength);
const {value: rePasswordValue, errorMessage: rePasswordErrorMessage} = useField('rePassword', value => {
  if(value !== state.password.value) return "As senhas precisam ser iguais";
  return true;
});

const state = reactive({
  hasErrors: false,
  isLoading: false,
  name: {value: nameValue, errorMessage: nameErrorMessage},
  email: {value: emailValue, errorMessage: emailErrorMessage},
  password: {value: passwordValue, errorMessage: passwordErrorMessage},
  rePassword: {value: rePasswordValue, errorMessage: rePasswordErrorMessage}
});

async function HandleSubmit() {
  try{
    toast.clear()
    state.isLoading = true;
    await auth.register({
      name: state.name.value,
      email: state.email.value,
      password: state.password.value,
      password_confirmation: state.rePassword.value
    });
    toast.success("Olá " + state.name.value + ", sua conta foi criada com sucesso!");
    await navigateTo('/');
    modal.close();
  }
  catch(error){
    toast.error('Erro Inesperado!');
    console.error(error);
    state.hasErrors = !!error;
  }
  finally {
    state.isLoading = false;
  }
}
</script>
<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>
    <button @click="modal.close()" class="text-4xl text-gray-600 focus:outline-none">&times;</button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="HandleSubmit">
      <!--Nome-->
      <label for="name" class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
      </label>
      <input
          name="name" type="text" :class="{'border-brand-danger': !!state.name.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
          placeholder="Digite seu nome" v-model="state.name.value"
      >
      <span class="block font-medium text-brand-danger" v-if="!!state.name.errorMessage">
        {{ state.name.errorMessage }}
      </span>

      <!--E-mail-->
      <label for="email" class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
      </label>
      <input name="email" type="email" :class="{'border-brand-danger': !!state.email.errorMessage}"
             class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
             placeholder="email@dominio.com" v-model="state.email.value"
      >
      <span class="block font-medium text-brand-danger" v-if="!!state.email.errorMessage">
        {{ state.email.errorMessage }}
      </span>

      <!--Password-->
      <label for="password" class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
      </label>
      <input name="password" type="password" :class="{'border-brand-danger': !!state.password.errorMessage}"
             class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
             v-model="state.password.value"
      >
      <span class="block font-medium text-brand-danger" v-if="!!state.password.errorMessage">
        {{ state.password.errorMessage }}
      </span>

      <!--Re-Password-->
      <label for="rePassword" class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Confirmação da Senha</span>
      </label>
      <input name="rePassword" type="password" :class="{'border-brand-danger': !!state.rePassword.errorMessage}"
             class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
             v-model="state.rePassword.value"
      >
      <span class="block font-medium text-brand-danger" v-if="!!state.rePassword.errorMessage">
        {{ state.rePassword.errorMessage }}
      </span>

      <!--Button Submit-->
      <button
          :disabled="state.isLoading" type="submit" :class="{'opacity-50': state.isLoading}"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none
            transition-all duration-150"
      >
        <span v-if="!state.isLoading">Criar conta</span>
        <IconFactory name="IconLoading" v-if="state.isLoading" class="animate-spin" />
      </button>
    </form>
  </div>
</template>
