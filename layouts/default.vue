<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useAppStore } from '~/stores/app'
import TheHeader from 'components/TheHeader.vue'

const nuxtConfig = useRuntimeConfig()
const appStore = useAppStore()
const toast = useToast()

watch(
  () => appStore.error,
  (error) => {
    if (error) {
      toast.add({ severity: 'error', summary: 'Lỗi' + error?.code, detail: error?.message, life: 1000 })
      appStore.error = null
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="layout-default">
    <div class="flex h-screen">
      <div class="flex-1 flex flex-col bg-[#F7F8FA] overflow-hidden">
        <TheHeader />
        <NuxtPage />
      </div>
    </div>
  </div>
  <ConfirmDialog />
  <Toast />
</template>
