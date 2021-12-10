<template>
  <section>
    <div class="entry-header">
      <h1 class="entry-title">HOME</h1>
    </div>
    <div class="entry-content">
      <p>すべての投稿を一覧表示しています。</p>
      <modal-window :isOpen="isModalOpen"></modal-window>
      <div class="box-list">
        <PagesPostsList />
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import ModalWindow from "@/components/widgets/ModalWindow.vue"

export default defineComponent({
  components: {
    ModalWindow,
  },
  setup() {
    const isModalOpen = ref(true);

    return { isModalOpen };
  }
});

</script>
