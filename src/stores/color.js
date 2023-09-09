import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useColorStore = defineStore('color', () => {
  const colors = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5']
  const colorsFull = ['#496DDB', '#717EC3', '#C95D63', '#EE8434', '#496DDB']

  const position = Math.floor(Math.random() * colors.length) | 0

  const color = ref(colors[position])
  const colorFull = ref(colorsFull[position])

  return { color, colorFull }
})
