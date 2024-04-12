<script setup lang="ts">
const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
};
const COLORS = {
  all: 'brand-info',
  issue: 'brand-danger',
  idea: 'brand-warning',
  other: 'brand-darkgray'
};

const state = reactive({
  hasErrors: false,
  filters: [{label: null, amount: null}]
});

function applyfiltersStructure (summary: any){
  return Object.keys(summary).reduce((acc: any, cur: any) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],

    }
    return [...acc, currentFilter]
  }, [])
}
try{}
catch (e){
  state.hasErrors = !!e
}
</script>

<template>

</template>

<style scoped>

</style>