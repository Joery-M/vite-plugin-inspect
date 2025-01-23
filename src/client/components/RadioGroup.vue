<script setup lang="ts">
defineProps<{
  name: string
  modelValue: string
  options: { value: string, label: string }[]
}>()

const emit = defineEmits(['update:modelValue'])

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div flex="~ gap-1">
    <label v-for="opt in options" :key="opt.value" class="flex cursor-pointer select-none items-center">
      <input
        :id="opt.value"
        :name="name"
        :checked="modelValue === opt.value"
        :value="opt.value" type="radio"
        class="peer absolute op0"
        @change="onChange"
      >
      <span border="~ main peer-checked:current" class="size-4.5 rounded-full peer-focus-visible:outline-auto">
        <!-- radio dot -->
        <div :op="modelValue === opt.value ? 100 : 0" class="m-0.75 size-2.5 rounded-full bg-current" />
      </span>
      <span class="ml-1.5 lh-normal">{{ opt.label }}</span>
    </label>
  </div>
</template>
