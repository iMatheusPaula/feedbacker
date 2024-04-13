<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
onMounted(async () => {
});
const state = reactive({
  isLoading: false,
  feedbacks: [],
  hasErrors: false
});
const defaultPagination = {
  limit: 5,
  offset: 0
};
async function getAll(){

}
</script>

<template>
  <banner-section title="Feedbacks" text="Detalhes de todos os feedbacks recebidos." />
  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <feedbacks-filters class="mt-8 animate__animated animate__fadeIn animate__faster" />
          </template>
          <template #fallback>
            Carregando...
          </template>
        </suspense>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p class="text-lg text-center text-gray-800 font-regular">
          Aconteceu um erro ao carregar os feedbacks 🥺
        </p>
        <p class="text-lg text-center text-gray-800 font-regular">
          Ainda nenhum feedback recebido 🥺
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>