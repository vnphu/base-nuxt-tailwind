<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
  },
  styleInput: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    required: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
watch(
  () => value.value,
  (val) => {
    emit('update:modelValue', val)
  },
)
watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-base font-normal text-black-900" :for="props.name" v-if="label">
      {{ label }}
    </label>
    <InputSwitch :id="props.name" :style="styleInput" v-model="value" :disabled="disabled" />
  </div>
</template>
