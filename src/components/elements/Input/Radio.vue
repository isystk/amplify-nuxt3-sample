<template>
  <div>
    <div v-if="readonly" class="button-group">
      <span
        v-for="option in options"
        :key="option.value || option"
        :variant="`btn btn-info${
          value && (option.value === value || option === value)
            ? ' active'
            : ' disabled'
        }`"
      >
        {{ option.text || option }}
      </span>
    </div>

    <div v-else class="btn-group-toggle btn-group" data-toggle="buttons">
      <label
        v-for="(option, i) in options"
        :key="option.value || i"
        class="btn btn-outline-secondary"
      >
        <input
          :id="`radio_${name}_${i}`"
          v-model="value"
          type="radio"
          :name="`${name}`"
          :value="option.value"
          :required="required"
          :disabled="disabled"
          @click="onChangeValue(option)"
        />
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
  mixins: [inputMixins],
  props: {
    name: String,
    defaultValue: [String, Number],
    errors: [Array, String],
    options: Array,

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
      value: null,
    }
  },
  mounted() {
    this.value = this.defaultValue
  },
  methods: {
    onChangeValue: function (changed) {
      if (this.readonly) {
        this.value = this.defaultValue
        return false
      } else {
        this.value = changed
      }

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(changed)
      }
    },
  },
}
</script>
