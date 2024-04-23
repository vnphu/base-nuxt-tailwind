<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
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
  chip: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  // This prop was passed by @search in  component parent
  onSearch: {
    type: Function,
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

const search = ref('')
const wrapper = ref()

const rules = computed(() => props.rules)

const { value, errorMessage, handleBlur } = useField(() => props.name, rules, {
  initialValue: props.modelValue as [],
  syncVModel: true,
})

onMounted(() => {
  // Set width input
  const nodes = wrapper.value.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.className.includes('p-multiselect')) {
      const width = node.clientWidth
      node.style.width = width + 'px'
    }
  }
})

watch(
  () => search.value,
  (newValue) => {
    emit('search', newValue)
  },
)
</script>

<template>
  <div class="flex flex-col gap-2" ref="wrapper">
    <label class="text-base font-normal c-black-90" :for="props.name" v-if="label">
      {{ label }} <span class="c-danger" v-if="rules.required">*</span>
    </label>

    <div class="flex flex-col">
      <MultiSelect
        class="w-full"
        :inputId="props.name"
        :class="[errorMessage ? 'p-invalid' : '']"
        :placeholder="placeholder"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        display="chip"
        v-model="value"
        :filter="filterDefault"
        :showClear="showClear"
        @blur="handleBlur($event, true)"
        :disabled="disabled"
      >
        <!-- Search -->
        <template #header v-if="onSearch">
          <BaseSearch class="mt-1 mb-2 border-0 border-b-1 rounded-none" v-model="search" />
        </template>
      </MultiSelect>
      <small class="p-error" v-show="errorMessage">{{ errorMessage || '&nbsp;' }}</small>
    </div>
  </div>
</template>
