<template>
  <NuxtLink :to="Url.TOP">
    <v-toolbar-title class="w-64">
      {{ $config.APP_NAME }}
    </v-toolbar-title>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Url } from '@/constants/url'
</script>
