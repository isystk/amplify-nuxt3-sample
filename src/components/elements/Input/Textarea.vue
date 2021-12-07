<template>
  <div>
    <textarea class="form-control"
      :id="`textarea_${name}`"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :pattern="pattern"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete === false ? 'off' : ''"
      :state="state"
      :rows="rows"
      @change="(e) => onChangeValue(e.target.value || '')"
      @input="(e) => onInputValue(e.target.value || '')"
    ></textarea>

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
export default {
  mixins: [ inputMixins ],
  props: {
    name: String,
    defaultValue: String|Number,
    errors: Array|String,

    placeholder: String,
    pattern: String,
    rows: {
      type: Number,
      default: 4,
    },
    autocomplete: Boolean,

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
    onInput: Function,
  },
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    this.value = this.defaultValue
  },
  methods: {
    onChangeValue: function(changed) {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(changed)
      }
    },
    onInputValue: function(input) {
      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(input)
      }
    },
  },
}
</script>
