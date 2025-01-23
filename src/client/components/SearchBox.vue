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
      :font="(options.search.regex || options.search.glob) ? 'mono' : null"
      placeholder="Search..."
    >
    <Dropdown class="pos-absolute right-0 top-50% transform-translate-y--50%">
      <button text-md rounded icon-btn title="Search settings">
        <span i-carbon-filter />
      </button>
      <template #popper>
        <div flex="~ col gap-1" px-3 py-2>
          <Checkbox v-model="options.search.exactSearch" :disabled="options.search.glob">
            exact {{ options.search.regex ? 'case' : 'search' }}
          </Checkbox>
          <Checkbox v-model="options.search.regex" @update:model-value="(ev) => ev && (options.search.glob = false)">
            regex
          </Checkbox>
          <Checkbox v-model="options.search.glob" @update:model-value="(ev) => ev && (options.search.regex = false)">
            glob
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
</template>
