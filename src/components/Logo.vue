<template>
  <nuxt-link :to="this.$C.URL.HOME" class="brand-link">
    <img
      src="~/assets/img/github-icon.svg"
      alt="github Logo"
      class="brand-image img-circle elevation-3"
      style="opacity: .8"
    />
    <span class="brand-text font-weight-light">{{
      $t("text.header.title")
    }}</span>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Logo extends Vue {}
</script>
