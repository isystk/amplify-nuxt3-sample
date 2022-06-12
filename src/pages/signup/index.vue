<template>
  <pages-box :breadcrumbs="[{ text: '会員登録' }]" :small="true">
    <VeeForm v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit">
      <div class="mt">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            メールアドレス
          </label>
          <Field
            name="email"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.email }"
          />
          <ErrorMessage class="text-red" name="email" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            パスワード
          </label>
          <Field
            name="password"
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.password }"
          />
          <ErrorMessage class="text-red" name="password" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            パスワード (確認)
          </label>
          <Field
            name="confirmPassword"
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.confirmPassword }"
          />
          <ErrorMessage class="text-red" name="confirmPassword" />
        </div>
        <div class="mb-4">
          <v-btn depressed color="primary" type="submit"> 登録 </v-btn>
        </div>
      </div>
    </VeeForm>
    <NuxtLink :to="Url.LOGIN"> ログインはこちら </NuxtLink>
  </pages-box>
</template>

<script setup lang="ts">
useMeta({
  title: '会員登録',
})
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import { injectStore } from '@/store'
import { Url } from '@/constants/url'
const router = useRouter()
const main = injectStore()

const schema = Yup.object().shape({
  email: Yup.string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスを正しく入力してください'),
  password: Yup.string()
    .min(6, 'パスワードは6文字以上で入力して下さい')
    .required('パスワードを入力してください'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
    .required('パスワード(確認)を入力してください'),
})

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const onSubmit = async (values: FormValues) => {
  try {
    console.log(values)
    const { email, password } = values
    const result = await main?.auth.signUp(email, email, password)
    console.log(result)
    await router.push(Url.SIGNUP_VERIFICATION)
  } catch (e) {
    alert(e.message)
  }
}
</script>
