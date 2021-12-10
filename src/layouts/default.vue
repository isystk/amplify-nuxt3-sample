<template>
  <Header />
  <div id="pc-menu">
    <div className="wrapper">
      <nav>
        <ul>
          <li>
            <NuxtLink :to="$C.URL.HOME">HOME</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="$C.URL.MEMBER">マイページ</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="$C.URL.LOGIN">ログイン</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="contents">
    <div class="wrapper">
      <div v-if="error">
        {{ error }}
      </div>
      <Suspense>
        <template #default>
          <slot />
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref, Ref } from 'vue'

export default defineComponent({
  setup() {
    const error: Ref<any> = ref(null)

    // 非同期コンポーネントでErrorが発生した場合、このライフサイクルフックでキャッチされる。
    // エラーの内容を、リアクティブなエラー表示用変数の`error`に詰めている
    onErrorCaptured((e) => {
      error.value = e
      return true
    })

    return {
      error,
    }
  },
})
</script>
