<script setup>
import { RouterView } from 'vue-router'
import Navbar from './assets/shared/Navbar.vue'
import Sidebar from './assets/shared/Sidebar.vue'
import AudioPlayer from './assets/shared/AudioPlayer.vue'
</script>

<template>
  <Navbar />
  <Sidebar />
  <AudioPlayer />

  <main
    class="fixed right-0 top-2 h-[calc(100vh-99px)] w-full min-[1100px]:w-[calc(100%-420px)] rounded-md overflow-hidden bg-[#121212]"
  >
    <RouterView />
  </main>
</template>
