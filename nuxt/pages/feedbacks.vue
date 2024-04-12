<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <banner-section title="Feedbacks" text="Detalhes de todos os feedbacks recebidos." />
  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
      </div>
      <div class="col-span-3 px-10 pt-20">
        Feedbacks
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>