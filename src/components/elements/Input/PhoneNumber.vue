<template>
  <div class="input-group">
    <input
      :id="`phonenumber_${name}_value`"
      :name="`${name}`"
      type="hidden"
      :value="phoneNumber"
    />

    <div class="input-group-append" v-if="international">
      <span class="input-group-text rounded-left">
        +
      </span>
    </div>
    <input :class="`form-control${validatedClassName}`"
      v-if="international"
      type="tel"
      :id="`phonenumber_${name}_country`"
      :name="`${shadowName}[country]`"
      :value="values.country"
      placeholder="81"
      pattern="\d{2,4}$"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('country', e.target.value || '')"
      @input="(e) => onInputValue('country', e.target.value || '')"
    >
    <div class="input-group-append" v-if="international">
      <span class="input-group-text border-right-0">
        -
      </span>
    </div>

    <input
      :class="`form-control${international ? '' : ' rounded-left'}${validatedClassName}`"
      type="tel"
      :id="`phonenumber_${name}_area`"
      :name="`${shadowName}[area]`"
      :value="values.area"
      placeholder="03"
      pattern="\d{2,4}$"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('area', e.target.value || '')"
      @input="(e) => onInputValue('area', e.target.value || '')"
    >
    <div class="input-group-append">
      <span class="input-group-text border-right-0">
        -
      </span>
    </div>

    <input :class="`form-control${validatedClassName}`"
      type="tel"
      :id="`phonenumber_${name}_local`"
      :name="`${shadowName}[local]`"
      :value="values.local"
      placeholder="0000"
      pattern="\d{3,5}$"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('local', e.target.value || '')"
      @input="(e) => onInputValue('local', e.target.value || '')"
    >
    <div class="input-group-append">
      <span class="input-group-text border-right-0">
        -
      </span>
    </div>

    <input :class="`form-control${validatedClassName}`"
      :id="`phonenumber_${name}_branch`"
      :name="`${shadowName}[branch]`"
      type="tel"
      :value="values.branch"
      placeholder="1234"
      pattern="\d{3,5}$"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('branch', e.target.value || '')"
      @input="(e) => onInputValue('branch', e.target.value || '')"
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

    placeholder: String,
    international: {
      type: Boolean,
      default: false,
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

    onChange: Function,
  },
  data() {
    return {
      value: '',
      values: {
        country: '',
        area: '',
        local: '',
        branch: '',
      },
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function() {
        this.values = this.parser(this.defaultValue)
      },
    },
  },
  computed: {
    phoneNumber: function() {
      const numbers = []
      if (this.international) {
        numbers.push('+' + this.values.country)
      } else if (!this.values.area && !this.values.local && !this.values.branch) {
        return ''
      }
      numbers.push(
        this.values.area,
        this.values.local,
        this.values.branch,
      )
      return numbers.join('-')
    },
  },
  methods: {
    isPhoneString: function(number) {
      return number && (typeof number === 'string' || number instanceof String) && number.indexOf('-') >= 0
    },
    isPhoneObject: function(number) {
      return number && typeof number === 'object'
    },
    parser: function(number) {
      let country = ''
      let area = ''
      let local = ''
      let branch = ''
      if (!number) {
        return {
          country,
          area,
          local,
          branch,
        }
      }

      if (this.isPhoneObject(number)) {
        return number
      }

      if (this.isPhoneString(number)) {
        const numbers = number.split('-')
        if (this.international) {
          [ country, area = '', local = '', branch = '' ] = numbers
        } else {
          [ area = '', local = '', branch = '' ] = numbers
        }
      }

      return {
        country,
        area,
        local,
        branch,
      }
    },
    onChangeValue: function(field, changed) {
      this.values[field] = changed
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.phoneNumber)
      }
    },
    onInputValue: function(field, input) {
      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(this.phoneNumber)
      }
    },
  },
}
</script>
