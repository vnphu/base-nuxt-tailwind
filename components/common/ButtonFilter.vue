<script setup lang="ts">

const op = ref()

const toggle = (event: Event) => {
  op.value.toggle(event)
}

const hidePanel = (event: Event) => {
  op.value.hide()
}

</script>

<template>
  <Button class="gap-2 bg-primary-20" @click="toggle">
    <img src="~/assets/icons/i-filter-secondary.svg" alt="">
    <span class="c-primary">
      Bộ lọc
    </span>
  </Button>

  <OverlayPanel ref="op">
    <div class="w-[300px]">
      <slot :hidePanel="hidePanel"></slot>
    </div>
  </OverlayPanel>
</template>