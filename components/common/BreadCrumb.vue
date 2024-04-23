<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const breadCrumb = computed(() => {
  const fullPath = route.fullPath
  const params = fullPath.substring(1).split('/')
  const data = [] as any

  let path = ''

  params.forEach((param: string) => {
    path = `${path}/${param}`
    const match = router.resolve(path)

    if (match.name) {
      const currentRoute = match.matched.find((item: any) => item?.name === match.name)

      if (currentRoute && currentRoute?.children?.length <= 0 && currentRoute?.meta?.titleBreadCrumb) {
        data.push({
          title: currentRoute?.meta?.titleBreadCrumb,
          path: match?.path,
        })
      }
    }
  })

  return data
})
</script>

<template>
  <div class="mb-[24px] flex gap-[8px]">
    <template v-for="(item, index) in breadCrumb" :key="item?.path">
      <span class="text-sm font-normal text-black-600" v-if="index > 0"> / </span>
      <nuxt-link
        class="text-sm font-normal no-underline"
        :class="$route.path === item?.path ? ['text-primary-500'] : ['text-black-600']"
        :to="item?.path"
      >
        {{ item?.title }}
      </nuxt-link>
    </template>
  </div>
</template>
