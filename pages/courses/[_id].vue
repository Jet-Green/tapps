<script setup lang="ts">
const courseStore = useCourse()
const route = useRoute()

let { currentCourse } = storeToRefs(courseStore)

await courseStore.getCourseByIdWithLessons(String(route.params._id))
</script>
<template>
  <v-container v-if="currentCourse">
    <v-row>
      <v-col cols="12">
        <p class="text-4xl">{{ currentCourse.name }}</p>
        {{ currentCourse }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(lesson, index) in currentCourse.lessons">
        <LessonCard :key="index" :lesson="lesson" />
      </v-col>
    </v-row>
  </v-container>
</template>
