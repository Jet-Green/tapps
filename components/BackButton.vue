<script setup lang="ts">
import { useRouter } from "vue-router"

let router = useRouter()

const { buttonText } = defineProps({
  buttonText: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="d-flex pt-1 pr-1 pb-1 flex-row flex-nowrap align-center justify-start">
    <div class="d-flex cursor-pointer ma-2" @click="router.back()">
      <v-icon>mdi-chevron-left</v-icon>

      <div class="text-body-4 ml-1 font-semibold">{{ buttonText ? buttonText : "Назад" }}</div>
    </div>
  </div>
</template>
