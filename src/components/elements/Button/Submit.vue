<template>
  <div class="form-group row mt-5">
    <div class="col col-sm-6 offset-sm-3">
      <button
        type="submit"
        :name="name || 'save'"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.once="handleClick"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
  },
  methods: {
    handleClick: function () {
      return false
    },
  },
}
</script>
