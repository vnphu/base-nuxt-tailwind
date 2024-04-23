<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Number, null] as PropType<Number | null>,
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
  // Grouping separator, ex: 100,000
  useGrouping: {
    type: Boolean,
    default: false,
  },
  // Decimal, ex 1 = 1,0 | 2 = 1,00
  minFractionDigits: {
    type: Number,
    default: 1,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  layout: {
    type: String,
    default: 'col',
  },
  mode: {
    type: String as PropType<'decimal' | 'currency'>,
    default: 'decimal',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'input'])

const rules = computed(() => props.rules)

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue as number,
  syncVModel: true,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      class="flex items-center gap-[8px] text-base font-normal c-black-90"
      :class="layout === 'row' ? ['flex-1'] : ['']"
      :for="props.name"
      v-if="label"
    >
      <span>
        {{ label }}
        <span class="c-danger" v-if="rules.required">*</span>
      </span>
    </label>

    <div class="flex flex-col">
      <InputNumber
        :inputId="props.name"
        :class="[classInput, errorMessage ? 'p-invalid' : '']"
        :style="styleInput"
        :placeholder="placeholder"
        :mode="mode"
        :useGrouping="useGrouping"
        :allowEmpty="true"
        :prefix="prefix"
        :suffix="suffix"
        :minFractionDigits="minFractionDigits"
        v-model="value"
        @blur="handleBlur(undefined, true)"
        @input="
          (e) => {
            $emit('input', e.value)
          }
        "
        :disabled="disabled"
      />
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .p-inputnumber-input {
    width: 100%;
  }
}
</style>
