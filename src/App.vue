<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './assets/shared/Navbar.vue'
import Sidebar from './assets/shared/Sidebar.vue'
import AudioPlayer from './assets/shared/AudioPlayer.vue'
import { computed } from 'vue'

const route = useRoute()

const isolatedPage = computed(() => {
  return ['login', 'register'].includes(route.name)
})
</script>

<template>
  <Navbar v-if="!isolatedPage" />
  <Sidebar v-if="!isolatedPage" />
  <AudioPlayer v-if="!isolatedPage" />

  <main
    class="fixed right-0 top-2 h-[calc(100vh-99px)] w-full rounded-md overflow-hidden bg-[#121212] pt-20"
    :class="isolatedPage ? '' : 'min-[1100px]:w-[calc(100%-420px)]'"
  >
    <RouterView />
  </main>
</template>
