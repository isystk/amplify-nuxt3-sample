<template>
  <ul class="sns-buttons">
    <li class="share-twitter">
      <a
        :href="`http://twitter.com/intent/tweet?text=${snsTitle}%20${url}`"
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </a>
    </li>
    <li class="share-facebook">
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
    </li>
    <li class="share-hatena">
      <a
        :href="`http://b.hatena.ne.jp/add?mode=confirm&amp;url=${url}&amp;title=${snsTitle}`"
        target="_blank"
        rel="noreferrer"
      >
        はてブ
      </a>
    </li>
    <li class="share-pocket">
      <a
        :href="`http://getpocket.com/edit?url=${url}`"
        target="_blank"
        rel="noreferrer"
      >
        Pocket
      </a>
    </li>
    <li class="share-line">
      <a
        :href="`http://line.me/R/msg/text/?${snsTitle}%0D%0A${url}`"
        target="_blank"
        rel="noreferrer"
      >
        LINE
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRuntimeConfig } from '#app'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { title } = toRefs(props)
    const $config = useRuntimeConfig()
    return {
      snsTitle: title.value || $config.APP_NAME,
      url: window.location.href,
    }
  },
})
</script>
