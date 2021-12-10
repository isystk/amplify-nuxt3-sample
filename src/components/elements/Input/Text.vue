<template>
  <div class="position-relative">
    <div class="input-group">
      <div v-if="$slots.prepend" class="input-group-prepend">
        <slot name="prepend"></slot>
      </div>

      <input
        :id="`text_${name}`"
        ref="t_input"
        :class="`form-control${
          className ? ' ' + className : ''
        }${validatedClassName}`"
        :name="name"
        :type="type"
        :value="value"
        :list="`list_${name}`"
        :placeholder="placeholder"
        :pattern="pattern"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocompleteValue"
        :state="state"
        @change="(e) => onChangeValue(e.target.value || '')"
        @input="(e) => onInputValue(e.target.value || '')"
        @blur="(e) => onBlurValue(e.target.value || '')"
      />

      <div
        v-if="!readonly && !disabled && options && options.length > 0"
        class="input-group-append"
      >
        <div class="dropdown">
          <button
            :id="`dropdown_${name}`"
            type="button"
            class="btn btn-secondary dropdown-toggle rounded-0 py-2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
            flip="false"
          >
            <div
              v-for="[oIndex, option] in options.entries()"
              :key="`li_${oIndex}`"
              @click="() => onSelectOption(option)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="$slots.append" class="input-group-append">
        <slot name="append"></slot>
      </div>
    </div>

    <spinner v-if="loading" label="loading..." small />

    <invalid-feedback
      v-if="state === false"
      :id="`error_${name}`"
      class="d-block"
      :error="error"
    />
  </div>
</template>

<script lang="ts">
import inputMixins from '@/mixins/input'

export default {
  mixins: [inputMixins],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: String,
    defaultValue: [String, Number],
    errors: [Array, String],

    options: Array,
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
    onBlur: Function,
    onInputForMultibyte: Function,
    onSelect: Function,
  },
  data() {
    return {
      value: '',

      isMultibyte: false,
    }
  },
  computed: {
    autocompleteValue: function () {
      if (this.autocomplete) {
        return null
      }
      return this.type === 'password' ? 'new-password' : 'off'
    },
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function () {
        this.value = this.defaultValue
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.t_input) {
        this.setEvent()
      } else {
        setTimeout(() => {
          this.setEvent()
        }, 500)
      }
    })
  },
  methods: {
    setEvent: function () {
      try {
        const $input = this.$refs.t_input
        $input.addEventListener('keyup', this.onKeyUpValue)

        $input.addEventListener('compositionstart', () => {
          this.isMultibyte = true
        })
        $input.addEventListener('compositionend', this.onInputForMultibyteValue)
      } catch (error) {
        console.error(this.type, this.name, error)
      }
    },
    onSelectOption: function (selected) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onSelect && typeof this.onSelect === 'function') {
        this.onSelect(selected)
      }
    },
    onChangeValue: function (changed) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(changed)
      }
    },
    onInputValue: function (input) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(input)
      }
    },
    onBlurValue: function (input) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.onBlur && typeof this.onBlur === 'function') {
        this.onBlur(input)
      }
    },
    onInputForMultibyteValue: function (e) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (!this.isMultibyte) {
        return false
      }
      this.isMultibyte = false
      if (
        this.onInputForMultibyte &&
        typeof this.onInputForMultibyte === 'function'
      ) {
        this.onInputForMultibyte(e.target.value, true)
      }
    },
    onKeyUpValue: function (e) {
      if (this.disabled || this.readonly) {
        return false
      }

      if (this.isMultibyte) {
        return false
      }
      if (
        e.key === 'Control' ||
        e.key === 'Shift' ||
        e.key === 'Alt' ||
        e.key === 'Meta'
      ) {
        return false
      }
      if (
        this.onInputForMultibyte &&
        typeof this.onInputForMultibyte === 'function'
      ) {
        this.onInputForMultibyte(e.target.value, false)
      }
    },
  },
}
</script>
