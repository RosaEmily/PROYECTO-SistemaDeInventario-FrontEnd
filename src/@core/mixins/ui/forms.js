// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibility = {
  data() {
    return {
      passwordFieldType: 'password',
      passwordFieldType1: 'password',
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordVisibility1() {
      this.passwordFieldType1 = this.passwordFieldType1 === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
