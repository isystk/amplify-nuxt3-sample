<template>
  <MemberPostsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MemberPostsList from './posts/list'

export default defineComponent({
  components: {
    MemberPostsList,
  },
  setup() {
    return {}
  },
})
</script>
