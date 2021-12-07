<template>
  <div>
    <span v-if="readonly" class="form-control">{{ valueText }}</span>

    <select
      :class="`custom-select${validatedClassName}`"
      v-if="!readonly"
      :id="`select_input_${name}`"
      :name="name"
      v-model="value"
      :options="options"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue(e.target.value || '')"
    >
      <option
        v-if="placeholder"
        :value="null"
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >{{ option.text || option.value }}</option>
    </select>

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
    defaultValue: String|Number,
    placeholder: String,
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
    onSelect: Function,
  },
  data() {
    return {
      value: null,
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function() {
        this.value = !this.defaultValue && this.defaultValue === '' ? null : this.defaultValue
      },
    },
  },
  computed: {
    valueText: function() {
      return (this.options.find(option => option.value === this.value) || { text: '' }).text || this.defaultValue
    },
  },
  methods: {
    onChangeValue: function(changed) {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(changed)
      }
      if (this.onSelect && typeof this.onSelect === 'function') {
        const option = this.options.find((option) => option.value === changed)
        this.onSelect(option)
      }
    },
  },
}
</script>
