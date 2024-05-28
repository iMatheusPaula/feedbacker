<script setup lang="ts">
import useStore from "assets/ts/store";
import useNavigation from "assets/ts/navigation";
import colors from 'tailwindcss/colors';
import pallete from '@/assets/js/palette';
import Wizard from "~/components/widget/wizard.vue";
const store = useStore();
const {back} = useNavigation();
const emit = defineEmits(['close-box']);
const label = computed<string>(() => {
  switch (store.feedbackType){
    case 'ISSUE':
      return 'Reporte um problema';
    case 'IDEA':
      return 'Nos fale a sua ideia';
    case 'OTHER':
      return 'Abra sua mente'
    default:
      return 'O que você tem em mente?'
  }
});
const canGoBack = computed<boolean>(() => {
  return store.currentComponent === 'WizardSelectFeedbackType';
});
const canShowInfo = computed<boolean>(() => {
  return store.currentComponent !== 'WizardSuccess' && store.currentComponent !== 'WizardError';
});
onMounted(() => {
  console.log(canGoBack.value);
})
</script>
<template>
<div class="box animate__animated animate__fadeInUp animate_bounce">
  <div class="relative w-full flex" :class="{'justify-between': canShowInfo, 'justify-end': !canShowInfo}">
    <button v-if="canShowInfo" @click="back()" :disabled="canGoBack" :class="{ invisible: canGoBack }"
            class="text-xl text-gray-800 focus:outline-none"
    >
      <IconArrowLeft :color="colors.gray['800']"/>
    </button>
    <p v-if="canShowInfo" class="text-xl font-black text-center text-brand-info">{{label}}</p>
    <button @click="emit('close-box')">
      <IconClose size="14" :color="colors.gray['800']" />
    </button>
  </div>
  <Wizard />
  <div class="text-gray-800 text-sm flex" v-if="canShowInfo">
    <IconChat class="mr-1" :color="pallete.brand.darkgray" />
    widget by
    <span class="ml-1 font-bold">feedbacker</span>
  </div>
</div>
</template>
<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl p-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
