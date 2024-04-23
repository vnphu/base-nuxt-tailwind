<script setup lang="ts">
import { useField } from 'vee-validate'
import moment from 'moment'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Date, String, Array, null, undefined] as PropType<Date | Date[] | string | string[] | null | undefined>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  label: {
    type: String,
  },
  type: {
    type: String as PropType<'date' | 'month' | 'year'>,
    default: 'date',
  },
  dateFormat: {
    type: String,
    default: 'yy/mm/dd',
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  selectionMode: {
    type: String as PropType<'single' | 'multiple' | 'range'>,
    default: 'single',
  },
  selectOtherMonths: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const rules = computed(() => props.rules)

const formatDate = () => {
  if (props.modelValue) {
    if (typeof props.modelValue === 'object') {
      const array = [] as any[]

      for (let item of props.modelValue as any[]) {
        const element = moment(item).isValid() ? new Date(item) : ''
        if (element) {
          array.push(element)
        }
      }

      return array
    } else {
      return moment(props.modelValue).isValid() ? new Date(props.modelValue) : null
    }
  }
}

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue ? formatDate() : (props.modelValue as string | Date),
  syncVModel: true,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-base font-normal c-black-90" :for="props.name" v-if="label">
      {{ label }}
      <span class="c-danger" v-if="rules.required">*</span>
    </label>

    <div class="flex-1 flex flex-col">
      <Calendar
        :inputId="props.name"
        :class="[errorMessage ? 'p-invalid' : '']"
        :placeholder="placeholder"
        :view="type"
        showIcon
        showButtonBar
        iconDisplay="input"
        :dateFormat="dateFormat"
        :selectionMode="selectionMode"
        :selectOtherMonths="selectOtherMonths"
        v-model="value"
        @blur="handleBlur(undefined, true)"
        :disabled="disabled"
      >
        <template #inputicon="{ clickCallback }">
          <img
            class="absolute top-[50%] right-12 translate-y-[-50%] cursor-pointer"
            src="~/assets/icons/i-calendar-primary.svg"
            @click="clickCallback"
          />
        </template>
      </Calendar>
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>
