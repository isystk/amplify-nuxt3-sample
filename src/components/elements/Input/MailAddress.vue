<template>
  <div class="input-group">
    <input
      :id="`email_${name}_value`"
      :name="`${name}`"
      type="hidden"
      :value="emailAddress"
    />

    <input
      :id="`email_${name}_username`"
      class="form-control rounded-left"
      :name="`${shadowName}[username]`"
      type="text"
      :value="values.username"
      placeholder="username"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('username', e.target.value || '')"
      @input="(e) => onInputValue('username', e.target.value || '')"
    />

    <div class="input-group-append">
      <span class="input-group-text border-right-0"> @ </span>
    </div>

    <input
      :id="`email_${name}_domain`"
      :class="`form-control${validatedClassName}`"
      :name="`${shadowName}[domain]`"
      type="text"
      :value="values.domain"
      placeholder="domain.com"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :state="state"
      @change="(e) => onChangeValue('domain', e.target.value || '')"
      @input="(e) => onInputValue('domain', e.target.value || '')"
    />

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

    placeholder: String,

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
        username: '',
        domain: '',
      },
    }
  },
  computed: {
    emailAddress: function () {
      if (!this.values.username && !this.values.domain) {
        return null
      }
      return this.values.username + '@' + this.values.domain
    },
  },
  mounted() {
    this.values = this.parser(this.defaultValue)
  },
  methods: {
    isAddressString: function (address) {
      return (
        address &&
        (typeof address === 'string' || address instanceof String) &&
        address.indexOf('@') > 0
      )
    },
    isAddressObject: function (address) {
      return address && typeof address === 'object'
    },
    parser: function (address) {
      let username = ''
      let domain = ''
      if (!address) {
        return {
          username,
          domain,
        }
      }

      if (this.isAddressObject(address)) {
        return address
      }

      if (this.isAddressString(address)) {
        ;[username, domain = ''] = address.split('@')
      }

      return {
        username,
        domain,
      }
    },
    onChangeValue: function (field, changed) {
      this.values[field] = changed
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.emailAddress)
      }
    },
    onInputValue: function (field, input) {
      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(this.emailAddress)
      }
    },
  },
}
</script>
