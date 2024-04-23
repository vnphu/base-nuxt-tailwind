<script setup lang="ts">
import TheHeaderUser from './TheHeaderUser.vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const { $auth } = useNuxtApp()

const navLinks = ref([
  {
    title: 'Danh mục',
    to: '/category',
    isAuth: true,
  },
  {
    title: 'Guides',
    to: '/guide',
    isAuth: false,
  },
  {
    title: 'Images',
    to: '/image',
    isAuth: false,
  },
  {
    title: 'Donate',
    to: '/donate',
    isAuth: false,
  },
])

const headerElement = ref()
const menuElement = ref()
const overlayElement = ref()

const handleScroll = (e: Event) => {
  if (window.scrollY >= 40) {
    headerElement.value?.classList?.add('header--sticky')
  } else {
    headerElement.value?.classList?.remove('header--sticky')
  }
}

const openMenuMobile = () => {
  menuElement.value?.classList?.add('active')
  overlayElement.value?.classList?.add('active')
  document.getElementsByTagName('html')[0].style.overflow = 'hidden'
}

const closeMenuMobile = () => {
  menuElement.value?.classList?.remove('active')
  overlayElement.value?.classList?.remove('active')
  document.getElementsByTagName('html')[0].style.overflow = 'unset'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header py-[12px] sticky top-0 right-0 left-0 bg-transparent transition-all z-98" ref="headerElement">
    <div class="container mx-auto">
      <nav class="flex items-center justify-between gap-[60px] lg:justify-start">
        <nuxt-link to="/">
          <img class="block max-w-[120px] h-[40px] lg:max-w-[166px]" src="@/assets/images/logo.svg" alt="" />
        </nuxt-link>

        <div
          class="group max-w-[312px] fixed top-0 right-0 bottom-0 left-0 translate-x-[-100%] [&.active]:translate-x-0 bg-white transition-all z-[9999] lg:max-w-[unset] lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:items-center lg-gap-[60px] lg:bg-transparent"
          ref="menuElement"
        >
          <ul class="lg:flex-1 flex flex-col lg:flex-row lg:items-center lg:gap-[40px]">
            <template v-for="item in navLinks" :key="item?.to">
              <li v-if="!item?.isAuth || (item?.isAuth && $auth?.user?.id)">
                <nuxt-link
                  class="block p-[16px] text-base font-normal text-gray-500 transition-all [&.router-link-active]:text-primary-500 [&.router-link-active]:font-semibold lg:p-[0]"
                  :to="item?.to"
                >
                  {{ item?.title }}
                </nuxt-link>
              </li>
            </template>
          </ul>

          <TheHeaderUser />
        </div>

        <!-- Overlay -->
        <div
          class="hidden [&.active]:block fixed top-0 right-0 bottom-0 left-0 bg-black/60 lg:hidden z-97"
          ref="overlayElement"
          @click="closeMenuMobile"
        >
          <button class="absolute top-14 right-16">
            <img class="icon" src="~/assets/icons/close-white.svg" alt="" />
          </button>
        </div>

        <!-- Button Menu Bar Mobile -->
        <button class="lg:hidden" @click="openMenuMobile">
          <img class="icon" src="~/assets/icons/menu-bar.svg" alt="" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0px 4px 20px 0px #00000014;

  &--sticky {
    // padding: 8px 16px;
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px #00000014;
    z-index: 98;
  }
}
</style>
