<script lang="ts" setup>
import { useTheme } from "vuetify"

const theme = useTheme()
const savedTheme = useCookie('theme')

if (['light', 'dark'].includes(String(savedTheme.value))) {
  theme.global.name.value = String(savedTheme.value);
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  savedTheme.value = theme.global.name.value
}
</script>
<template>
  <v-app class="relative min-h-screen">
    <v-app-bar :elevation="0">
      <v-container>
        <v-row class="flex align-center justify-between">
          <v-col cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>
          <v-col cols="6" md="2" class="flex justify-end items-center">
            <v-col class="flex justify-end">
              <button @click="toggleTheme" type="button"
                class="text-zinc-700 border border-zinc-700 hover:bg-zinc-400 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-zinc-700">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16"
                  height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path fill="currentColor" fill-rule="evenodd"
                      d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
                      clip-rule="evenodd"></path>
                  </svg></svg>
              </button>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div class="mt-16 pb-20">
      <slot />
    </div>
    <Footer />
  </v-app>
</template>

<style scoped></style>
