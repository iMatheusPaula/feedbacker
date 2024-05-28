<script setup lang="ts">
import useStore from "assets/ts/store";
import useNavigation from "assets/ts/navigation";
import {setFeedbackType} from "~/stores/useWidgetStore";
const store = useStore();
const {next} = useNavigation();
function handleSelectFeedbackType(type: string): void{
  setFeedbackType(type);
};
</script>
<script lang="ts">
import {WizardSelectFeedbackType, WizardWriteAFeedback, WizardSuccess, WizardError} from '#components';
export default {
  components: {WizardSelectFeedbackType, WizardWriteAFeedback, WizardSuccess, WizardError}
}
</script>
<template>
  <component :is="store.currentComponent" @select-feedback-type="handleSelectFeedbackType" @next="next" />
</template>
