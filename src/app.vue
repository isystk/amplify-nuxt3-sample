;
<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { provideStore } from '@/store/index'
provideStore()

console.log('Env', import.meta.env)
</script>
