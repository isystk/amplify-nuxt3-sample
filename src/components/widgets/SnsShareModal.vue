<template>
  <WidgetsModal :is-open="snsShare.isOpen" @close="handleClose">
    <SnsShare />
  </WidgetsModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSnsShare } from '@/stores/snsShare'

export default defineComponent({
  setup(props, context) {
    const snsShare = useSnsShare()

    const handleClose = () => {
      snsShare.close()
      context.emit('close')
    }
    return {
      snsShare,
      handleClose,
    }
  },
})
</script>
