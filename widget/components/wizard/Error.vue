<script setup lang="ts">
import { resetStore } from "~/stores/useWidgetStore";
</script>
<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <img src="/error.png" alt="Sucesso" width="70">
    <p class="text-xl font-black text-center w-full mt-2">Droga! Aconteceu algum erro.</p>
    <div class="flex justify-center items-center w-full mt-2">
      <button @click="resetStore()"
              class="rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5
        cursor-pointer focus:outline-none"
      >
        Tente novamente
      </button>
    </div>
  </div>
</template>
