<template>
  <section>
    <div class="entry-header">
      <h1 class="entry-title">会員登録</h1>
    </div>
    <div class="entry-content">
      <div class="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-1">
          <div class="form-control">
            <p>メールアドレス</p>
            <ElementsInputText
              name="email"
              type="text"
              :default-value="emailField.props.value.value"
              :errors="
                emailField.meta.isTouched.value && emailField.meta.error.value
                  ? 'メールアドレスを入力してください。'
                  : ''
              "
              @input="(e) => emailField.props.onInput(e)"
              @blur="(e) => emailField.props.onBlur(e)"
            />
          </div>
          <div class="form-control">
            <p>承認コード</p>
            <ElementsInputText
              name="verificationCode"
              type="verificationCode"
              :default-value="verificationCodeField.props.value.value"
              :errors="
                verificationCodeField.meta.isTouched.value &&
                verificationCodeField.meta.error.value
                  ? '承認コードを入力してください。'
                  : ''
              "
              @input="(e) => verificationCodeField.props.onInput(e)"
              @blur="(e) => verificationCodeField.props.onBlur(e)"
            />
          </div>
          <div>
            <ElementsButtonBasic
              label="認証する"
              name="Regist"
              @click="onSubmit"
            />
          </div>
          <div class="mt-5">
            <NuxtLink :to="$C.URL.LOGIN"> ログインはこちら </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const useField = (
  initialValue: string,
  validate: (value: string) => boolean = () => false
) => {
  const value = ref(initialValue)
  const isTouched = ref(false)

  const error = computed(() => {
    return !validate(value.value)
  })

  const onInput = (v) => {
    value.value = v
  }

  const onBlur = () => {
    isTouched.value = true
  }

  return {
    props: { value, onInput, onBlur },
    meta: {
      isTouched,
      error,
    },
  }
}

const presenceValidator = (value: string) => {
  return value.length > 0
}

const emailValidator = (value: string) => {
  const re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return re.test(value)
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const { $C } = useNuxtApp()

    // 各フィールドの定義(バリデーションメソッドの詳細は後述する)
    const emailField = useField('', emailValidator)
    const verificationCodeField = useField('', presenceValidator)

    // フォームのエラー判定。各フィールドにエラー情報を元に判定する。
    const error = computed(() => {
      return (
        emailField.meta.error.value || verificationCodeField.meta.error.value
      )
    })

    // submitメソッド。各フィールドの値を使い、サーバーにPOSTリクエストを送信する。
    const onSubmit = async () => {
      if (error.value) {
        console.log(error.value)
        return
      }
      router.push($C.URL.LOGIN)
    }

    // 各フィールド情報とフォーム情報をtemplate層に渡す
    return {
      emailField,
      verificationCodeField,
      onSubmit,
      meta: {
        error,
      },
    }
  },
})
</script>
