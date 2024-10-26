<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
<template>
  <div class="border rounded-lg" @click="router.push(`/lesson?_id=12333`)">
    <v-col cols="12" class="flex justify-center">
      <img class="w-50" src="https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg" />
    </v-col>
    <v-col cols="12">
      <p class="text-2xl font-semibold">Урок машинного обучения</p>
    </v-col>
    <v-col cols="12">
      <p class="text-base">
        Машинное обучение (англ. machine learning, ML) — класс методов искусственного интеллекта, характерной чертой
        которых является не прямое решение задачи.
      </p>
    </v-col>
  </div>
</template>
