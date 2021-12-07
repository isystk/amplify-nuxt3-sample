<template>
  <form :method="`${methodName === 'get' ? 'get' : 'post'}`" :action="action" :class="className">
    <input type="hidden" name="_token" :value="csrf" />
    <input type="hidden" name="_method" value="PUT" v-if="isPut" />
    <input type="hidden" name="_method" value="DELETE" v-if="isDelete" />
    <button
      type="submit"
      :class="`btn btn-${variant}`"
      v-on:click.stop.prevent="handleClick"
    >
      {{ label }}
    </button>
  </form>
</template>

<script>
import csrfMixins from '~/mixins/csrf'
export default {
  mixins: [ csrfMixins ],
  props: {
    method: String,
    action: String,
    className: String,
    variant: {
      type: String,
      default: 'link',
    },
    label: {
      type: String,
      default: 'Confirm',
    },
    message: {
      type: String,
      default: '本当に実行してもよろしいですか？',
    },
  },
  computed: {
    methodName: function() {
      return this.method ? this.method.toLowerCase() : 'get'
    },
    isPut: function() {
      return this.methodName === 'put'
    },
    isDelete: function() {
      return this.methodName === 'delete'
    },
  },
  methods: {
    handleClick: function() {
      if (confirm(this.message)) {
        return this.execute()
      }
      return false;
    },
    execute: function() {
      this.$el.submit()
    }
  },
};
</script>
