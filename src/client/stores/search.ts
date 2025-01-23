import type { ModuleInfo } from '../../types'
import Fuse from 'fuse.js'
import { isAbsolute, relative } from 'pathe'
import { defineStore } from 'pinia'
import { useOptionsStore } from './options'
import { usePayloadStore } from './payload'

export const useSearchResults = defineStore('search', () => {
  const state = useOptionsStore()
  const data = usePayloadStore()

  const filtered = computed(() => {
    let modules = data.modules || []

    if (!state.search.includeUnreached)
      modules = modules.filter(item => item.sourceSize)

    if (!state.search.includeNodeModules)
      modules = modules.filter(item => !item.id.includes('/node_modules/'))

    if (!state.search.includeVirtual)
      modules = modules.filter(item => !item.virtual)

    return modules
  })

  const currentFuse = computed(() => {
    return new Fuse(filtered.value, {
      shouldSort: true,
      keys: [
        { name: 'filename', getFn: ({ id }) => isAbsolute(id) ? relative(data.root, id) : id, weight: 1 },
        { name: 'plugins.name', weight: 0.75 },
        { name: 'id', weight: 0.5 },
      ],
    })
  })

  const results = computed<readonly ModuleInfo[]>((oldResults) => {
    const modules = filtered.value
    if (!state.search.text)
      return modules

    if (state.search.regex) {
      try {
        const currentRegex = new RegExp(state.search.text, state.search.exactSearch ? '' : 'i')
        return modules.filter(item => currentRegex.test(item.id))
      }
      catch {
        // Catch invalid regex errors, then return old value
        return oldResults || modules
      }
    }
    else if (state.search.exactSearch) {
      return modules.filter(item =>
        item.id.includes(state.search.text)
        || item.plugins.some(plugin => plugin.name.includes(state.search.text)),
      )
    }
    else {
      return currentFuse.value.search(state.search.text).map(i => i.item)
    }
  })

  const resultsSorted = computed(() => {
    if (state.search.text)
      return results.value
    const cloned = [...results.value]
    if (state.view.sort === 'time-asc')
      cloned.sort((a, b) => b.totalTime - a.totalTime)
    if (state.view.sort === 'time-desc')
      cloned.sort((a, b) => a.totalTime - b.totalTime)
    return cloned
  })

  return {
    results,
    resultsSorted,
    filtered,
  }
})
