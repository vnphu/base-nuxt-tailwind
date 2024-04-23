import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
  defineRule('required', (value: string | number) => {
    if ((typeof value === 'string' && !value.length) || value === null || value === undefined) {
      return 'Trường này bắt buộc'
    }
    return true
  })

  defineRule('email', (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true
    }
    // Check if email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return 'Trường này phải là email'
    }
    return true
  })

  defineRule('minLength', (value: string, [limit]: [number]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true
    }
    if (value.length < limit) {
      return `Tối thiểu ${limit} ký tự`
    }
    return true
  })

  defineRule('confirmed', (value: string, [target]: [string], ctx) => {
    // console.log(value, ctx.form[target])
    if (value === ctx.form[target]) {
      return true
    }
    return `Mật khẩu không khớp`
  })
})
