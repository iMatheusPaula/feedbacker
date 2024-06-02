<script setup lang="ts">
const props = defineProps({
  typeFeedback: {type: String, required: true}
});
const label = computed(() => {
  switch (props.typeFeedback) {
    case 'ISSUE':
      return 'problema';
    case 'IDEA':
      return 'ideia';
    default:
      return 'outros';
  }
});
const classColor = computed(() => {
  switch (props.typeFeedback) {
    case 'ISSUE':
      return 'bg-brand-danger';
    case 'IDEA':
      return 'bg-brand-warning';
    default:
      return 'bg-brand-graydark';
  }
});
</script>
<template>
<span :class="classColor" class="p-2 text-xs font-black text-white uppercase rounded-full">{{ label }}</span>
</template>
