<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

const courseStore = useCourse()
const authStore = useAuth()

const router = useRouter()
const route = useRoute()

let { currentCourse } = storeToRefs(courseStore)

await courseStore.getCourseByIdWithLessons(String(route.params._id))
</script>
<template>
  <v-container v-if="currentCourse">
    <v-row>
      <v-col cols="12">
        <p class="text-4xl font-semibold">{{ currentCourse.name }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-if="authStore.user?.roles[0] == 'teacher'">
        <div class="border rounded-lg cursor-pointer h-100 d-flex justify-center align-center" @click="router.push(`/add-lesson?course_id=${route.params._id}`)" style="font-size: 40px;">
          <v-icon class="text-zinc-600 ma-8" icon="mdi-plus"></v-icon>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(lesson, index) in currentCourse.lessons">
        <LessonCard :key="index" :lesson="lesson" />
      </v-col>
    </v-row>
  </v-container>
</template>
