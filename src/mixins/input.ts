
export default {
  computed: {
    state: function() {
      if (this.validated) {
        return true
      }
      return this.errors && this.errors.length > 0 ? false : null
    },
    error: function() {
      if (!this.errors) {
        return ''
      }
      if (Array.isArray(this.errors)) {
        return this.errors.filter(Boolean).join(', ')
      }
      return this.errors
    },
    validatedClassName: function() {
      if (this.state === true) {
        return ' is-valid'
      }
      if (this.state === false) {
        return ' is-invalid'
      }
      return ''
    },
  },
}
