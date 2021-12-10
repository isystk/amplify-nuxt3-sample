<template>
  <i class="fas fa-asterisk required" :title="title"></i>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '必須',
    },
  },
}
</script>
