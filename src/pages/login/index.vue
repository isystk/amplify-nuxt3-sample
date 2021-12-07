<template>
  <section>
    <div class="entry-header">
      <h1 class="entry-title">ログイン</h1>
    </div>
    <div class="entry-content">
        <div class="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div class="grid grid-cols-1 md:grid-cols-1">
            <div class="form-control">
              <p>メールアドレス</p>
              <ElementsInputText name="email" type="text" :defaultValue="user.email" />
            </div>
            <div class="form-control">
              <p>パスワード</p>
              <ElementsInputText name="password" type="password" :defaultValue="user.password" />
            </div>
            <div>
              <ElementsButtonSubmit label="ログインする" name="login" />
            </div>
            <div class="mt-5">
              <NuxtLink :to="$C.URL.SIGNUP" >
                会員登録はこちら
              </NuxtLink>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, reactive, ref} from "vue";
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const state = reactive({
      user: {
        email: "hoge",
        password: "",
      }
    });
    const messageTwo = ref<string>("こんにちは");

    // mounted
    onMounted(async () => {
    })

    return {
      user: state.user
    }
  }
});
</script>