<script setup lang="ts">
const props = defineProps({
  feedback: {type: Object, required: true},
  isOpened: {type: Boolean, default: false}
});
const state = reactive({
  isOpen: props.isOpened,
  isClosing: !props.isOpened
});
import { getDiffTimeBetweenCurrentDate } from 'assets/js/date.js';
import { wait } from 'assets/js/wait.js';
async function handleToggle(){
  state.isClosing = true;
  await wait(250);
  state.isOpen = !state.isOpen;
  state.isClosing = false;
}
</script>

<template>
<div @click="handleToggle" class="flex flex-col py-6 px-8 rounded cursor-pointer bg-brand-gray">
  <div class="flex items-center justify-between w-full mb-8">
    <feedbacks-badge :typeFeedback="feedback.type"/>
    <span class="font-regular text-brand-graydark">{{ getDiffTimeBetweenCurrentDate(feedback.created_at) }}</span>
  </div>
  <div class="text-lg font-medium text-gray-800">
    {{ feedback.text }}
  </div>
  <div :class="{animate__fadeOutUp: state.isClosing}" class="flex mt-8 animate__animated animate__fadeInUp animate__faster" v-if="state.isOpen">
    <div class="flex flex-col w-1/2">
      <div class="flex flex-col ">
        <span class="font-bold text-gray-400 uppercase select-none">Página</span>
        <span class="font-medium text-gray-700">{{ feedback.page }}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
        <span class="font-medium text-gray-700">{{ feedback.device }}</span>
      </div>
    </div>

    <div class="flex flex-col w-1/2">
      <div class="flex flex-col ">
        <span class="font-bold text-gray-400 uppercase select-none">Página</span>
        <span class="font-medium text-gray-700">{{ feedback.fingerprint }}</span>
      </div>
    </div>
  </div>

  <div class="flex justify-end mt-8" v-else>
    <IconFactory name="IconChevronDown" color="#444444"/>
  </div>
</div>
</template>

<style scoped>

</style>