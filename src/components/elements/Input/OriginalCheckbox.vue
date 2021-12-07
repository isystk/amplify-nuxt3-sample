<template>
  <span class="original-checkbox" @click.stop="() => null">
    <input
      type="checkbox"
      :name="name"
      :id="id || `custom_checkbox_${name}`"
      :value="value"
      :disabled="disabled"
      v-model="checking"
      @change="() => $emit('checked', checking)"
    />
    <span class="check" />
  </span>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String|Number,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checking: false,
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler: function(v) {
        this.checking = v
      },
    }
  },
}
</script>