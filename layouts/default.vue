<script lang="ts" setup>
const router = useRouter();
</script>
<template>
  <v-app class="">
    <v-app-bar :elevation="0">
      <v-container>
        <v-row class="flex align-center justify-between">
          <v-col class="cursor-pointer" cols="6" @click="router.push(`/`)">
            logo
          </v-col>
          <v-col cols="6" md="2" class="flex justify-end items-center">
            <v-col class="flex justify-end">
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