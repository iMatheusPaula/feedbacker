<script setup lang="ts">
import useNavigation from "assets/ts/navigation";
import useStore from "assets/ts/store";
const { setErrorState } = useNavigation();
const store = useStore();
type State = {
  feedback: string;
  isLoading: boolean;
  hasError: Error | null;
}
const state = reactive<State>({
  feedback: '',
  isLoading: false,
  hasError: null
});
function handleError(error: Error): void{
  state.hasError = error;
  state.isLoading = false;
  setErrorState();
}
const submitButtonIsDisabled = computed<boolean>(() => {
  return !state.feedback.length;
});
async function submitFeedback(): Promise<void>{
  try{
    state.isLoading = true;
  }
  catch (error){
    handleError(error);
  }
}

</script>
<template>
<div class="flex flex-col items-center justify-center w-full my-5">
  <textarea class="w-full rounded-lg border-2 border-b-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
            v-model="state.feedback"
  />
  <button :disabled="submitButtonIsDisabled" @click="submitFeedback"
          class="rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer
          focus:outline-none transition-all duration-200"
          :class="{
            'opacity-50': state.isLoading,
            'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
            'bg-brand-main text-white': !submitButtonIsDisabled
          }"
  >
    <IconLoading v-if="state.isLoading" class="animate-spin"/>
    <template v-else>Enviar</template>
  </button>
</div>
</template>
