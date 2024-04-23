<script setup lang="ts">
import { avatarDefault } from '~/assets/images'

type TypeAvatar = 'circle' | 'square' | null

defineProps({
  size: {
    type: [String, Number],
    default: 32,
  },
  url: {
    type: String as PropType<string | null | undefined | unknown>,
  },
  type: {
    type: String as PropType<TypeAvatar>,
    default: '',
  },
})
</script>

<template>
  <img
    class="object-cover rounded-full"
    :style="{ width: size + 'px', height: size + 'px', borderRadius: type === 'square' ? '4px' : '50%' }"
    :src="typeof url === 'string' ? url : avatarDefault"
    alt=""
  />
</template>
