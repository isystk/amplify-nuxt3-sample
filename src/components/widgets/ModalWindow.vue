<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="modal-window">
        <div id="overlay-background"></div>
        <div class="isystk-overlay open">
          <a href="#" @click="toggleModal">
            <span class="close">
              <i class="far fa-times-circle" :style="{ fontSize: '30px' }"></i>
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
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: 'ModalWindow',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const {isOpen} = toRefs(props);

    const toggleModal = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      toggleModal,
      title: 'titke',
      utl: 'http://localhost'
    };
  }
});
</script>
