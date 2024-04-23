<script setup lang="ts">
import AvatarDefault from '~/assets/images/avatar-default.svg'
import { iProfile, iLogout } from '~/assets/icons'

const { $auth }: any = useNuxtApp()
const router = useRouter()

const userPanel = ref()

const MENU_SETTING = computed(() => [
  {
    key: 'profile',
    title: 'Profile',
    icon: iProfile,
    onClick: () => {
      router.push('/profile')
      closeUserPanel()
    },
  },
  {
    key: 'logout',
    title: 'Logout',
    icon: iLogout,
    classTitle: '!text-red-500',
    onClick: () => {
      $auth.logout().then(() => {
        closeUserPanel()
      })
    },
  },
])

const openUserPanel = (e: Event) => {
  userPanel.value.toggle(e)
}

const closeUserPanel = () => {
  userPanel.value?.hide()
}

const goAccountManagement = () => {
  window.location.href = `${useRuntimeConfig().public.urlLogin}/profile`
}
</script>

<template>
  <div class="p-[16px] lg:p-0">
    <div class="flex items-center gap-4" v-if="!$auth?.user?.id">
      <nuxt-link
        class="flex-1 py-[12px] px-[24px] text-base font-semibold text-center text-primary-500 bg-transparent rounded-lg transition-all hover:opacity-80 lg:flex-none"
        to="/login"
      >
        Login
      </nuxt-link>

      <nuxt-link
        class="flex-1 py-[12px] px-[24px] text-base font-semibold text-center text-white bg-primary-500 rounded-lg transition-all hover:opacity-80 lg:flex-none"
        to="/register"
      >
        Register
      </nuxt-link>
    </div>

    <button v-else>
      <BaseAvatar
        class="cursor-pointer"
        :size="32"
        :url="$auth?.user?.avatar?.original_url || AvatarDefault"
        type="circle"
        @click="openUserPanel"
      />
    </button>

    <OverlayPanel class="w-[320px] mt-[12px] !before:ml-[-14px] !after:ml-[-12px]" ref="userPanel">
      <div class="py-[8px] px-[16px] flex items-center gap-3">
        <BaseAvatar :url="$auth?.user?.avatar?.original_url || AvatarDefault" type="circle" />
        <div class="flex-1 flex flex-col">
          <span class="text-base font-semibold text-gray-500 line-clamp-1">{{ $auth?.user?.name }} </span>
          <span class="text-xs font-normal text-gray-500 line-clamp-1">{{ $auth?.user?.email }}</span>
        </div>
      </div>

      <!-- <Button class="mb-[16px] mx-[16px] bg-primary-10 border-transparent text-sm text-white rounded-lg 
       " style="width: -webkit-fill-available;" label="Account management" @click="goAccountManagement" /> -->

      <ul class="">
        <li
          class="flex items-center gap-3 py-12px px-16px cursor-pointer hover:bg-gray-1"
          v-for="item in MENU_SETTING"
          :key="item.key"
          @click="item?.onClick"
        >
          <img class="w-24px h-24px" :src="item.icon" :alt="item.icon" />
          <span class="text-base text-gray-500 capitailize" :class="item.classTitle">{{ item.title }}</span>
        </li>
      </ul>
    </OverlayPanel>
  </div>
</template>
