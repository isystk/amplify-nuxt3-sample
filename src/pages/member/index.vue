<template>
  <MemberPostsList />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MemberPostsList from './posts/list'

export default defineComponent({
  components: {
    MemberPostsList,
  },
  setup() {
    const { $C } = useNuxtApp()
    const router = useRouter()

    // mounted
    onMounted(async () => {
      const auth = localStorage.getItem('authorization')
      if (auth !== 'test') {
        router.push($C.URL.LOGIN)
      }
    })
    return {}
  },
})
</script>
