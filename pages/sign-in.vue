<script setup lang="ts">
import { useForm } from 'vee-validate'

definePageMeta({
  auth: 'guest',
  layout: 'auth',
})

const { $auth } = useNuxtApp()
const { handleSubmit } = useForm()
const router = useRouter()
const toast = useToast()

const form = ref({
  email: '',
  password: '',
})
const isLoading = ref(false)

const onSubmit = handleSubmit(async () => {
  isLoading.value = true

  try {
    const body = {
      email: form.value.email,
      password: form.value.password,
    }
    const reponse = await $auth.loginWith('local', {
      body,
    })
    router.push('/')
  } catch (error: any) {
    console.log(error)
    if (error?.statusCode === 401) {
      toast.add({
        severity: 'error',
        summary: 'Notifications',
        detail: `Login failed wrong email or password`,
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Notifications',
        detail: `Login failed \n ${error}`,
        life: 3000,
      })
    }
  } finally {
    isLoading.value = false
  }
})
const callback = (response: any) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response.code)
  $auth
    .loginWith('google', {
      body: {
        code: response.code,
      },
    })
    .then(() => {
      toast.add({ severity: 'success', summary: 'Notification', detail: 'Login Successfully', life: 3000 })
      router.push('/dashboard')
    })
    .catch((error: any) => {
      toast.add({ severity: 'error', summary: 'Notification', detail: `Sign in failed`, life: 3000 })
    })
}
</script>

<template>
  <div class="page">
    <h2 class="mb-[24px] text-3xl font-semibold text-black-900"> Sign in </h2>
    <!-- <p class="mb-[24px] text-base font-normal text-black-900">
      New user?
      <nuxt-link class="c-[#2187FF]" to="/sign-up"> Create an account </nuxt-link>
    </p> -->

    <!-- <nuxt-link
      class="mb-[16px] py-[8px] px-[16px] flex items-center justify-center gap-[12px] text-base font-normal text-white bg-[#3AB2F8] border-1 border-transparent border-solid rounded-lg"
      to="/">
      <img class="icon" src="~/assets/images/auth/mightyid.svg" alt="" />
      <span> Login with MightyID </span>
    </nuxt-link>
    <nuxt-link
      class="mb-[32px] py-[8px] px-[16px] flex items-center justify-center gap-[12px] text-base font-normal text-black-900 bg-transparent border-1 border-black-20 border-solid rounded-lg"
      to="/">
      <img class="icon" src="~/assets/images/auth/google.svg" alt="" />
      <span> Login with Google </span>
    </nuxt-link>-->
    <GoogleLogin :callback="callback" class="!w-full mb-4">
      <div
        class="mb-2 py-2 px-2 w-full flex items-center justify-center gap-2 border border-#E9E9E9 border-solid rounded transition-all cursor-pointer"
      >
        <div class="w-[24px] h-[24px] flex items-center justify-center bg-white rounded-full">
          <img class="w-[24px] h-[24px]" src="~/assets/icons/google.svg" alt="" />
        </div>
        <span class="text-base font-normal"> Sign in with Google </span>
      </div>
    </GoogleLogin>
    <div class="mb-[32px] relative h-[1px] bg-black-20">
      <div class="px-[8px] absolute top-0 left-[50%] translate-[-50%] text-base font-normal text-black-900 bg-white">
        Or
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <BaseInputText
        class="mb-[16px]"
        label="Email"
        name="email"
        :rules="{ required: true, email: true }"
        v-model="form.email"
      />
      <div class="mb-[16px] flex flex-col gap-1">
        <BaseInputPassword name="password" label="Password" :rules="{ required: true }" v-model="form.password">
          <template #labelRight>
            <nuxt-link class="text-base font-normal text-[#2187FF]" to="/forgot-password">Forgot password?</nuxt-link>
          </template>
        </BaseInputPassword>
      </div>

      <Button class="ml-auto !flex" label="Sign in" type="submit" :loading="isLoading" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
