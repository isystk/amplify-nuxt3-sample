<template>
  <div>
    <span v-if="readonly" class="form-control">{{ valueText }}</span>

    <select
      v-if="!readonly"
      :id="`select_input_${name}`"
      v-model="value"
      :class="`custom-select${validatedClassName}`"
      :name="name"
      :options="options"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue(e.target.value || '')"
    >
      <option v-if="placeholder" :value="null" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text || option.value }}
      </option>
    </select>

    <ElementsInvalidFeedback
      v-if="state === false"
      :id="`error_${name}`"
      class="d-block"
      :error="error"
    ></ElementsInvalidFeedback>
  </div>
</template>

<script>
import inputMixins from '~/mixins/input'
export default {
  mixins: [inputMixins],
  props: {
    name: String,
    defaultValue: [String, Number],
    placeholder: String,
    options: Array,
    errors: [Array, String],

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
  computed: {
    valueText: function () {
      return (
        (
          this.options.find((option) => option.value === this.value) || {
            text: '',
          }
        ).text || this.defaultValue
      )
    },
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function () {
        this.value =
          !this.defaultValue && this.defaultValue === ''
            ? null
            : this.defaultValue
      },
    },
  },
  methods: {
    onChangeValue: function (changed) {
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
