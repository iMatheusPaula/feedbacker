<script lang="ts">
import { WidgetStandby, WidgetBox } from '#components'
export default {
  components: {
    WidgetStandby,
    WidgetBox
  }
}
</script>
<script setup lang="ts">
type State = { component: string; }
const state = reactive<State>({ component: 'WidgetStandby' })
function handleCloseBox(): void {
  state.component = 'WidgetStandby';
}
function handleOpenBox(): void {
  state.component = 'WidgetBox';
}
</script>

<template>
  <teleport to="body">
    <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />
  </teleport>
</template>
