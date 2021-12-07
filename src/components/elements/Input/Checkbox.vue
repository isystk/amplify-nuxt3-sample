<template>
  <div>
    <div
      v-if="readonly"
      class="button-group"
    >
      <span
        v-for="option in options"
        :key="option.value || option"
        :class="`btn btn-info${values && (values.includes(option.value) || values.includes(option)) ? ' active' : ' disabled'}`"
      >
        {{ option.text || option.value }}
      </span>
    </div>

    <div
      v-else
      class="btn-group-toggle btn-group"
      data-toggle="buttons"
    >
      <label
        v-for="(option, i) in options"
        :key="option.value || i"
        class="btn btn-outline-secondary"
      >
        <input
          type="checkbox"
          :id="`checkbox_${name}_${i}`"
          :name="`${name}[]`"
          :value="option.value"
          v-model="values"
          :required="required"
          :disabled="disabled"
          @click="() => onChangeValue(option)"
        >
        {{ option.text || option.value }}
      </label>
    </div>

    <invalid-feedback
      v-if="state === false"
      :id="`error_${name}`"
      class="d-block"
      :error="error"
    ></invalid-feedback>
  </div>
</template>

<script>
import inputMixins from '~/mixins/input'
export default {
  mixins: [ inputMixins ],
  props: {
    name: String,
    defaultValue: Array,
    options: Array,
    errors: Array|String,

    validated: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },

    onChange: Function,
  },
  data() {
    return {
      values: [],
    }
  },
  mounted() {
    this.values = this.defaultValue ? [...this.defaultValue] : []
  },
  methods: {
    onChangeValue: function(option) {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.values)
      }
      this.$emit('change', this.values)
    },
  },
}
</script>
