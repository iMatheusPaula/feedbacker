<script setup>
import {useToast} from "vue-toastification";

definePageMeta({
  middleware: 'only-auth'
});
const toast = useToast();
const state = reactive({
  isLoading: false,
  isLoadingMore: false,
  feedbacks: [],
  hasErrors: false,
  currentFeedbackType: '',
  pagination: {
    limit: 2,
    offset: 0,
    total: 0
  }
});
onMounted(async () => {
  await fetchFeedbacksForType('all');
  window.addEventListener('scroll', handleScroll, false);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false);
});
async function handleScroll(){
  if(!(Math.ceil(
      document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight)
  ) return;
  if(state.isLoading || state.isLoadingMore) return;
  if(state.feedbacks.length >= state.pagination.total){
    toast.warning("Todos os feedbacks foram carregados.", { timeout: 2000 })
    return
  }
  state.isLoadingMore = true;
  state.pagination.offset += 2;
  await fetchFeedbacks();
  state.isLoadingMore = false;
}
async function fetchFeedbacksForType(type){
  state.isLoading = true;
  state.currentFeedbackType = type;
  state.feedbacks = [];
  state.pagination.limit = 2;
  state.pagination.offset = 0;
  await fetchFeedbacks();
  state.isLoading = false;
}
async function fetchFeedbacks(){
  try{
    const { data } = await useApiFetch('/api/feedbacks',{
      query: {
        ...state.pagination,
        type: state.currentFeedbackType ? state.currentFeedbackType : 'all'
      }
    });
    if(data.value.results.length) state.feedbacks.push(...data.value.results);
    if(data.value.pagination) state.pagination = data.value.pagination;
  }
  catch(error){
    state.hasErrors = !!error;
  }
}
</script>
<template>
  <banner-section title="Feedbacks" text="Detalhes de todos os feedbacks recebidos." />
  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <feedbacks-filters @select="fetchFeedbacksForType" class="mt-8 animate__animated animate__fadeIn animate__faster" />
          </template>
          <template #fallback>
            Carregando...
          </template>
        </suspense>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p v-if="state.hasErrors" class="text-lg text-center text-gray-800 font-regular">
          Aconteceu um erro ao carregar os feedbacks 🥺
        </p>
        <p v-if="!state.feedbacks.length && !state.isLoading && !state.hasErrors" class="text-lg text-center text-gray-800 font-regular">
          Ainda nenhum feedback recebido 🥺
        </p>
        <p v-if="state.isLoading">Carregando..</p>
        <feedbacks-card
            v-else
            v-for="(feedback, index) in state.feedbacks"
            :key="feedback.id"
            :is-opened="index === 0"
            :feedback="feedback"
            class="mb-8"
        />
        <p v-if="state.isLoadingMore">Carregando..</p>
      </div>
    </div>
  </div>
</template>
