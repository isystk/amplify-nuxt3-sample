<template>
  <div>
    <img :src="image.source" :class="`${imageClassName || ''}`" />
    <div class="custom-file">
      <input
        :id="`image_input_${name}`"
        type="file"
        :name="name"
        :pattern="pattern"
        accept="image/*"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :class="`custom-file-input ${inputClassName || ''} text-left mt-1`"
        @change="onChangeImage"
      />
      <label
        class="custom-file-label"
        :for="`image_input_${name}`"
        :data-browse="browseText"
      >
        {{ filename }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,

    pattern: String,

    imagePath: String,
    imageClassName: String,
    inputClassName: String,

    placeholder: {
      type: String,
      default: '',
    },
    browseText: {
      type: String,
      default: '選択',
    },

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
  },
  data() {
    return {
      image: {
        source: '',
        name: '',
        type: '',
      },
    }
  },
  computed: {
    filename: function () {
      return this.image.name || this.placeholder
    },
  },
  mounted() {
    if (this.imagePath) {
      this.image.source = this.imagePath
    }
  },
  methods: {
    onChangeImage: function (e) {
      if (this.disabled || this.readonly) {
        return false
      }

      const file = (e.target.files || e.dataTransfer)[0]
      if (file.type.startsWith('image/')) {
        this.image.source = window.URL.createObjectURL(file)
        this.image.name = file.name
        this.image.type = file.type
      }
    },
  },
}
</script>
