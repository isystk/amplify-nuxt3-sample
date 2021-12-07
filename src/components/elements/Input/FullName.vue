<template>
  <div class="input-group">
    <input
      :id="`fullname_${name}_value`"
      :name="`${name}[full]`"
      type="hidden"
      :value="fullName"
    />

    <div class="input-group-prepend">
      <span class="input-group-text rounded-left" :state="state">
        {{ international ? firstNameLabel : lastNameLabel }}
      </span>
    </div>
    <input
      :class="`form-control${validatedClassName}`"
      type="text"
      :id="`fullname_${name}_${international ? 'first' : 'last'}`"
      :name="`${name}[${international ? 'first' : 'last'}]`"
      :value="international ? values.first : values.last"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue(international ? 'first' : 'last', e.target.value || '')"
      @input="(e) => onInputValue(international ? 'first' : 'last', e.target.value || '')"
    >

    <div class="input-group-append">
      <span class="input-group-text border-right-0" :state="state">
        {{ international ? lastNameLabel : firstNameLabel }}
      </span>
    </div>
    <input
      :class="`form-control${validatedClassName}`"
      type="text"
      :id="`fullname_${name}_${international ? 'last' : 'first'}`"
      :name="`${name}[${international ? 'last' : 'first'}]`"
      :value="international ? values.first : values.first"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue(international ? 'last' : 'first', e.target.value || '')"
      @input="(e) => onInputValue(international ? 'last' : 'first', e.target.value || '')"
    >

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
    errors: Array|String,

    firstNameLabel: {
      type: String,
      default: '名',
    },
    lastNameLabel: {
      type: String,
      default: '姓',
    },

    international: {
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

    onChange: Function,
  },
  data() {
    return {
      value: '',
      values: {
        last: '',
        first: '',
      },
    }
  },
  computed: {
    fullName: function() {
      if (this.international) {
        return this.values.first + ' ' + this.values.last
      } else {
        return this.values.last + ' ' + this.values.first
      }
    },
  },
  methods: {
    isNameString: function(name) {
      return name && (typeof name === 'string' || name instanceof String) && name.indexOf(' ') > 0
    },
    isNameObject: function(name) {
      return name && typeof name === 'object'
    },
    parser: function(name) {
      if (!name) {
        return {
          first: '',
          last: '',
        }
      }

      if (this.isNameObject(name)) {
        return name
      }

      if (this.isNameString(name)) {
        const names = name.split(' ')
        if (this.international) {
          return {
            first: names[0],
            last: names[1],
          }
        } else {
          return {
            first: names[1],
            last: names[0],
          }
        }
      }

      return {
        first: '',
        last: '',
      }
    },
    onChangeValue: function(field, changed) {
      console.log({changed})
      this.values[field] = changed
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.fullName)
      }
    },
    onInputValue: function(field, input) {
      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(this.fullName)
      }
    },
  },
  mounted() {
    this.values = this.parser(this.defaultValue)
  },
}
</script>
