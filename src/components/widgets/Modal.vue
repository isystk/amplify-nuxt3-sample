<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="modal-window">
        <div id="overlay-background"></div>
        <div class="isystk-overlay open">
          <a href="#" @click.prevent="handleClose">
            <span class="close">
              <i class="far fa-times-circle" :style="{ fontSize: '30px' }"></i>
            </span>
          </a>
          <div class="wrap">
            <slot></slot>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const handleClose = () => {
      context.emit('close')
    }
    return {
      handleClose,
    }
  },
})
</script>
