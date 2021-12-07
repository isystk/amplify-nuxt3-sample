<template>
  <div>
    <div class="input-group">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <div class="custom-file">
        <input
          type="file"
          :id="`file_input_${name}`"
          :name="name"
          :pattern="pattern"
          :accept="accept"
          :required="required"
          :disabled="disabled"
          :readonly="readonly"
          :class="`custom-file-input ${className || ''}`"
          :state="state"
          :multiple="multiple"
          @change="onChangeValue"
        >
        <label
          class="custom-file-label"
          :for="`file_input_${name}`"
          :data-browse="browseText"
        >
          {{ filename }}
        </label>
      </div>

      <div class="input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
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
    errors: Array|String,

    pattern: String,
    accept: String,
    placeholder: {
      type: String,
      default: '',
    },
    browseText: {
      type: String,
      default: '選択',
    },
    multiple: {
      type: Boolean,
      default: false,
    },

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

    className: String,
    onChange: Function,
  },
  data() {
    return {
      files: [],
    }
  },
  computed: {
    filename: function() {
      if (!this.files || this.files.length === 0) {
        return this.placeholder
      }

      if (this.files.length === 1) {
        return this.files[0].name
      } else {
        return `${this.files.length}個のファイルを選択中`
      }
    },
  },
  methods: {
    onChangeValue: function(e) {
      if (this.disabled || this.readonly) {
        return false
      }

      this.files = e.target.files

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.files)
      }
    },
  },
}
</script>
