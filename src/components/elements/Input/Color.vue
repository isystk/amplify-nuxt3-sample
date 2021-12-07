<template>
  <div class="position-relative">
    <div class="input-group">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <input
        :class="`form-control${className ? ' ' + className : ''}${validatedClassName}`"
        :id="`color_${name}`"
        :name="name"
        type="color"
        :value="value"
        :placeholder="placeholder"
        :pattern="pattern"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :state="state"
        @change="(e) => onChangeValue(e.target.value || '')"
        @input="(e) => onInputValue(e.target.value || '')"
      >

      <div class="input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </div>

    <spinner
      v-if="loading"
      label="loading..."
      small
    />

    <invalid-feedback
      v-if="state === false"
      :id="`error_${name}`"
      class="d-block"
      :error="error"
    />
  </div>
</template>

<script>
import inputMixins from '~/mixins/input'
const COLOR_MAP = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
}
export default {
  mixins: [ inputMixins ],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: String,
    defaultValue: String|Number,
    errors: Array|String,

    placeholder: String,
    pattern: String,
    autocomplete: Boolean,
    className: String,

    validated: Boolean,
    loading: Boolean,
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
    onInput: Function,
  },
  data() {
    return {
      value: '',
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function() {
        console.log(this.defaultValue)
        this.value = this.parseColor(this.defaultValue)
        console.log(this.defaultValue, this.value)
      },
    },
  },
  methods: {
    onChangeValue: function(changed) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(changed)
      }
    },
    onInputValue: function(input) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(input)
      }
    },
    parseColor: function(color) {
      if (color.indexOf('#') === -1 && color.length === 6) {
        return '#' + color
      }
      if (typeof(COLOR_MAP[color]) !== 'undefined') {
        return COLOR_MAP[color]
      }
      return color
    },
  },
}
</script>
