<script setup>
import MusicRow from '../assets/shared/MusicRow.vue'
import Hero from '../components/Hero.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const user = useAuthStore().getUser()

const forYouRow = ref([])

onMounted(() => {
  axios
    .get('/api/song/for-you')
    .then((res) => {
      forYouRow.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div id="main-container" class="h-full overflow-y-auto">
    <div class="max-w-[2400px]">
      <Hero v-if="user" />
      <div class="space-y-12">
        <MusicRow title="Made For You" :data="forYouRow" />
        <MusicRow title="Jump back in" :data="forYouRow" />
      </div>
    </div>
  </div>
</template>
