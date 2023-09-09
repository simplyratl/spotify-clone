<script setup>
import { RouterLink } from 'vue-router'
import { Home } from 'lucide-vue-next'
import { Search } from 'lucide-vue-next'
import { Library } from 'lucide-vue-next'

const categories = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows']

const array = new Array(30).fill(0)
</script>

<template>
  <header
    class="hidden min-[1100px]:block fixed top-0 left-0 w-[420px] h-[calc(100vh-94px)] bg-black p-2 space-y-2 overflow-hidden"
  >
    <ul class="bg-[#121212] rounded-md py-3 space-y-2 px-6">
      <li class="flex items-center h-10">
        <RouterLink to="/" class="text-white text-md font-semibold flex items-center gap-5">
          <Home />Home
        </RouterLink>
      </li>
      <li class="flex items-center h-10">
        <RouterLink to="/" class="text-neutral-400 text-md font-semibold flex items-center gap-5">
          <Search />Search
        </RouterLink>
      </li>
    </ul>

    <div class="bg-[#121212] rounded-md py-3">
      <div class="px-6">
        <button class="text-neutral-400 flex items-center gap-2 font-semibold">
          <Library :size="28" /> Your library
        </button>

        <div class="mt-4">
          <ul class="flex gap-2">
            <li
              v-for="category in categories"
              v-bind:key="category"
              class="text-white bg-[#232323] hover:bg-[#2e2e2e] px-2 rounded-2xl text-sm py-1.5 cursor-pointer transition-colors duration-200"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 px-2 h-full rounded-md overflow-hidden">
        <ul class="overflow-y-auto h-[calc(100vh-342px)]">
          <li v-for="item in array" class="cursor-pointer hover:bg-[#1A1A1A] rounded-lg">
            <div class="px-2 flex gap-2 py-2">
              <img
                class="w-14 h-14 object-cover rounded-lg"
                src="https://i.ytimg.com/vi/g9jDTlpCgf4/maxresdefault.jpg"
              />

              <div class="flex flex-col justify-between py-1">
                <h4 class="text-white font-medium">Borba</h4>
                <h5 class="flex items-center gap-2 text-neutral-400 text-sm">
                  Album <span class="block w-1 h-1 rounded-full bg-neutral-400"></span> Djordje
                </h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
