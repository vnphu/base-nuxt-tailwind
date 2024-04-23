<script setup lang="ts">
import { useField } from 'vee-validate';

type OptionItem = {
  name: string | number,
  value: string | number,
}

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select'
  },
  options: {
    type: Array as PropType<OptionItem[]>,
    required: true
  },
  showVertical: {
    type: Boolean,
    detault: false,
  },
  label: {
    type: String,
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    required: false
  },
})

const emit = defineEmits(['update:modelValue'])

const rules = computed(() => props.rules)

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue as string | number,
  syncVModel: true,
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-base font-normal c-black-90" v-if="label">
      {{ label }}
      <span class="c-danger" v-if="rules.required">*</span>
    </label>

    <div class="flex gap-[24px]" :class="[showVertical ? 'flex-col' : 'flex-row items-center']">
      <div class="flex items-center" v-for="item in options" :key="item.value">
        <RadioButton :inputId="(item.value?.toString() as any)" :name="props.name" :value="item.value"
          v-model="value" />
        <label class="ml-1" :for="(item.value?.toString() as any)">
          {{ item.name }}
        </label>
      </div>
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>