<template>
  <label
    :class="`original-multiple-select ${selecting ? 'selected' : ''}`"
    :for="id"
    @click.stop="() => null"
  >
    <input
      type="checkbox"
      :id="id"
      v-model="selecting"
      :value="value"
      :disabled="disabled"
    />
    {{ name }}
  </label>
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
    selected: {
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
      selecting: false,
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler: function(v) {
        this.selecting = v
      },
    },
    selecting: {
      handler: function(v) {
        this.$emit('change', this.value, v)
      },
    },
  },
}
</script>