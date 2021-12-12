<template>
  <div class="text-center my-10"></div>
  <div id="site_loader_overlay">
    <div className="site_loader_spinner">
      <ElementsSpinner :label="label" :variant="variant" :small="small" />
    </div>
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
