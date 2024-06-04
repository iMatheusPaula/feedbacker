<script setup lang="ts">
import useNavigation from "assets/ts/navigation";
import {sendFeedback, setMessage} from "~/stores/useWidgetStore";
const { setErrorState, setSucessState } = useNavigation();;
type State = {
  feedback: string;
  isLoading: boolean;
  hasError: any | null;
}
const state = reactive<State>({
  feedback: '',
  isLoading: false,
  hasError: null
});
const submitButtonIsDisabled = computed<boolean>(() => {
  return !state.feedback.length;
});
async function submitFeedback(): Promise<void>{
  try {
    state.isLoading = true;
    setMessage(state.feedback)
    const {status}: any = await sendFeedback({
      device: window.navigator.userAgent
    });
    console.log(status.value);
    if (status.value == 'success' || status.value == 201){
      setSucessState();
    }
    else{
      setErrorState();
    }
  }catch (e){
    console.error(e);
    setErrorState();
  }
  finally {
    state.isLoading = false;
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
