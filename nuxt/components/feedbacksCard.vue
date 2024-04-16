<script setup lang="ts">
defineProps({
  feedback: {type: Object, required: true}
});
function handleToggle(){

}
</script>

<template>
<div @click="handleToggle" class="flex flex-col py-6 px-8 rounded cursor-pointer bg-brand-gray">
  <div class="flex items-center justify-between w-full mb-8">
    <feedbacks-badge :typeFeedback="feedback.type"/>
    <span class="font-regular text-brand-graydark">{{ feedback.created_at}}</span>
  </div>
</div>
</template>

<style scoped>

</style>