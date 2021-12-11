<template>
  <i class="fas fa-asterisk text-red-500 text-xs" :title="title"></i>
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
