<template>
  <component :is="name" v-bind="$props"></component>
</template>

<script>
import { IconLoading, IconCopy, IconChevronDown } from "#components"

export default {
  components: { IconLoading, IconCopy, IconChevronDown },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
