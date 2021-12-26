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
              <li>
                <NuxtLink
                  v-show="!Auth.isLogin()"
                  :to="$C.URL.LOGIN"
                  @click="sideMenu.close"
                >
                  ログイン
                </NuxtLink>
                <a
                  v-show="Auth.isLogin()"
                  @click.prevent="
                    () => {
                      Auth.logout()
                      router.push($C.URL.HOME)
                      sideMenu.close()
                    }
                  "
                >
                  ログアウト
                </a>
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

<script lang="ts" setup>
import { useSideMenu } from '@/stores/sideMenu'
import { Auth } from '@/auth/auth'

const router = useRouter()
// data
const sideMenu = useSideMenu()

// method
const toggleMenu = () => {
  sideMenu.toggle()
}
</script>
