<template>
  <div class="input-group">
    <div v-if="$slots.prepend" class="input-group-prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      :id="`date_${name}`"
      v-model="value"
      :name="`${name}`"
      type="hidden"
      :disabled="disabled"
    />

    <span v-if="readonly" class="form-control text-right">{{ year }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_year`"
      v-model="year"
      :name="`${shadowName}[year]`"
      :class="`custom-select min-w-75px pr-3${validatedClassName}${
        $slots.prepend ? '' : ' rounded-left'
      }`"
      :required="required"
      :disabled="disabled"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in years" :key="`year_${n}`" :value="startYear + n">
        {{ startYear + n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text border-right-0"> 年 </span>
    </div>

    <span v-if="readonly" class="form-control text-right">{{ month }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_month`"
      v-model="month"
      :name="`${shadowName}[month]`"
      :class="`custom-select pr-3${validatedClassName}`"
      :required="required"
      :disabled="disabled"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in 12" :key="`month_${n}`" :value="n">
        {{ n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text border-right-0"> 月 </span>
    </div>

    <span v-if="readonly" class="form-control text-right">{{ day }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_day`"
      v-model="day"
      :name="`${shadowName}[day]`"
      :class="`custom-select pr-3${validatedClassName}`"
      :required="required"
      :disabled="disabled"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in days" :key="`day_${n}`" :value="n">
        {{ n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text"> 日 </span>
    </div>

    <div v-if="$slots.append" class="input-group-append">
      <slot name="append"></slot>
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
import moment from 'moment'
import inputMixins from '~/mixins/input'
export default {
  mixins: [inputMixins],
  props: {
    name: String,
    defaultValue: [String, Number],
    errors: [Array, String],

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
      value: '',
      object: null,
      year: '',
      month: '',
      day: '',
    }
  },
  computed: {
    years: function () {
      return this.endYear - this.startYear
    },
    days: function () {
      return this.object && this.object.endOf('month')
        ? this.object.endOf('month').format('D') * 1
        : 31
    },
  },
  mounted() {
    if (this.required || this.defaultValue) {
      this.setter(this.date(this.defaultValue))
      this.onChanged()
    }
  },
  methods: {
    date: function (date) {
      return moment(date || new Date())
    },
    setter: function (date) {
      this.object = date
      this.value = date.format('YYYY-MM-DD')
      this.year = date.format('YYYY')
      this.month = date.format('M')
      this.day = date.format('D')
    },
    onSelect: function () {
      if (!this.year || !this.month || !this.day) {
        this.value = this.year + '-' + this.month + '-' + this.day
        this.onChanged()
        return
      }
      this.setter(this.date(new Date(this.year, this.month - 1, this.day)))
      this.onChanged()
    },
    onChanged: function () {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.value, this.year, this.month, this.day)
      }
    },
  },
}
</script>
