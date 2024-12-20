<script setup lang="ts">
import type { Homework } from "~/types/homework.interface"

definePageMeta({
  middleware: ["teacher"],
  // or middleware: 'auth'
})

const runtimeConfig = useRuntimeConfig()
const courseStore = useCourse()
const router = useRouter()
const route = useRoute()
const lessonId = route.query._id

let { currentCourse } = storeToRefs(courseStore)
let homeworks = ref<Homework[]>([])

let currentLesson = computed(() => {
  if (!currentCourse.value) return null
  for (let lesson of currentCourse.value.lessons) {
    if (lesson._id == lessonId) return lesson
  }
  return null
})

if (route.query.course_id) {
  let res = await courseStore.getHomeworksByCourses([String(route.query.course_id)])
  if (res.status.value == "success") {
    homeworks.value = res.data.value
  }
}

await courseStore.getCourseByIdWithLessons(String(route.query.course_id))

let breadcrums = ref([
  {
    title: `${currentCourse.value?.name}`,
    disabled: false,
    href: `/`,
  },
  {
    title: `${currentLesson.value?.name}`,
    disabled: false,
    href: `${currentCourse.value?._id}`,
  },
])
</script>
<template>
  <v-container v-if="currentLesson?._id">
    <v-row>
      <v-col cols="12">
        <BackButton />
        <v-breadcrumbs :items="breadcrums" class="text-xs md:text-base"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <M3U8Player :src="currentLesson?.videos[0]" />
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
        <p class="font-bold text-2xl mb-4">Прикреплённые ссылки</p>
        <v-row>
          <v-col cols="12" v-for="link of currentLesson.links" class="pa-2">
            <NuxtLink :to="link.value" target="blank">
              <v-btn class="default-btn" variant="tonal"
                ><b>{{ link.name }}</b></v-btn
              >
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <p class="text-4xl font-semibold mb-5">Домашнее задание</p>
        <v-row>
          <v-col cols="12" md="6" v-for="task in homeworks">
            <div
              class="border rounded-lg cursor-pointer h-100"
              @click="
                router.push(
                  `/teacher/add-solution?homework_id=${task._id}&lesson_id=${task.lesson}&course_id=${task.course}`
                )
              "
            >
              <v-col cols="12" class="d-flex justify-space-between">
                <p class="text-2xl font-semibold">{{ task.name }}</p>
              </v-col>
              <v-col cols="12" class="text-base">
                <p>
                  {{ task.hwText }}
                </p>
              </v-col>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="flex flex-row">
        <v-col>
          <p class="text-4xl font-semibold mb-5">Материалы</p>
          <div class="grid grid-cols-4 gap-4 place-content-stretch">
            <div v-for="i in 8" class="border h-24"></div>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else> писец... </v-container>
</template>
