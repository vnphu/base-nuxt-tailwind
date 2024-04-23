import { defineStore } from 'pinia'

type Error = {
  code?: number
  message?: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    error: null as Error | null,
  }),
  getters: {},
  actions: {
    newError(payload: Error) {
      this.error = payload
    },
  },
})
