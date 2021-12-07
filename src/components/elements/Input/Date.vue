<template>
  <div class="input-group">
    <div class="input-group-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      :id="`date_${name}`"
      :name="`${name}`"
      type="hidden"
      :disabled="disabled"
      v-model="value"
    />

    <span v-if="readonly" class="form-control text-right">{{ year }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_year`"
      :name="`${shadowName}[year]`"
      :class="`custom-select min-w-75px pr-3${validatedClassName}${$slots.prepend ? '' : ' rounded-left'}`"
      :required="required"
      :disabled="disabled"
      v-model="year"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in years" :value="startYear + n" :key="`year_${n}`">
        {{ startYear + n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text border-right-0">
        年
      </span>
    </div>

    <span v-if="readonly" class="form-control text-right">{{ month }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_month`"
      :name="`${shadowName}[month]`"
      :class="`custom-select pr-3${validatedClassName}`"
      :required="required"
      :disabled="disabled"
      v-model="month"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in 12" :value="n" :key="`month_${n}`">
        {{ n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text border-right-0">
        月
      </span>
    </div>

    <span v-if="readonly" class="form-control text-right">{{ day }}</span>
    <select
      v-if="!readonly"
      :id="`date_${name}_day`"
      :name="`${shadowName}[day]`"
      :class="`custom-select pr-3${validatedClassName}`"
      :required="required"
      :disabled="disabled"
      v-model="day"
      @change="onSelect"
    >
      <option v-if="!required"></option>
      <option v-for="n in days" :value="n" :key="`day_${n}`">
        {{ n }}
      </option>
    </select>

    <div class="input-group-append">
      <span class="input-group-text">
        日
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
      value: '',
      object: null,
      year: '',
      month: '',
      day: '',
    }
  },
  computed: {
    years: function() {
      return this.endYear - this.startYear;
    },
    days: function() {
      return this.object && this.object.endOf('month')
        ? this.object.endOf('month').format('D') * 1
        : 31
    },
  },
  methods: {
    date: function(date) {
      return dayjs(date || new Date())
    },
    setter: function(date) {
      this.object = date
      this.value = date.format('YYYY-MM-DD')
      this.year = date.format('YYYY')
      this.month = date.format('M')
      this.day = date.format('D')
    },
    onSelect: function() {
      if (!this.year || !this.month || !this.day) {
        this.value = this.year + '-' + this.month + '-' + this.day
        this.onChanged()
        return
      }
      this.setter(this.date(new Date(this.year, this.month - 1, this.day)))
      this.onChanged()
    },
    onChanged: function() {
      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.value, this.year, this.month, this.day)
      }
    },
  },
  mounted() {
    if (this.required || this.defaultValue) {
      this.setter(this.date(this.defaultValue))
      this.onChanged()
    }
  },
}
</script>
