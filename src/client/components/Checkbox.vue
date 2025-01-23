<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | null
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    disabled: false,
  },
)
const emit = defineEmits(['update:modelValue'])
const checked = useVModel(props, 'modelValue', emit, { passive: true })
</script>

<template>
  <label class="flex cursor-pointer select-none items-center">
    <input
      v-model="checked"
      type="checkbox"
      class="peer absolute op0"
      :disabled
      @keypress.enter="checked = !checked"
    >
    <span border="~ main" class="size-4.5 rounded peer-disabled:op-50 peer-focus-visible:outline-auto">
      <span i-carbon-checkmark :op="checked ? 100 : 0" size-full />
    </span>
    <span class="ml-1.5 lh-normal peer-disabled:op-50"><slot /></span>
  </label>
</template>
