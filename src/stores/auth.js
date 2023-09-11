import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const setUser = (newUser) => {
    user.value = newUser
  }

  const getUser = () => {
    return user.value
  }

  const logout = () => {
    user.value = null
  }

  return { setUser, getUser, logout }
})
