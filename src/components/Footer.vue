<template>
  <footer
    class="main-footer text-center"
    :class="[isAuthenticated ? '' : 'ml-0']"
  >
    <strong>Copyright &copy; 2019-2020 <a href="#">isystk.com</a>.</strong> All
    rights reserved.
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  // ログイン状態
  get isAuthenticated(): boolean {
    return this.$store.getters["auth/isAuthenticated"];
  }
}
</script>
