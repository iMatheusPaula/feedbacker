<script setup lang="ts">
defineProps({
  feedback: {type: Object, required: true}
});
function handleToggle(){

}
</script>

<template>
<div @click="handleToggle" class="flex flex-col py-6 px-8 rounded cursor-pointer bg-brand-gray">
  <div class="flex items-center justify-between">

  </div>
</div>
</template>

<style scoped>

</style>