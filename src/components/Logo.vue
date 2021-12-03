<template>
  <div class="header-logo">
    <NuxtLink :to="$C.URL.HOME">
      <a>
      </a>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import {useNuxtApp} from "#app";

export default {
  data() {
    return {
      $C: null
    }
  },
  setup() {
    const { $C } = useNuxtApp()
  },
  mounted() {
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    console.log(process.env.APP_NAME);
  }

}
</script>
