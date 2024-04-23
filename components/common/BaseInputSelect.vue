<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  options: {
    type: Array,
    required: true,
  },
  optionLabel: {
    type: String,
    default: 'name',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
  label: {
    type: String,
  },
  filterDefault: {
    type: Boolean,
    default: false,
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // This prop was passed by @scroll in  component parent
  onScroll: {
    type: Function,
  },
  onSearch: {
    type: Function,
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'scroll', 'show'])

const search = ref('')

const rules = computed(() => props.rules)

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue as String,
  syncVModel: true,
})

const handleScroll = useThrottleFn((e) => {
  emit('scroll')
}, 400)

watch(
  () => search.value,
  (newValue) => {
    emit('search', newValue)
  },
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-base font-normal c-black-90" :for="props.name" v-if="label">
      {{ label }}
      <span class="c-danger" v-if="rules.required">*</span>
    </label>

    <div class="flex flex-col">
      <Dropdown
        :inputId="props.name"
        :class="[errorMessage ? 'p-invalid' : '']"
        :placeholder="placeholder"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        v-model="value"
        :filter="filterDefault"
        :showClear="showClear"
        @blur="handleBlur($event, true)"
        @show="$emit('show')"
        :disabled="disabled"
        :loading="loading"
        :virtualScrollerOptions="onScroll ? ({ itemSize: 48, onScroll: handleScroll } as any) : undefined"
      >
        <!-- Search -->
        <template #header v-if="onSearch">
          <BaseSearch class="mt-1 mb-2 border-0 border-b-1 rounded-none" v-model="search" />
        </template>
      </Dropdown>
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>
