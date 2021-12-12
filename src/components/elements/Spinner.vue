<template>
  <div :class="className" role="status">
    <i class="fas fa-spinner fa-spin" :style="{ fontSize: '35px' }"></i>
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
      let name = 'spinner-' + this.variant
      if (this.small) {
        name += ' ' + name + '-sm'
      }
      return name
    },
  },
}
</script>
