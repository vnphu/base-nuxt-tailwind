<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useAppStore } from '~/stores/app'

const nuxtConfig = useRuntimeConfig()
const appStore = useAppStore()
const toast = useToast()

watch(
  () => appStore.error,
  (error) => {
    if (error) {
      toast.add({ severity: 'error', summary: 'Error Message ' + error?.code, detail: error?.message, life: 1000 })
      appStore.error = null
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-1 relative bg-primary-10">
      <div class="flex flex-col gap-[24px]">
        <div class="p-[32px]">
          <img class="max-h-[56px]" src="~/assets/images/logo.svg" alt="" />
        </div>

        <div class="flex-1">
          <img class="w-full" src="~/assets/images/main-auth.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="basis-[40%] h-screen flex flex-col justify-center">
      <NuxtPage class="p-[32px] overflow-auto" />
    </div>
  </div>

  <ConfirmDialog />
  <Toast />
</template>
