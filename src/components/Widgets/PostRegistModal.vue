<template>
  <Modal title="投稿フォーム" :is-open="isOpen" :handle-close="handleClose">
    <Form
      v-slot="{ errors, values, setFieldValue }"
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="onSubmit"
    >
      <div class="mt">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <Field
            name="title"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.title }"
          />
          <ErrorMessage class="text-red" name="title" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            本文
          </label>
          <Field
            name="description"
            as="textarea"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'is-invalid': errors.description }"
          />
          <ErrorMessage class="text-red" name="description" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            写真
          </label>
          <Field
            name="photo"
            type="hidden"
            :class="{ 'is-invalid': errors.photo }"
          />

          <v-container fluid>
            <v-row dense>
              <v-col cols="12" md="6">
                <VueImageBase64
                  :max-file-size="10485760"
                  :thumbnail-size="700"
                  :drop="true"
                  drop-text="ファイルをドラッグ＆ドロップもしくは"
                  capture="environment"
                  :multiple="true"
                  @handleChange="
                    (data) => setFieldValue('photo', data.fileData)
                  "
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  :src="values.photo || '/images/no_image.png'"
                  style="width: 100%"
                  :transition="false"
                  cover
                />
              </v-col>
            </v-row>
          </v-container>
          <ErrorMessage class="text-red" name="photo" />
        </div>
        <div class="mb-4">
          <v-btn depressed color="primary" type="submit"> 登録 </v-btn>
        </div>
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Widgets/Modal.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import VueImageBase64 from 'vuejs-image-base64'
import * as Yup from 'yup'
import { injectStore } from '@/store'
import { Post } from '@/services/post'
const main = injectStore()
const props = defineProps<{
  isOpen: boolean
  handleClose: () => void
  postId?: string | null
  initialValues?: FormValues
}>()

const schema = Yup.object().shape({
  title: Yup.string().required('タイトルを入力してください'),
  description: Yup.string().required('本文を入力してください'),
  photo: Yup.string().required('写真を入力してください'),
})

export type FormValues = {
  title?: string
  description?: string
  photo?: string
}

const onSubmit = async (values: FormValues) => {
  try {
    console.log(values)
    const post = {
      ...values,
    } as Post
    if (props.postId) {
      await main?.post.updatePost(props.postId, post)
    } else {
      await main?.post.createPost(post)
    }
    props.handleClose()
  } catch (e) {
    alert(e.message)
  }
}
</script>
