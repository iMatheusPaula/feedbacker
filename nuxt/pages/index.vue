<script setup lang="ts">
definePageMeta({
  middleware: 'only-guest'
});
import useModal from "@/assets/js/useModal";
const modal = useModal();
function handleCreateAccount() {
  modal.open({
    component: 'ModalCreateAccount'
  });
}
async function test() {
  const {data} = await useApiFetch('/api/test');
  console.log(data.value);
}
</script>
<template>
  <!--  BANNER SECTION-->
  <section class="banner-section">
    <div class="banner-container">
      <!--coluna texto e balao-->
      <div class="flex flex-col mt-28 max-w-fit">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback. <br>
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>
        <p class="text-lg font-medium text-white">
          Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
          simples widget na página.
        </p>
        <button
            id="home-btn-create-account"
            @click="test()"
            class="px-6 mt-10 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
        >
          Crie uma conta grátis
        </button>
      </div>
    </div>
  </section>
  <!-- CONTACT SECTION -->
  <div class="flex justify-center w-full bg-white">
    <div class="flex flex-col items-center w-4/5 max-w-6xl my-16">
      <h1 class="text-4xl font-black text-center text-gray-800">
        Alguma dúvida?
      </h1>
      <p class="text-lg text-center text-gray-800 font-regular">
        Quer saber melhor como funciona e quais são os preços?
      </p>
      <div class="mt-10">
        <a href="mailto:" class="px-6 py-2 mt-10 font-bold text-white rounded-full bg-brand-main focus:outline-none">
          Nos mande um e-mail!
        </a>
      </div>
    </div>
  </div>
  <!-- CONTACT SECTION-->
</template>
<style lang="postcss" scoped>
.banner-section{
  @apply bg-brand-main w-full flex justify-center;
  height: 500px;
}
.banner-container{
  @apply flex flex-col w-4/5 max-w-6xl;
}
@media (min-width: 640px){
  .banner-container{
    background-image: url("/images/blue-balloons.png");
    background-size: 450px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
