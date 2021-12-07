<template>
  <div :class="`invalid-feedback${className ? ' ' + className : ''}`">
    {{ error }}
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: String,
      default: 'Errored',
    },
    className: String,
  },
}
</script>
