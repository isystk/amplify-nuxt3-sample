<template>
  <Header />
  <div class="contents">
    <div class="wrapper">
      <slot />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    // SideMenu,
    Footer
  }
}
</script>
