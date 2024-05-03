<script setup lang="ts">
defineProps({
  title: String,
  text: String
});
</script>
<template>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-brand-darkgray">{{ title }}</h1>
    <p class="text-lg text-center text-gray-800 font-regular">{{ text }}</p>
  </div>
</template>
