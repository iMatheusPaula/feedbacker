<script setup>
definePageMeta({
  middleware: 'auth'
});
onMounted(async () => {
  await fetchFeedbacks();
});
const state = reactive({
  isLoading: false,
  isLoadingFeedback: false,
  feedbacks: [],
  hasErrors: false,
  currentFeedbackType: '',
  pagination: {
    limit: 5,
    offset: 0
  }
});
const defaultPagination = {
  limit: 5,
  offset: 0
};
async function fetchFeedbacks(){
  state.isLoading = true;
  try{
    const { data } = await useApiFetch('/api/feedbacks');
    console.log(data.value);
    state.feedbacks = data.value;
    state.pagination = data.value.pagination;
    state.isLoading = false;
  }
  catch(error){
    state.hasErrors = !!error;
    state.isLoading = false;
  }
};

async function changeFeedbacksType(type){
  try{
    state.isLoadingFeedback = true;
    // state.pagination.offset = 0;
    // state.pagination.limit = 5
    state.currentFeedbackType = type;
    const { data } = await useApiFetch('/api/feedbacks', {
      query: {type: type}
    });
    state.feedbacks = data.value;
    state.pagination = data.value.pagination;
    state.isLoadingFeedback = false;
  }
  catch (error){
    state.hasErrors = !!error;
    state.isLoadingFeedback = false;
  }
};


</script>

<template>
  <banner-section title="Feedbacks" text="Detalhes de todos os feedbacks recebidos." />
  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <feedbacks-filters @select="changeFeedbacksType" class="mt-8 animate__animated animate__fadeIn animate__faster" />
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
        <p v-if="!state.feedbacks.length && !state.isLoading" class="text-lg text-center text-gray-800 font-regular">
          Ainda nenhum feedback recebido 🥺
        </p>
        <p v-if="state.isLoading || state.isLoadingFeedback">Carregando..</p>
        <feedbacks-card
            v-else
            v-for="(feedback, index) in state.feedbacks"
            :key="feedback.id"
            :is-opened="index === 0"
            :feedback="feedback"
            class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>