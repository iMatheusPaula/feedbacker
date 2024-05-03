<script setup>
import { reactive } from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import useModal from "@/assets/js/useModal";
import { validateEmptyAndLength, validateEmail } from "@/assets/js/validators";

// const`s
const modal = useModal();
const toast = useToast();
const auth = useAuthStore();

// validacoes do vee-validate
const {value: emailValue, errorMessage: emailErrorMessage} = useField('email', validateEmail);
const {value: passwordValue, errorMessage: passwordErrorMessage} = useField('password', validateEmptyAndLength);

const state = reactive({
  hasErrors: false,
  isLoading: false,
  email: {value: emailValue, errorMessage: emailErrorMessage},
  password: {value: passwordValue, errorMessage: passwordErrorMessage}
});
async function HandleSubmit(){
  try{
    toast.clear()
    state.isLoading = true
    const { error } = await auth.login({
      email: state.email.value,
      password: state.password.value
    })
    if(auth.isLoggedIn){
      await navigateTo('/feedbacks')
      modal.close()
    }
    if(error.value.statusCode === 500){
      toast.error('Erro Interno No Servidor')
    }
    else if(error.value.statusCode === 422){
      toast.error('Essas credenciais não correspondem nos nossos registros.')
    }
  }
  catch (error){
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
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button @click="modal.close()" class="text-4xl text-gray-600 focus:outline-none">&times;</button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="HandleSubmit">
      <!--E-mail-->
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
      </label>
      <input name="email" type="email" :class="{'border-brand-danger': !!state.email.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
          placeholder="email@dominio.com" v-model="state.email.value"
      >
      <span id="emailError" class="block font-medium text-brand-danger" v-if="!!state.email.errorMessage">
        {{ state.email.errorMessage }}
      </span>
      <!--Password-->
      <label id="passwordError" for="password" class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
      </label>
      <input name="password" type="password" :class="{'border-brand-danger': !!state.password.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded text-black"
          v-model="state.password.value"
      >
      <span class="block font-medium text-brand-danger" v-if="!!state.password.errorMessage">
          {{ state.password.errorMessage }}
      </span>
      <!--Button Submit-->
      <button name="btn-submit-login" :disabled="state.isLoading" type="submit" :class="{'opacity-50': state.isLoading}"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none
          transition-all duration-150"
      >
        <span v-if="!state.isLoading">Entrar</span>
        <IconFactory name="IconLoading" v-if="state.isLoading" class="animate-spin" />
      </button>
    </form>
  </div>
</template>
