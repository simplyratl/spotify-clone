<script setup>
import PlayButton from 'vue-material-design-icons/PlayCircle.vue'
import PauseButton from 'vue-material-design-icons/PauseCircle.vue'
import { SkipForward } from 'lucide-vue-next'
import { SkipBack } from 'lucide-vue-next'
import { Shuffle } from 'lucide-vue-next'
import { Repeat } from 'lucide-vue-next'
import { Volume1 } from 'lucide-vue-next'
import { useSongStore } from '../../stores/song'
import { watch, computed, ref, onMounted } from 'vue'

const songStore = useSongStore()

const currentTime = ref(0)
const totalDuration = ref(0)
const progressPercentage = computed(() => {
  if (totalDuration.value === 0) return 0 // Avoid division by zero
  return (currentTime.value / totalDuration.value) * 100
})
const level = ref(100)

const title = computed(() => songStore.getCurrentSong()?.title ?? 'ok')
const artist = computed(() => songStore.getCurrentSong()?.artist ?? 'ok')
const imageUrl = computed(() => songStore.getCurrentSong()?.imageUrl ?? 'ok')
const duration = computed(() => songStore.getCurrentSong()?.duration ?? 'ok')
const isAudioReady = computed(() => !!audioRef.value && totalDuration.value > 0)

const isPlaying = computed(() => songStore.getIsPlaying())
const isLooping = ref(false)

const audioRef = ref(null)
const sourceRef = ref(null)

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '0:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  // Use template literals to format the result as "mm:ss"
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const handleToggle = () => {
  songStore.togglePlaying()
}

const handleSeek = (event) => {
  if (isAudioReady.value) {
    const audio = audioRef.value
    const newTime = event.target.value
    audio.currentTime = newTime
  }
}

const handleSeekLevel = (event) => {
  if (isAudioReady.value) {
    const audio = audioRef.value
    const newLevel = event.target.value
    audio.volume = newLevel / 100
    level.value = newLevel
    console.log(level.value)
  }
}

const handleLoop = () => {
  const audio = audioRef.value
  audio.loop = !audio.loop
  isLooping.value = audio.loop
}

onMounted(() => {
  const audio = audioRef.value

  if (audio) {
    audio.addEventListener('timeupdate', () => {
      currentTime.value = audio.currentTime
      totalDuration.value = audio.duration
    })
  }
})

watch(
  () => songStore.getCurrentSong(),
  (newSong) => {
    if (!newSong) {
      return
    }

    const audio = audioRef.value
    const source = sourceRef.value

    if (!audio || !source) {
      return
    }

    source.src = newSong.audio
    audio.load()
    audio.play()
  }
)

watch(
  () => [isPlaying.value, songStore.getCurrentSong()],
  (newIsPlaying) => {
    const audio = audioRef.value
    const playing = newIsPlaying[0]

    if (audio) {
      if (playing) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }
)
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full h-[86px] bg-black z-50">
    <div class="h-full flex justify-between items-center px-4">
      <div class="hidden sm:flex items-center gap-4 sm:flex-1">
        <img class="hidden md:block w-14 h-14 object-cover rounded-lg" :src="imageUrl" />

        <div>
          <h4 class="text-white text-base">{{ title }}</h4>
          <h5 class="text-[#B3B3B3] text-xs">{{ artist }}</h5>
        </div>
      </div>

      <div class="space-y-2 flex-1">
        <div class="flex justify-center items-center gap-4">
          <button type="button">
            <Shuffle class="text-gray-400" :size="18" />
          </button>
          <button type="button">
            <SkipBack class="text-gray-400" />
          </button>
          <button type="button" class="hover:scale-105" @click="handleToggle()">
            <PlayButton v-if="!isPlaying" class="text-white" :size="40" />
            <PauseButton v-if="isPlaying" class="text-white" :size="40" />
          </button>
          <button type="button">
            <SkipForward class="text-gray-400" />
          </button>
          <button
            type="button"
            @click="handleLoop()"
            class="relative"
            :class="
              isLooping &&
              'before:absolute before:w-1 before:h-1 before:bg-[#1ed760] before:rounded-full before:-bottom-2 before:left-1/2 before:-translate-x-1/2'
            "
          >
            <Repeat :class="isLooping ? 'text-[#1ed760]' : 'text-gray-400'" :size="20" />
          </button>
        </div>
        <div class="flex items-center gap-2 text-[#A7A7A7] text-sm">
          <span>{{ formatDuration(currentTime) ?? '0:00' }}</span>
          <div class="range-slider">
            <input
              type="range"
              class="slider"
              :max="totalDuration"
              :value="currentTime"
              @input="handleSeek($event)"
            />
            <div class="slider-thumb" :style="{ left: progressPercentage + '%' }"></div>
            <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <span>{{ formatDuration(duration) ?? '0:00' }}</span>
        </div>
      </div>

      <div class="flex-1 hidden lg:flex justify-end">
        <div class="flex items-center gap-2">
          <Volume1 class="text-gray-400" :size="28" />
          <div class="range-slider">
            <input
              type="range"
              class="slider"
              min="0"
              max="100"
              @input="handleSeekLevel($event)"
              :value="level"
              style="width: 100px; min-width: 100%"
            />
            <div class="slider-thumb" :style="{ left: level + '%' }"></div>
            <div class="progress" :style="{ width: level + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <audio ref="audioRef">
    <source ref="sourceRef" />
  </audio>
</template>

<style scoped>
.range-slider {
  position: relative;
  display: flex;
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: #333333;
  outline: none;
  border-radius: 9999px;
  @apply w-full sm:w-[300px] md:w-[400px] lg:w-full lg:min-w-[626px];
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
}

.range-slider .slider-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none;
  pointer-events: none;
}

.range-slider .progress {
  position: absolute;
  top: 0;
  left: 0;
  translate: translateY(-50%);
  width: 0;
  height: 4px;
  border-radius: 9999px;
  background-color: #fff;
  pointer-events: none;
}

.range-slider:hover .progress {
  background-color: #1ed760;
}
.range-slider:hover .slider-thumb {
  display: block;
}

.slider:hover.slider::-webkit-slider-thumb {
  display: block;
}
</style>
