<template>
  <div class="bg-white rounded px-8 pt-6 pb-8 mb-4">
    <div class="grid grid-cols-1 md:grid-cols-1">
      <div class="form-control">
        <p>タイトル<ElementsRequired /></p>
        <ElementsInputText
          name="title"
          type="text"
          :default-value="titleField.props.value.value"
          :errors="
            titleField.meta.isTouched.value && titleField.meta.error.value
              ? 'タイトルを入力してください。'
              : ''
          "
          @input="(e) => titleField.props.onInput(e)"
          @blur="(e) => titleField.props.onBlur(e)"
        />
      </div>
      <div class="form-control">
        <p>本文<ElementsRequired /></p>
        <ElementsInputTextarea
          name="description"
          :default-value="descriptionField.props.value.value"
          :errors="
            descriptionField.meta.isChanged.value &&
            descriptionField.meta.error.value
              ? '本文を入力してください。'
              : ''
          "
          @input="(e) => descriptionField.props.onInput(e)"
          @change="(e) => descriptionField.props.onChange(e)"
        />
      </div>
      <div class="form-control">
        <p>写真<ElementsRequired /></p>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <ElementsInputImageFile
            name="photo"
            :default-value="photoField.props.value.value"
            :errors="
              photoField.meta.isChanged.value && photoField.meta.error.value
                ? '写真を入力してください。'
                : ''
            "
            @change="(e) => photoField.props.onChange(e.fileData)"
          />
          <div>
            <img
              v-show="photoField.props.value.value !== ''"
              :src="photoField.props.value.value"
              :style="{ width: '350px' }"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-3 md:grid-cols-6">
          <ElementsButtonBasic
            v-show="isEdit"
            label="削除する"
            name="delete"
            button-class="bg-red-500"
            @click="onDelete"
          />
          <ElementsButtonBasic
            label="登録する"
            name="regist"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMemberPostsStore } from '@/stores/memberPosts'
import { Post } from '~/@types/Posts'

type Props = {
  post: () => {}
}

const props = withDefaults(defineProps<Props>(), {
  post: {},
})

const useField = (
  initialValue: string,
  validate: (value: string) => boolean = () => false
) => {
  const value = ref(initialValue)
  const isTouched = ref(false)
  const isChanged = ref(false)

  const error = computed(() => {
    return !validate(value.value)
  })

  const onInput = (v) => {
    value.value = v
  }

  const onChange = (v) => {
    value.value = v
    isChanged.value = true
  }

  const onBlur = () => {
    isTouched.value = true
  }

  return {
    props: { value, onInput, onChange, onBlur },
    meta: {
      isTouched,
      isChanged,
      error,
    },
  }
}

const presenceValidator = (value: string) => {
  return value.length > 0
}

// 各フィールドの定義(バリデーションメソッドの詳細は後述する)
const titleField = useField('', presenceValidator)
const descriptionField = useField('', presenceValidator)
const photoField = useField('', presenceValidator)
const memberPostsStore = useMemberPostsStore()
const router = useRouter()
const { $C } = useNuxtApp()
const { post } = toRefs(props)

const isEdit = post.value && post.value.id

if (isEdit) {
  titleField.props.value.value = post.value.title
  descriptionField.props.value.value = post.value.description
  photoField.props.value.value = post.value.photo
}

// フォームのエラー判定。各フィールドにエラー情報を元に判定する。
const error = computed(() => {
  return (
    titleField.meta.error.value ||
    descriptionField.meta.error.value ||
    photoField.meta.error.value
  )
})

// submitメソッド。各フィールドの値を使い、サーバーにPOSTリクエストを送信する。
const onSubmit = async () => {
  if (error.value) {
    console.log(error.value)
    return
  }
  // 今回はサーバーリクエストは行っていない
  const userId =
    'CognitoIdentityServiceProvider.b5mlqbm890h8tabqhro9bno8j.test.userData'
  const data: Post = {
    ...post.value,
    userId,
    title: titleField.props.value.value,
    description: descriptionField.props.value.value,
    photo: photoField.props.value.value,
  }
  if (isEdit) {
    await memberPostsStore.updatePost(post.value.id, data)
  } else {
    await memberPostsStore.registPost(data)
  }
  router.push($C.URL.MEMBER)
}

const onDelete = async () => {
  if (!window.confirm('削除します。よろしいですか？')) {
    return
  }
  await memberPostsStore.deletePost(post.value.id)
  router.push($C.URL.MEMBER)
}
</script>
