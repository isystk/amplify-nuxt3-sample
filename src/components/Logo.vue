<template>
  <div class="header-logo">
    <h1>
      <NuxtLink :to="$C.URL.HOME">
        {{ $config.APP_NAME }}
      </NuxtLink>
    </h1>
  </div>
</template>

<script lang="ts" setup></script>
