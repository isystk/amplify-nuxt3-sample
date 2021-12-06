<template>
  <div class="header-logo">
    <NuxtLink :to="$C.URL.HOME">
      <h1>
        <a>{{ $config.APP_NAME }}</a>
      </h1>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  async setup() {
    return {
    }
  },
})

</script>
