<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, null] as PropType<String | null>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Enter',
  },
  label: {
    type: String,
  },
  styleInput: {
    type: Object,
    default: () => ({}),
  },
  classInput: {
    type: [String, Object, Array],
    default: '',
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const rules = computed(() => props.rules)

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue as string,
  syncVModel: true,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-[16px]">
      <label class="flex-1 text-base font-normal text-black-900" :for="props.name" v-if="label">
        {{ label }} <span class="text-red-500" v-if="rules?.required">*</span>
      </label>

      <slot name="labelRight"></slot>
    </div>

    <div class="flex flex-col">
      <Password
        :inputId="props.name"
        class="[&>.p-inputtext]:w-full"
        :class="[classInput, errorMessage ? 'p-invalid' : '']"
        :style="styleInput"
        :placeholder="placeholder"
        toggleMask
        :feedback="false"
        v-model="value"
        @blur="handleBlur($event, true)"
        :disabled="disabled"
      />
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>
