<template>
  <PostsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostsList from './posts/list'

export default defineComponent({
  components: {
    PostsList,
  },
  setup() {
    return {}
  },
})
</script>
