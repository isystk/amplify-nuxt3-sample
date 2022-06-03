<template>
  <pages-box :breadcrumbs="[{ text: 'マイページ' }]">
    <div class="mx-auto right-5 absolute">
      <v-btn color="info" type="button" @click="registPost"> 新規登録 </v-btn>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">タイトル</th>
          <th class="text-left">本文</th>
          <th class="text-left">画像</th>
          <th class="text-left">
            <br />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ id, data }, idx) in lists.displayLists" :key="idx">
          <td>{{ data.title }}</td>
          <td>{{ data.description }}</td>
          <td>
            <v-img
              :src="data.photo"
              style="width: 6vw; height: 8vh"
              :transition="false"
              cover
            />
          </td>
          <td>
            <ul>
              <li class="ma-1">
                <v-btn
                  depressed
                  color="info"
                  type="button"
                  @click="editPost(id, data)"
                >
                  変更
                </v-btn>
              </li>
              <li class="ma-1">
                <v-btn
                  depressed
                  color="error"
                  type="button"
                  @click="deletePost(id)"
                >
                  削除
                </v-btn>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        @update:modelValue="pageChange"
      />
    </div>
  </pages-box>
  <PostRegistModal
    :is-open="isOpen"
    :handle-close="handleClose"
    :post-id="store.postId"
    :initial-values="store.initialValues"
  />
</template>

<script setup lang="ts">
definePageMeta({
  title: 'マイページ',
})
definePageMeta({
  middleware: ['auth'],
})
import { onBeforeMount, reactive, ref } from 'vue'
import PostRegistModal, {
  FormValues,
} from '@/components/Widgets/PostRegistModal.vue'
import { injectStore } from '@/store'
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
import { Post } from '@/services/post'
const main = injectStore()
import * as _ from 'lodash'
const lists = reactive<{ displayLists: Post[] }>({ displayLists: [] })
const page = ref(1)
const length = ref(0)
const pageSize = 3
const isOpen = ref(false)

const store = reactive<{ initialValues: FormValues; postId: string | null }>({
  initialValues: {},
  postId: null,
})

onBeforeMount(async () => {
  await loadList()
})

const loadList = async () => {
  await main?.post.readPosts()
  const myPosts = main?.post.getMyPosts()
  length.value = Math.ceil(_.size(myPosts) / pageSize)
  const entries = Object.entries(myPosts).map(([key, value]) => value)
  lists.displayLists = _.slice(entries, 0, pageSize)
}

const pageChange = (pageNumber) => {
  const myPosts = main?.post.getMyPosts()
  const entries = Object.entries(myPosts).map(([key, value]) => value)
  lists.displayLists = _.slice(
    entries,
    pageSize * (pageNumber - 1),
    pageSize * pageNumber
  )
}

const deletePost = async (postId: string) => {
  if (!confirm('削除します。よろしいですか？')) {
    return
  }
  await main?.post.deletePost(postId)
  await loadList()
}

const editPost = (postId: string, post: Post) => {
  store.postId = postId
  store.initialValues = { ...post } as FormValues
  isOpen.value = true
}

const registPost = () => {
  store.postId = null
  store.initialValues = {}
  isOpen.value = true
}

const handleClose = async () => {
  isOpen.value = false
  await loadList()
}
</script>
