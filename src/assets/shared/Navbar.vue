<script setup>
import { ref, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import { useColorStore } from '../../stores/color'

const scrolled = ref(false)
const color = useColorStore().colorFull
const container = ref(null)

const handleScroll = () => {
  scrolled.value = container.value.scrollTop > 80
}

onMounted(() => {
  setTimeout(() => {
    container.value = document.querySelector('.main-container')

    if (!container.value) return

    container.value.addEventListener('scroll', handleScroll)
  }, 0)
})

onBeforeUnmount(() => {
  if (!container.value) return
  container.value.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :style="{ backgroundColor: color, backgroundColor: scrolled ? color : 'transparent' }"
    class="fixed top-2 right-0 w-[calc(100%-420px)] h-[64px] transition-colors duration-300 z-50"
  >
    <div class="flex justify-between items-center h-full px-6">
      <div class="flex items-center gap-2">
        <div
          class="bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center cursor-not-allowed"
        >
          <ChevronLeft class="text-white text-xl" />
        </div>
        <div
          class="bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center cursor-not-allowed"
        >
          <ChevronRight class="text-white text-xl" />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://www.spotify.com/me-en/download/windows/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 bg-black bg-opacity-50] text-white h-8 rounded-2xl pr-4 pl-3 text-sm font-bold hover:scale-105"
        >
          <img src="../icons/download.svg" />
          Install App
        </a>

        <div class="bg-[#1D0E1A] w-9 h-9 p-1.5 rounded-full">
          <div class="w-full h-full rounded-full overflow-hidden">
            <img
              src="https://yt3.ggpht.com/yti/AOXPAcXQGQFPFQaXkKZ00Eg4fzcxJ70b38hxPNLOdunhGg=s88-c-k-c0x00ffffff-no-rj"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
