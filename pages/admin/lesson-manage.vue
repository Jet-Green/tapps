<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

import type { Course } from "~/types/course.interface"
import type { Lesson } from "~/types/lesson.interface"

import { toast } from "vue3-toastify"

const courseStore = useCourse()
const lessonStore = useLesson()

const router = useRouter()
const route = useRoute()

let videoUploadedPath = ref<string | null>()
let form = ref<any>({
  name: "",
  shortDescription: "",
  links: [],
  homework: [],
})

let newLink = ref<string>("")

let newHomeworkDialog = ref<boolean>(false)
let homeworks = ref<any>([])
let newHomework = ref<any>({
  name: "",
  hwText: "",
  materials: [],
})

let coursesToSelect = ref<any>([])
let selectedCourseId = ref<string>("")
let selectedCourse = ref<Course>()

let lessons = ref<Lesson[]>()

let lessonsToSelect = ref<any>([])
let selectedLessonId = ref<string>("")
let selectedLesson = ref<Lesson>()

let { courses } = storeToRefs(courseStore)

await courseStore.getAll()

if (courses.value) {
  for (let c of courses.value) {
    coursesToSelect.value.push({
      title: c.name,
      value: c._id,
    })
  }
}

function addNewHomework() {
  homeworks.value.push(Object.assign({}, newHomework.value))
  newHomeworkDialog.value = false

  Object.assign(newHomework.value, {
    hwText: "",
  })
}
async function uploadFinished(uploadPath: string) {
  videoUploadedPath.value = "https://factum-videos.website.yandexcloud.net/" + uploadPath
}
let loading = ref<boolean>(false)
async function submit() {
  if (!selectedCourse.value || !selectedLesson.value) return

  loading.value = true
  // отправить новые homeworks, обновить список ссылок
  let toSend: any = {}
  Object.assign(toSend, form.value)

  toSend._id = selectedLessonId.value

  let homeworksToSend = [...homeworks.value]

  for (let i = 0; i < homeworksToSend.length; i++) {
    homeworksToSend[i].course = selectedCourseId.value
    homeworksToSend[i].courseName = selectedCourse.value.name

    homeworksToSend[i].lesson = selectedLessonId.value
    homeworksToSend[i].lessonName = selectedLesson.value.name
  }

  // add new video
  if (videoUploadedPath.value) {
    toSend.videos = [videoUploadedPath.value]
  }
  
  let res = await lessonStore.updateLesson(toSend, homeworksToSend)
  if (res.status.value == "success") {
    loading.value = false
    toast("Успешно", {
      type: "success",
      autoClose: 600,
      onClose: () => {
        router.back()
      },
    })
  }
}

watch(selectedCourseId, async (newSelectedCourseId) => {
  if (courses.value) {
    for (let course of courses.value) {
      if (course._id == newSelectedCourseId) {
        selectedCourse.value = course

        // get all course's lessons
        let res = await courseStore.getLessonsByCourseId(newSelectedCourseId)

        if (typeof route.query.lesson_id === "string") {
          selectedLessonId.value = route.query.lesson_id
        }

        if (res.status.value == "success") {
          lessons.value = res.data.value.lessons

          // for selection
          for (let lesson of res.data.value.lessons) {
            lessonsToSelect.value.push({
              title: lesson.name,
              value: lesson._id,
            })
          }
        }
        return
      }
    }
  }
})

watch(selectedLessonId, (newSelectedLessonId) => {
  if (!lessons.value) return

  for (let lesson of lessons.value) {
    if (lesson._id == newSelectedLessonId) {
      selectedLesson.value = lesson
      form.value.name = lesson.name
      form.value.shortDescription = lesson.shortDescription
      form.value.links = lesson.links
      form.value.homework = lesson.homework

      // Object.assign(form.value, lesson)
    }
  }
})
if (typeof route.query.course_id === "string") {
  selectedCourseId.value = route.query.course_id
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-2xl font-semibold">Редактировать урок</p>
        <BackButton class="mt-4" />
      </v-col>
      <v-col cols="6">
        <v-select
          label="выбрать курс"
          :items="coursesToSelect"
          variant="outlined"
          v-model="selectedCourseId"
          hide-details
        ></v-select>
        <span class="text-caption">Сначала выберите курс, а затем урок, который хотите отредактировать</span>
      </v-col>
      <v-col cols="6" v-if="lessonsToSelect?.length > 0">
        <v-select
          label="выбрать урок"
          :items="lessonsToSelect"
          variant="outlined"
          v-model="selectedLessonId"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-if="selectedLesson?._id">
      <!-- {{ selectedLesson }} -->
      <v-col cols="12">
        <v-text-field variant="outlined" label="Название" v-model="form.name" hide-details></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription" hide-details></v-textarea>
      </v-col>

      <v-col cols="12">
        <p class="text-1xl font-semibold">Ссылки</p>
        <v-chip v-for="(link, index) of form.links" :key="index" class="ma-1">
          <NuxtLink :to="link" target="_blank">{{ link }}</NuxtLink>
          <v-icon @click="form.links.splice(index, 1)" icon="mdi-close-circle"></v-icon>
        </v-chip>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-text-field
          v-model="newLink"
          hide-details
          max-width="500"
          variant="outlined"
          density="compact"
        ></v-text-field>
        <v-btn class="ml-4" icon="mdi-plus" size="small" @click="form.links.push(newLink), (newLink = '')"></v-btn>
      </v-col>

      <v-col cols="12">
        <UploadVideo @upload-finished="uploadFinished" />
      </v-col>

      <v-col cols="12">
        <p class="text-1xl font-semibold">Домашнее задание</p>
      </v-col>
      <v-col cols="3">
        <div
          class="border rounded-lg cursor-pointer h-100 d-flex justify-center align-center"
          @click="newHomeworkDialog = true"
          style="font-size: 40px"
        >
          <v-icon class="text-zinc-600 ma-8" icon="mdi-plus"></v-icon>
        </div>
      </v-col>

      <v-col v-if="form.homework.length > 0" v-for="(hw, index) of form.homework" :key="hw._id" cols="3">
        <div
          class="border rounded-lg cursor-pointer h-100 d-flex flex-column justify-center align-center"
          style="min-height: 200px"
        >
          <p class="text-1xl font-semibold">
            {{ hw.name }}
          </p>
          <p>
            {{ hw.hwText }}
          </p>
        </div>
      </v-col>
      <v-col v-if="homeworks.length > 0" v-for="(hw, index) of homeworks" :key="index" cols="3">
        <div
          class="border rounded-lg cursor-pointer h-100 d-flex flex-column justify-center align-center"
          style="position: relative; min-height: 200px"
        >
          <div style="position: absolute; top: -12px; right: -12px; color: red">
            <v-icon icon="mdi-circle-medium"></v-icon>
          </div>
          <p class="text-1xl font-semibold">
            {{ hw.name }}
          </p>
          <p>
            {{ hw.hwText }}
          </p>
        </div>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <v-btn size="large" class="mt-6" @click="submit">отправить</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="newHomeworkDialog" fullscreen>
      <v-card prepend-icon="mdi-plus" title="Домашнее задание">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Название задания"
                hide-details
                variant="outlined"
                v-model="newHomework.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Текст задания"
                variant="outlined"
                hide-details
                v-model="newHomework.hwText"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <p class="text-1xl font-semibold">Материалы</p>
              что такое материалы?
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn class="mx-auto mb-5" @click="addNewHomework" size="x-large" variant="tonal">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
