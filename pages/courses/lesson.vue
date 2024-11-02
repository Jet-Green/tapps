<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

const courseStore = useCourse()

let { currentCourse } = storeToRefs(courseStore)
const route = useRoute()

const lessonId = route.query._id

let currentLesson = computed(() => {
  if (!currentCourse.value) return null
  for (let lesson of currentCourse.value.lessons) {
    if (lesson._id == lessonId) return lesson
  }
  return null
})

await courseStore.getCourseByIdWithLessons(String(route.query.course_id))
</script>
<template>
  <v-container class="mt-5" v-if="currentLesson && currentCourse?._id">
    <v-row>
      <v-col cols="12" md="6">
        <video class="w-full" controls :src="currentLesson.videos[0]">
          <!-- <source src="https://www.youtube.com/watch?v=NX4s0ZE97Kc" type="video/mp4">
          Your browser does not support the video tag. -->
        </video>
      </v-col>
      <v-col cols="12" md="3">
        <p class="text-4xl font-semibold mb-5">
          {{ currentLesson.name }}
        </p>
        <p class="text-base">
          {{ currentLesson.shortDescription }}
        </p>
      </v-col>
      <v-col cols="12" md="3">
        <NuxtLink v-for="link of currentLesson.links" :to="link" target="blank">
          <v-btn  class="ma-1 w-100 border" variant="text" rounded="lg">{{ link }}</v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="12" md="6" class="flex flex-row">
        <v-col cols="12" md="6">
          <p class="text-4xl font-semibold mb-5">
            Домашнее задание
          </p>
          <p class="text-lg">
            {{ currentLesson.homework }}
          </p>
        </v-col>
      </v-col>
      <v-col cols="12" md="6" class="flex flex-row">
        <v-col>
          <p class="text-4xl font-semibold mb-5">
            Материалы
          </p>
          <div class="grid grid-cols-4 gap-4 place-content-stretch">
            <div v-for="i in 8" class="border h-24"></div>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    писец...
  </v-container>
</template>