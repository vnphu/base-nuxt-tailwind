<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    required: false
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Enter'
  },
  label: {
    type: String,
  },
  styleInput: {
    type: Object,
    default: () => ({})
  },
  classInput: {
    type: [String, Object, Array],
    default: ''
  },
  rules: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const { value, errorMessage } = useField(() => props.name, props.rules, {
  type: 'checkbox',
  // checkedValue: props.modelValue as Boolean,
  initialValue: props.modelValue as Boolean,
  syncVModel: true,
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-4">
      <Checkbox :inputId="props.name" :class="[classInput, errorMessage ? 'p-invalid' : '']" :style="styleInput"
        :placeholder="placeholder" :binary="true" v-model="value" :disabled="disabled" />
      <label :for="props.name">
        <slot name="content"></slot>
      </label>
    </div>
    <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
  </div>
</template>