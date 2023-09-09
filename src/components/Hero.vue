<script setup>
import { useColorStore } from '../stores/color'
import PlayIcon from 'vue-material-design-icons/Play.vue'

const color = useColorStore().color

const array = new Array(6).fill(0)
</script>

<template>
  <div :class="color" class="pt-16 px-6 lg:h-[332px] mb-12 lg:mb-0">
    <h2 class="text-white text-3xl font-semibold">Good afternoon</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4">
      <div v-for="item in array" class="flex h-20 group cursor-pointer">
        <img
          class="w-20 h-full object-cover rounded-l shadow-[#000_12px_2px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
          src="https://www.levelman.com/content/images/2022/11/scorpion.jpg"
        />

        <div
          class="relative flex items-center pl-4 bg-white bg-opacity-10 w-full rounded-r group-hover:bg-opacity-30 transition-colors duration-200"
        >
          <h3 class="text-white text-md font-semibold">incognito</h3>

          <div
            class="absolute right-4 top-1/2 -translate-y-1/2 h-[44px] aspect-square bg-[#1ED760] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <PlayIcon :size="30" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
