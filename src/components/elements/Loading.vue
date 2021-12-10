<template>
  <div
    class="d-flex justify-content-center align-items-center overlay no-click"
  >
    <spinner :label="label" :variant="variant" :small="small" />
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
}
</script>
