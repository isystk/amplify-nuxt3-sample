<template>
  <div class="input-group">
    <div class="input-group-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      :id="`yearmonth_${name}`"
      :name="name"
      type="hidden"
      :disabled="disabled"
      v-model="value"
    />

    <span v-if="readonly" class="form-control text-right">{{ year }}</span>
    <select
      v-if="!readonly"
      :id="`${name}_year`" :name="`year_${name}`"
      :class="`custom-select${state === false ? ' is-invalid' : ''}${$slots.prepend ? '' : ' rounded-left'}`"
      :required="required"
      :disabled="disabled"
      v-model="year"
      @change="onSelect"
    >
      <option v-for="n in years" :value="startYear + n" :key="n">
        {{ startYear + n }}
      </option>
    </select>

    <div class="input-group-append rounded-0">
      <span class="input-group-text border-right-0">
        年
      </span>
    </div>

    <span v-if="readonly" class="form-control text-right">{{ month }}</span>
    <select
      v-if="!readonly"
      :id="`${name}_month`" :name="`month_${name}`"
      :class="`custom-select${state === false ? ' is-invalid' : ''}`"
      :required="required"
      :disabled="disabled"
      v-model="month"
      @change="onSelect"
    >
      <option v-for="n in 12" :value="n" :key="n">
        {{ n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text">
        月
      </span>
    </div>

    <div class="input-group-append" v-if="$slots.append">
      <slot name="append"></slot>
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
import dayjs from 'dayjs';
import inputMixins from '~/mixins/input'
export default {
  mixins: [ inputMixins ],
  props: {
    name: String,
    defaultValue: String|Number,
    errors: Array|String,

    startYear: {
      type: Number,
      default: 1900,
    },
    endYear: {
      type: Number,
      default: 2100,
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
      object: null,
      value: '',
      year: 2000,
      month: 1,
    }
  },
  mounted() {
    this.setter(this.date(this.defaultValue))
    this.onChanged()
  },
  computed: {
    years: function() {
      return this.endYear - this.startYear;
    },
  },
  methods: {
    date: function(source) {
      return source ? dayjs(source) : dayjs()
    },
    setter: function(date) {
      this.object = date
      this.value = date.format('YYYY-MM')
      this.year = date.format('YYYY')
      this.month = date.format('M')
    },
    onSelect: function() {
      this.setter(this.date(new Date(this.year, this.month - 1)))
      this.onChanged()
    },
    onChanged: function() {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.value, this.year, this.month, this.object)
      }
    },
  },
}
</script>
