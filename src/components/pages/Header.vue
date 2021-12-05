<template>
  <header class="header">
    <div class="wrapper">
      <Logo />
      <div class="nav">
        <div
            :class="[sideMenu.isOpen ? 'menu-btn on' : 'menu-btn']"
            @click="toggleMenu"
        >
        <figure></figure>
        <figure></figure>
        <figure></figure>
      </div>
      <div id="side-menu" :class="[sideMenu.isOpen ? 'open' : '']">
        <nav>
          <ul>
            <li>
              <NuxtLink :to="$C.URL.HOME" @click="sideMenu.close">
                HOME
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="$C.URL.MEMBER" @click="sideMenu.close">
                マイページ
              </NuxtLink>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div id="layer-panel" :class="[sideMenu.isOpen ? 'on' : '']"></div>
    </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import {useSideMenu} from "@/composables/sideMenu";

export default defineComponent({
  setup() {
    // data
    const sideMenu = useSideMenu()

    // method
    const toggleMenu = () => {
      sideMenu.toggle()
    }

    return {
      toggleMenu,
      sideMenu,
    }
  }
});

</script>


