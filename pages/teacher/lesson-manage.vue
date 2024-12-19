<script setup lang="ts">
definePageMeta({
  middleware: ["teacher"],
  // or middleware: 'auth'
})

import type { Course } from "~/types/course.interface"
import type { Lesson } from "~/types/lesson.interface"

interface Link {
  name: string
  value: string
}
interface Homework {}

interface Form {
  name: string
  shortDescription: string
  links: Link[]
  homework: Homework[]
}

import { toast } from "vue3-toastify"

const courseStore = useCourse()
const lessonStore = useLesson()

const router = useRouter()
const route = useRoute()

let videoUploadedPath = ref<string | null>()
let form = ref<Form>({
  name: "",
  shortDescription: "",
  links: [],
  homework: [],
})

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

// upload code
let codeFiles = ref<any>()
let codeFilesNames = ref<string>()
let codeFilesLength = ref<number>(0)
async function onCodeFilesChange(event: any) {
  const files = event.target.files
  if (files.length <= 40) {
    codeFiles.value = files
    let names: string[] = []
    for (let f of files) {
      names.push(f.name)
    }
    codeFilesNames.value = names.join(",")
  } else {
    toast("Максимум 40 файлов!", {
      type: "warning",
    })
    return
  }
  codeFilesLength.value = files.length
}
// upload code
let currentLink = ref({
  name: "",
  value: "",
})
let addLinkDialog = ref<boolean>(false)
function addLink() {
  addLinkDialog.value = true
}

function addLinkAndClose() {
  let copy = Object.assign({}, currentLink.value)
  // save current link
  form.value.links.push(copy)
  // clear current link
  currentLink.value.name = ""
  currentLink.value.value = ""
  addLinkDialog.value = false
}

let editLinkDialog = ref<boolean>(false)

let currentIndex = ref<number | null>(null)
function openEditLinkDialog(linkIndex: number) {
  try {
    currentLink.value.name = form.value.links[linkIndex].name
    currentLink.value.value = form.value.links[linkIndex].value

    currentIndex.value = linkIndex
    editLinkDialog.value = true
  } catch (error) {}
}

function closeEditLink() {
  // clear
  currentIndex.value = null

  currentLink.value.name = ""
  currentLink.value.value = ""

  editLinkDialog.value = false
}

function editLinkAndClose() {
  if (currentIndex.value == null) return

  form.value.links[currentIndex.value].name = currentLink.value.name
  form.value.links[currentIndex.value].value = currentLink.value.value

  // clear
  currentIndex.value = null

  currentLink.value.name = ""
  currentLink.value.value = ""

  editLinkDialog.value = false
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
        <p class="text-4xl font-semibold">Редактировать урок</p>
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

      <!-- <v-col cols="12">
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
      </v-col> -->

      <v-col cols="12" md="6" class="border" style="border-radius: 36px">
        <p class="font-bold text-2xl ma-2">Прикреплённые ссылки</p>

        <v-row>
          <v-col
            v-for="(link, index) of form.links"
            :key="index"
            cols="12"
            class="d-flex align-center justify-space-between ma-2"
          >
            <div class="link-container">
              <div>
                Имя ссылки: <b>{{ link.name }}</b>
              </div>
              <div>
                Адрес ссылки:
                <b
                  ><a :href="link.value">{{ link.value }}</a></b
                >
              </div>
            </div>

            <div class="d-flex">
              <v-btn
                class="default-btn mx-2"
                variant="tonal"
                prepend-icon="mdi-pencil"
                @click="openEditLinkDialog(index)"
                >Изменить ссылку</v-btn
              >
              <v-btn
                class="default-btn mx-2"
                variant="tonal"
                prepend-icon="mdi-delete-outline"
                @click="form.links.splice(index, 1)"
                >Открепить ссылку</v-btn
              >
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn @click="addLink" class="default-btn" variant="tonal" block prepend-icon="mdi-plus"
              >Добавить ссылку</v-btn
            >
          </v-col>
        </v-row>
      </v-col>

      <v-dialog max-width="600" v-model="addLinkDialog" persistent>
        <v-card title="Добавить" prepend-icon="mdi-plus">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  label="Имя ссылки"
                  v-model="currentLink.name"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field variant="outlined" label="Адрес" v-model="currentLink.value" hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="default-btn" variant="tonal" color="error" @click="addLinkDialog = false">Отмена</v-btn>
            <v-btn class="default-btn" variant="tonal" color="success" @click="addLinkAndClose">Готово</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog max-width="600" v-model="editLinkDialog" persistent>
        <v-card title="Изменить" prepend-icon="mdi-pencil">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  label="Имя ссылки"
                  v-model="currentLink.name"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field variant="outlined" label="Адрес" v-model="currentLink.value" hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="default-btn" variant="tonal" color="error" @click="closeEditLink">Отмена</v-btn>
            <v-btn class="default-btn" variant="tonal" color="success" @click="editLinkAndClose">Готово</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12">
        <UploadVideo @upload-finished="uploadFinished" />
      </v-col>

      <v-col cols="12">
        <p class="text-2xl font-semibold">Домашнее задание</p>
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
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-icon class="mr-4">mdi-plus</v-icon>
            Домашнее задание
          </div>

          <v-icon @click="newHomeworkDialog = false" class="cursor-pointer pa-2">mdi-close</v-icon>
        </v-card-title>
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
              <!-- <p class="text-2xl font-semibold">Материалы</p> -->

              <!-- <v-row>
                <v-col cols="12">
                  <p class="text-1xl font-semibold mb-4">Загрузка кода</p>
                  <div class="folder-input-container border rounded-lg cursor-pointer">
                    <input
                      type="file"
                      multiple
                      @change="onCodeFilesChange"
                      accept=".cs,.cpp,.js,.ts,.java,.py,.rb,.php,.go,.swift,.kt,.html,.css,.xml,.json,.sql,.r,.pl,.sh,.bash,.vue,.asm,.dart,.csproj,.proj,.sln,.ipynb,.m,.lock"
                      class="cursor-pointer"
                    />
                    <v-icon
                      class="centered"
                      icon="upload-icon mdi-code-block-braces"
                      v-if="codeFilesLength == 0"
                    ></v-icon>
                    <div v-else class="centered">
                      <b>
                        {{ codeFilesNames }}
                      </b>
                    </div>
                  </div>
                </v-col>


              </v-row> -->
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
<style lang="scss">
.folder-input-container {
  height: 100px;
  input {
    opacity: 0;
    // display: none;
    width: 100%;
    height: 100%;
  }
  position: relative;
  .upload-icon {
    font-size: 40px;
  }
  .centered {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }
}
.link-container {
  overflow: hidden;
}
</style>
