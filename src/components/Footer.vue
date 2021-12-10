<template>
  <footer class="footer">
    <div class="wrapper">
      <nav class="footer-nav">
        <ul>
          <li>
            <NuxtLink :to="$C.URL.HOME" @click="sideMenu.close()">
              <i class="fas fa-home" :style="{ fontSize: '16px' }"></i>
            </NuxtLink>
          </li>
          <li>
            <a href="#" @click.prevent="snsShare.open()">
              <i class="fas fa-share-alt" :style="{ fontSize: '16px' }"></i>
            </a>
            <WidgetsSnsShareModal />
          </li>
          <li>
            <a href="#" @click.prevent="sideMenu.toggle()">
              <i class="fas fa-bars" :style="{ fontSize: '16px' }"></i>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="scrollToTop">
              <i class="fas fa-chevron-up" :style="{ fontSize: '16px' }"></i>
            </a>
          </li>
        </ul>
      </nav>
      <section class="follow-links">
        <ul class="menu">
          <li>
            <a
              href="https://profile.isystk.com/"
              target="_blank"
              rel="noreferrer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://github.com/isystk/isystk-frontend-sample"
              target="_blank"
              rel="noreferrer"
            >
              Github
              <i class="fab fa-github" :style="{ fontSize: '16px' }"></i>
            </a>
          </li>
        </ul>
      </section>
      <section class="copylight">© 2020 isystk&apos;s sample</section>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSideMenu } from '@/stores/sideMenu'
import { useSnsShare } from '@/stores/snsShare'

export default defineComponent({
  setup() {
    // data
    const sideMenu = useSideMenu()
    const snsShare = useSnsShare()

    // method
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    return {
      scrollToTop,
      sideMenu,
      snsShare,
    }
  },
})
</script>
