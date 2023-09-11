<script setup>
import PlayIcon from 'vue-material-design-icons/Play.vue'
import PauseIcon from 'vue-material-design-icons/Pause.vue'
import { computed } from 'vue'
import { useSongStore } from '../../stores/song'

const { title, data } = defineProps({
  title: String,
  data: Array
})

const songStore = useSongStore()

const id = computed(() => songStore.getCurrentSong()?.id ?? 'ok')
const isPlaying = computed(() => songStore.getIsPlaying())

const handleSongClick = (song) => {
  if (song.id === id.value) {
    songStore.togglePlaying()
    return
  }

  useSongStore().setCurrentSong(song)
}
</script>

<template>
  <div class="px-6" v-if="data.length > 0">
    <h3 class="text-xl text-white">
      <RouterLink to="/" class="text-white text-2xl font-semibold hover:underline">
        {{ title }}</RouterLink
      >
    </h3>

    <div class="overflow-y-auto">
      <ul
        class="flex w-fit min-[455px]:w-full min-[455px]:grid min-[455px]:grid-cols-[repeat(auto-fill,minmax(184px,_1fr))] gap-6 mt-5"
      >
        <li
          v-for="song in data"
          v-bind:key="song.id"
          @click="handleSongClick(song)"
          class="relative bg-[#171717] rounded-lg px-4 py-4 cursor-pointer transition-colors duration-200 hover:bg-[#262626] group w-36 min-[455px]:w-full"
        >
          <div class="relative">
            <img class="w-full aspect-square object-cover rounded-md" :src="song.imageUrl" />
            <div
              :class="id === song.id && 'opacity-100 !translate-y-0'"
              class="absolute right-2 bottom-2 h-[44px] aspect-square bg-[#1ED760] rounded-full flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-20"
            >
              <PlayIcon :size="30" v-if="!isPlaying || id !== song.id" />
              <PauseIcon :size="30" v-if="isPlaying && id === song.id" />
            </div>
          </div>

          <div>
            <h4 class="text-white text-sm min-[455px]:text-md font-semibold mt-3 line-clamp-1">
              {{ song.title }}
            </h4>
            <h5 class="text-neutral-400 text-sm mt-1 line-clamp-2 hidden min-[455px]:block">
              {{ song.artist }}
            </h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
