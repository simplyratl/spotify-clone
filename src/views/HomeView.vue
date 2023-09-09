<script setup>
import MusicRow from '../assets/shared/MusicRow.vue'
import Hero from '../components/Hero.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const forYouRow = ref([])

onMounted(() => {
  axios
    .get('http://192.168.1.8:8080/song/for-you')
    .then((res) => {
      forYouRow.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div class="h-full overflow-y-auto main-container">
    <div class="max-w-[2400px]">
      <Hero />
      <MusicRow title="Made For You" :data="forYouRow" />
      <MusicRow title="Jump back in" :data="forYouRow" />
    </div>
  </div>
</template>
