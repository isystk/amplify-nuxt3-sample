<template>
  <div :class="className">
    <v-progress-circular indeterminate :size="50" />
    <span class="sr-only">{{ label }}</span>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Loading...',
    },
    variant: {
      type: String,
      default: 'border',
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className: function () {
      let name = 'text-center'
      return name
    },
  },
}
</script>
