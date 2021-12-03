<template>
  <footer class="footer">
    <div class="wrapper">
      <nav class="footer-nav">
        <ul>
          <li>
            <Link :to="$C.URL.HOME">
              <a @click="">
              </a>
            </Link>
          </li>
          <li>
            <a
              href="#"
              @click=""
            >
            </a>
          </li>
          <li>
            <a
              href="#"
              @click=""
            >
            </a>
          </li>
          <li>
            <a href="#" class="js-scroll-top" @click="">
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
            </a>
          </li>
        </ul>
      </section>
      <section class="copylight">© 2020 isystk&apos;s sample</section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {useNuxtApp} from "#app";

const { $C } = useNuxtApp()
</script>

<script lang="ts">

export default {
  computed: {
    // ログイン状態
    isAuthenticated(): boolean {
      return false
      // return this.$store.getters["auth/isAuthenticated"];
    }
  }
}
</script>
