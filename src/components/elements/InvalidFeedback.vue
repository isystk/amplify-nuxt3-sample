<template>
  <p :class="`text-red-500${className ? ' ' + className : ''}`">
    {{ error }}
  </p>
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
