<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import { useColorStore } from '../../stores/color'
import { useAuthStore } from '../../stores/auth'

const color = useColorStore().colorFull
const user = useAuthStore().getUser()

const scrolled = ref(false)
const container = ref(null)

const handleScroll = () => {
  scrolled.value = container.value.scrollTop > 80
}

const checkUser = computed(() => {
  return user ?? false
})

onMounted(() => {
  setTimeout(() => {
    container.value = document.getElementById('#main-container')
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

      <div class="flex items-center gap-2" v-if="checkUser">
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

      <div v-else class="flex gap-8">
        <button type="button" class="text-neutral-400 hover:text-white transition-colors text-sm">
          Sign up
        </button>
        <RouterLink
          to="/login"
          type="button"
          class="bg-white px-8 py-3 rounded-3xl text-sm font-semibold hover:scale-105"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </header>
</template>
