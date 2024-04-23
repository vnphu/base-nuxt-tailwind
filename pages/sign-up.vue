<script setup lang="ts">
import { useForm } from 'vee-validate'

definePageMeta({
  auth: 'guess',
  layout: 'auth',
})

const { handleSubmit } = useForm()
const router = useRouter()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isChecked: false,
})
const isLoading = ref(false)

const onSubmit = handleSubmit(async () => {
  isLoading.value = true

  try {
    const body = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    }
    const { data } = useApi('/account/auth/register', {
      method: 'POST',
      body,
    })
  } catch (error: any) {
    console.log(error)
    toast.add({ severity: 'error', summary: 'Notification', detail: error?.data?.error || error, life: 3000 })
  }

  isLoading.value = false
})
</script>

<template>
  <div class="page">
    <h2 class="mb-[8px] text-3xl font-semibold text-black-900"> Sign up </h2>
    <p class="mb-[24px] text-base font-normal text-black-900">
      Already have an account?
      <nuxt-link class="text-[#2187FF]" to="/sign-in"> Sign in </nuxt-link>
    </p>

    <!-- <nuxt-link
      class="mb-[16px] py-[8px] px-[16px] flex items-center justify-center gap-[12px] text-base font-normal hite bg-[#3AB2F8] border-1 border-transparent border-solid rounded-lg"
      to="/">
      <img class="icon" src="~/assets/images/auth/mightyid.svg" alt="" />
      <span> Register with MightyID </span>
    </nuxt-link>
    <nuxt-link
      class="mb-[32px] py-[8px] px-[16px] flex items-center justify-center gap-[12px] text-base font-normal text-black-900 bg-transparent border-1 border-black-20 border-solid rounded-lg"
      to="/">
      <img class="icon" src="~/assets/images/auth/google.svg" alt="" />
      <span> Register with Google </span>
    </nuxt-link>

    <div class="mb-[32px] relative h-[1px] bg-black-20">
      <div class="px-[8px] absolute top-0 left-[50%] translate-[-50%] text-base font-normal text-black-900 bg-white">
        Or
      </div>
    </div> -->
    <form @submit.prevent="onSubmit">
      <BaseInputText class="mb-[16px]" label="Name" name="name" :rules="{ required: true }" v-model="form.name" />
      <BaseInputText
        class="mb-[16px]"
        label="Email"
        name="email"
        :rules="{ required: true, email: true }"
        v-model="form.email"
      />
      <BaseInputPassword
        class="mb-[16px]"
        label="Password"
        name="password"
        :rules="{ required: true }"
        v-model="form.password"
      />
      <!-- <div class="mb-3 flex flex-col gap-1">
        <BaseInputPassword
          name="confirm-password"
          label="Confirm password"
          :rules="{ required: true, confirmed: 'password' }"
          v-model="form.confirmPassword"
        />
      </div> -->

      <div class="mb-[16px] flex items-start gap-[12px]">
        <BaseCheckbox name="agree" v-model="form.isChecked" />
        <label class="mb-0 text-base font-normal text-gray-500" for="agree">
          Creating an account means you’re okay with our
          <nuxt-link class="text-[#2187FF]" to="/terms-of-service" target="_blank"> Term of Service, </nuxt-link>
          <nuxt-link class="text-[#2187FF]" to="/privacy-policy" target="_blank"> Privacy Policy </nuxt-link>
        </label>
      </div>

      <Button
        class="ml-auto !flex"
        label="Sign up"
        type="submit"
        :disabled="form.isChecked ? false : true"
        :loading="isLoading"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
