<template>
  <div>
    <div class="input-group">
      <div v-if="$slots.prepend" class="input-group-prepend">
        <slot name="prepend"></slot>
      </div>

      <div class="custom-file">
        <VueImageBase64
          :max-file-size="10485760"
          :thumbnail-size="100"
          :drop="true"
          drop-text="ファイルをドラッグ＆ドロップもしくは"
          capture="environment"
          :multiple="false"
          @handleChange="onChangeValue"
        />
        <label class="custom-file-label">
          {{ filename }}
        </label>
      </div>

      <div v-if="$slots.append" class="input-group-append">
        <slot name="append"></slot>
      </div>
    </div>

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
import VueImageBase64 from 'vuejs-image-base64'
// import VueImageBase64 from './VueImageBase64'

export default {
  components: {
    VueImageBase64,
  },
  mixins: [inputMixins],
  props: {
    name: String,
    errors: [Array, String],

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
    filename: function () {
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
    onChangeValue: function (data) {
      if (this.disabled || this.readonly) {
        return false
      }
      this.onChange(data)
    },
  },
}
</script>
