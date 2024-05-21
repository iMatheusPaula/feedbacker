<script setup lang="ts">
import useStore from "assets/ts/store";
import colors from 'tailwindcss/colors';
const store = useStore()
const label = computed(() => {
  switch (store.feedbackType){
    case 'ISSUE':
      return 'Report um problema';
    case 'IDEA':
      return 'Nos fale a sua ideia';
    case 'OTHER':
      return 'Abra sua mente'
    default:
      return 'O que você tem em mente?'
  }
});
const canGoBack = computed<boolean>(() => {
  return store.feedbackType === 'SelectFeedbackType';
})
const canShowInfo = computed<boolean>(() => {
  return store.currentComponent !== 'Sucess' && store.currentComponent !== 'Error';
});
</script>
<template>
<div class="box animate__animated animate__fadeInUp animate_bounce">
  <div class="relative w-full flex" :class="{'justify-between': canShowInfo, 'justify-end': !canShowInfo}">
    <button v-if="canShowInfo" @clic="() => {}" :disabled="canGoBack" :class="{ invisible: canGoBack }"
            class="text-xl text-gray-800 focus:outline-none"
    >
      <IconArrowLeft :color="colors.gray['800']"/>
    </button>
    <p v-if="canShowInfo" class="text-xl font-black text-center text-brand-info">{{label}}</p>
  </div>
</div>
</template>
<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl p-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
