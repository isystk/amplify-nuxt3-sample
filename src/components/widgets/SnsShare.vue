<template>
<teleport target="body">
  <div id="overlay-background"></div>
  <div class="isystk-overlay open">
    <a href="#" @click="">
      <span class="close">
        <i class="far times-circle" :style="{ fontSize: '20px' }"></i>
      </span>
    </a>
    <div class="wrap">
      <ul class="sns-buttons">
        <li class="share-twitter">
          <a
            :href="`http://twitter.com/intent/tweet?text=${title}%20${url}`"
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
            :href="`http://b.hatena.ne.jp/add?mode=confirm&amp;url=${url}&amp;title=${title}`"
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
            :href="`http://line.me/R/msg/text/?${title}%0D%0A${url}`"
            target="_blank"
            rel="noreferrer"
          >
            LINE
          </a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isVisible = ref(false);

    const toggleModal = () => {
      isVisible.value = !isVisible.value;
    };
    return {
      isVisible,
      toggleModal,
      title: 'titke',
      utl: 'http://localhost'
    };
  }
});
</script>
