import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const currentSong = ref(null)
  const isPlaying = ref(false)

  const setCurrentSong = (song) => {
    currentSong.value = song
    isPlaying.value = true
  }

  const getCurrentSong = () => {
    return currentSong.value
  }

  const getIsPlaying = () => {
    return isPlaying.value
  }

  const togglePlaying = () => {
    isPlaying.value = !isPlaying.value
  }

  return { setCurrentSong, getCurrentSong, togglePlaying, getIsPlaying }
})
