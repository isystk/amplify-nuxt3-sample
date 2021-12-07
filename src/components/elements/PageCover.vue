<template>
  <div
    v-if="display"
    class="page-cover"
    @click.prevent.stop="() => null"
  >
    <div
      v-if="content.title"
      class="page-cover-title"
    >
      {{ content.title }}
    </div>

    <div
      v-if="content.description"
      class="page-cover-description"
    >
      {{ content.description }}
    </div>

    <div
      v-if="content.countUp"
      class="page-cover-countup"
    >
      {{ seconds | number2clock }}
    </div>

    <div
      v-if="content.cancelAction"
      class="page-cover-cancel"
    >
      <div
        class="btn btn-execute"
        @click.prevent.stop.once="handleCancel"
      >{{ content.cancelLabel }}</div>
    </div>
    <spinner v-if="content.loading" />
  </div>
</template>
<script>
export default {
  props: {
    display: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
      default: () => ({
        title: null,
        description: null,
        countUp: false,
        loading: true,
        refreshCount: false,
        cancelLabel: 'キャンセル',
        cancelAction: () => null,
      }),
    },
  },
  data() {
    return {
      timer: null,
      startTime: null,
      currentTime: null,
    }
  },
  computed: {
    seconds: function() {
      if (!this.currentTime || !this.startTime) {
        return 0
      }

      return Math.floor((this.currentTime.getTime() - this.startTime.getTime()) / 1000)
    },
  },
  watch: {
    display: {
      immediate: true,
      handler: function(newDisplay, oldDisplay) {
        if (newDisplay === oldDisplay) {
          return
        }

        if (newDisplay) {
          this.startTimer()
        } else {
          this.stopTimer()
        }
      },
    },
    content: {
      immediate: false,
      deep: true,
      handler: function(newContent, _) {
        if (newContent.refreshCount) {
          this.startTimer()
        }
      },
    },
  },
  methods: {
    startTimer: function() {
      if (typeof this.content.countUp === 'undefined' || !this.content.countUp) {
        return
      }

      this.startTime = new Date()
      this.currentTime = new Date()
      if (!this.timer) {
        this.timer = setInterval(() => this.currentTime = new Date(), 50)
      }
    },
    stopTimer: function() {
      clearInterval(this.timer)
      this.timer = null
      this.startTime = null
      this.currentTime = null
    },

    handleCancel: async function() {
      this.stopTimer()

      if (this.content.cancelAction && typeof this.content.cancelAction === 'function') {
        await this.content.cancelAction()
      }
    },
  },
}
</script>
