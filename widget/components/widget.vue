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
import useIframeControl from "assets/ts/iframe";
import useWidgetStore from "~/stores/useWidgetStore";
const iframe = useIframeControl();
const store = useWidgetStore;
type State = { component: string; }                             
const state = reactive<State>({ component: 'WidgetStandby' })
function handleCloseBox(): void {
  state.component = 'WidgetStandby';
  iframe.notifyClose();
}
function handleOpenBox(): void {
  state.component = 'WidgetBox';
  iframe.notifyOpen();
}
watch(() => store.currentComponent, () => {
  iframe.updateCoreValuesOnStore();
});
</script>
<template>
  <teleport to="body">
    <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />
  </teleport>
</template>
