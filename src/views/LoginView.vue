<script setup>
const handleSubmit = () => {
  alert('radi')
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-[764px] h-[910px] bg-black rounded-md">
      <div class="h-full">
        <h1 class="text-[40px] text-white font-semibold text-center pt-12">Log in to Spotify</h1>

        <div>
          <ul class="mt-10 space-y-2 w-[324px] mx-auto">
            <li
              class="border border-gray-500 rounded-full px-8 py-3 space-x-8 text-white cursor-pointer hover:border-white text-sm"
            >
              <span>G</span>
              <span class="font-semibold">Continue with Google</span>
            </li>
            <li
              class="border border-gray-500 rounded-full px-8 py-3 space-x-8 text-white cursor-pointer hover:border-white text-sm"
            >
              <span>F</span>
              <span class="font-semibold">Continue with Facebook</span>
            </li>
            <li
              class="border border-gray-500 rounded-full px-8 py-3 space-x-8 text-white cursor-pointer hover:border-white text-sm"
            >
              <span>A</span>
              <span class="font-semibold">Continue with Apple</span>
            </li>
          </ul>

          <div class="w-[70%] mx-auto h-[1px] bg-neutral-700 my-12"></div>

          <form @submit.prevent="handleSubmit()" class="w-[324px] mx-auto space-y-2">
            <div class="flex flex-col space-y-2">
              <label for="username" class="text-white text-sm">Email or username</label>
              <input
                type="text"
                class="placeholder:text-gray-500 font-semibold bg-transparent border border-gray-500 py-3 px-3 rounded-md text-sm outline-none hover:border-gray-300 text-white focus:ring-2 focus:ring-white transition-colors focus:ring-inset"
                placeholder="Email or username"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="username" class="text-white text-sm">Password</label>
              <input
                type="text"
                class="placeholder:text-gray-500 font-semibold bg-transparent border border-gray-500 py-3 px-3 rounded-md text-sm outline-none hover:border-gray-300 text-white focus:ring-2 focus:ring-white transition-colors focus:ring-inset"
                placeholder="Password"
              />
            </div>
            <div class="w-full">
              <button
                type="submit"
                class="bg-[#1ed760] w-full font-semibold py-2.5 rounded-full text-sm mt-8"
              >
                Log in
              </button>

              <div class="mt-8">
                <RouterLink
                  to="/"
                  class="text-center text-white text-sm font-semibold mt-4 block underline hover:decoration-[#1ed760]"
                >
                  Forgot your password?
                </RouterLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
