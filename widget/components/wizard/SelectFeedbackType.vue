<script setup lang="ts">
const emit = defineEmits(['select-feedback-type', 'next']);
function handleSelect(type: string): void {
  emit('select-feedback-type', type);
  emit('next');
}
</script>
<template>
  <div class="flex justify-between w-full my-5">
    <!-- ISSUE BUTTON -->
    <button @click="handleSelect('ISSUE')"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28
            cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <NuxtImg src="/issue.png" alt="Problema" class="w-full" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Problema</p>
    </button>
    <!-- IDEA BUTTON -->
    <button @click="handleSelect('IDEA')"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28
            cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <NuxtImg src="/idea.png" alt="Ideia" class="w-full" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Ideia</p>
    </button>
    <!-- OTHER BUTTON -->
    <button @click="handleSelect('OTHER')"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28
            cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <NuxtImg src="/other.png" alt="Outro" class="w-full" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Outro</p>
    </button>
  </div>
</template>
