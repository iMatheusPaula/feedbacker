<template>
  <component :is="name" v-bind="$props"></component>
</template>

<script>
import { IconLoading, IconCopy } from "#components"

export default {
  components: { IconLoading, IconCopy },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
