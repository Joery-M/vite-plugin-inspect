<script setup lang="ts">
import { Dropdown } from 'floating-vue'
import { useOptionsStore } from '../stores/options'

const options = useOptionsStore()
</script>

<template>
  <div class="pos-relative max-w-sm flex-grow-1">
    <input
      v-model="options.search.text"
      type="text"
      class="w-full border border-main rounded bg-transparent px-3 py-1 pr-8 !outline-none"
      placeholder="Search..."
    >
    <Dropdown class="pos-absolute right-0 top-50% transform-translate-y--50%">
      <button text-md rounded icon-btn title="Search settings">
        <span i-carbon-settings-adjust />
      </button>
      <template #popper>
        <div flex="~ col gap-1" px-3 py-2>
          <Checkbox v-model="options.search.exactSearch">
            exact search
          </Checkbox>
          <Checkbox v-model="options.search.includeNodeModules">
            node_modules
          </Checkbox>
          <Checkbox v-model="options.search.includeVirtual">
            virtual
          </Checkbox>
          <Checkbox v-model="options.search.includeUnreached">
            unreached
          </Checkbox>
        </div>
      </template>
    </Dropdown>
  </div>
  <!-- <div class="h-min flex flex-col select-none gap-1 whitespace-nowrap text-xs">
    <div class="flex gap-2">
      <label class="flex">
        <input v-model="options.search.exactSearch" type="checkbox" class="my-auto">
        <div class="ml-1">exact search</div>
      </label>
    </div>
    <div class="flex gap-2">
      <label class="flex">
        <input v-model="options.search.includeNodeModules" type="checkbox" class="my-auto">
        <div class="ml-1">node_modules</div>
      </label>
      <label class="flex">
        <input v-model="options.search.includeVirtual" type="checkbox" class="my-auto">
        <div class="ml-1">virtual</div>
      </label>
      <label class="flex">
        <input v-model="options.search.includeUnreached" type="checkbox" class="my-auto">
        <div class="ml-1">unreached</div>
      </label>
    </div>
  </div> -->
</template>
