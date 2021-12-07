<template>
  <div>
    <div class="input-group float-left max-w-250px">
      <input
        :id="`postalcode_${name}_value`"
        :name="`${name}`"
        type="hidden"
        :value="postalCode"
      />

      <input class="form-control rounded-left"
        :id="`postalcode_${name}_area`"
        :name="`${shadowName}[area]`"
        type="tel"
        :value="values.area"
        placeholder="012"
        pattern="\d{3}$"
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
        :id="`postalcode_${name}_local`"
        :name="`${shadowName}[local]`"
        type="tel"
        :value="values.local"
        placeholder="3456"
        pattern="\d{4}$"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :state="state"
        @change="(e) => onChangeValue('local', e.target.value || '')"
        @input="(e) => onInputValue('local', e.target.value || '')"
      >

      <div
        class="input-group-append"
        v-if="endpointUri"
      >
        <button
          type="button"
          class="btn btn-secondary"
          @click="onSearchAddress"
          :disabled="searching"
        >{{ searchLabel }}</button>
      </div>

      <invalid-feedback
        v-if="state === false"
        :id="`error_${name}`"
        class="d-block"
        :error="error"
      ></invalid-feedback>
    </div>
    <a
      v-if="helpLabel"
      href="https://www.post.japanpost.jp/zipcode/"
      target="_blank"
      class="btn btn-link float-left py-2 px-1 px-sm-2"
    >
      {{ helpLabel }}
      <i class="fas fa-external-link-alt"></i>
    </a>
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

    endpointUri: String,
    searchLabel: {
      type: String,
      default: '検索',
    },
    helpLabel: {
      type: String,
      default: '郵便番号がわからない方はこちら',
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
    onInput: Function,
    onSearch: Function,
  },
  data() {
    return {
      value: '',
      values: {
        area: '',
        local: '',
      },
      searching: false,
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
    postalCode: function() {
      if (!this.values.area && !this.values.local) {
        return ''
      }
      return (this.values.area || '') + '-' + (this.values.local || '')
    },
  },
  methods: {
    isPostalCodeString: function(code) {
      return code && (typeof code === 'string' || code instanceof String) && code.indexOf('-') >= 0
    },
    isPostalCodeObject: function(code) {
      return code && typeof code === 'object'
    },
    parser: function(code) {
      let area = ''
      let local = ''
      if (!code) {
        return {
          area,
          local,
        }
      }

      if (this.isPostalCodeObject(code)) {
        return code
      }

      if (this.isPostalCodeString(code)) {
        [ area = '', local = '' ] = code.split('-')
      }

      return {
        area,
        local,
      }
    },
    onChangeValue: function(field, changed) {
      this.values[field] = changed
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.postalCode)
      }
    },
    onInputValue: function(field, input) {
      if (this.onInput && typeof this.onInput === 'function') {
        this.onInput(this.postalCode)
      }
    },
    onSearchAddress: async function() {
      if (!this.endpointUri) {
        return
      }
      if (this.searching) {
        return
      }

      this.searching = true
      try {
        const response = await axios.post(
          this.endpointUri,
          {
            type: 'postal_code',
            postal_code: this.postalCode,
          },
        )
        if (!response || !response.data ) {
          alert('検索に失敗しました')
          this.searching = false
          return
        }

        const { data, status } = response
        const {
          result,
          status_code,
          message,
          addresses,
        } = data

        if (!result) {
          alert(message)
          this.searching = false
          return
        }

        if (!addresses || addresses.length === 0) {
          alert('住所が見つかりませんでした')
          this.searching = false
          return
        }

        if (this.onSearch && typeof this.onSearch === 'function') {
          this.onSearch(addresses)
        }
      } catch (error) {
        alert('エラーが発生しました')
      }
      this.searching = false
    },
  },
}
</script>
