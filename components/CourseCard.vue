<script setup lang="ts">
import type { Course } from '~/types/course.interface';

import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps<{
  course: Course,
}>()

let { course } = props
</script>
<template>
  <div class="border rounded-lg" @click="router.push(`/courses/${course._id}`)">
    <v-col cols="12" class="flex justify-center">
      <img class="w-50" :src="course.images[0]" />
    </v-col>
    <v-col cols="12">
      <p class="text-2xl font-semibold">{{ course.name }}</p>
    </v-col>
    <v-col cols="12">
      <p class="text-base">
        {{ course.shortDescription }}
      </p>
    </v-col>
  </div>
</template>
