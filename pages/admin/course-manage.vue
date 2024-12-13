<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

import type { Course } from '~/types/course.interface';
import type { User } from '~/types/user.interface';

const courseStore = useCourse()
const authStore = useAuth()

let route = useRoute()
let { courses } = storeToRefs(courseStore)

let coursesToSelect = ref<any>([])
let selectedCourseId = ref()
let selectedCourse = ref<Course>();

let imagesFormData = new FormData()
let visibleCropperModal = ref(false)
let dialog = ref(false);

let photoPreview = ref()
function uploadLogo(file: File) {
  imagesFormData.set('logo', file, 'logo_' + String(Date.now()) + '.jpg')
  let reader = new FileReader();
  reader.onloadend = function () {
    photoPreview.value = reader.result
  }
  reader.readAsDataURL(file)
  visibleCropperModal.value = false
}

function deletePreview() {
  imagesFormData.set('logo', ' ')
  photoPreview.value = null
}


let form = ref({
  name: '',
  shortDescription: '',
})
let users = ref<User[]>([])

await courseStore.getAll()

if (courses.value) {
  for (let c of courses.value) {
    coursesToSelect.value.push({
      title: c.name,
      value: c._id
    })
  }
}

async function addUserToCourse(userId: string) {
  let response = await courseStore.addUserToCourse(userId, selectedCourseId.value)
}

function isUserInCourse(userId: string) {
  if (selectedCourse.value) {
    for (let studentId of selectedCourse.value?.students) {
      if (studentId == userId) {
        return true
      }
    }
  }
  return false
}

watch(selectedCourseId, (newSelectedCourse) => {
  if (courses.value) {
    for (let course of courses.value) {
      if (course._id == newSelectedCourse) {
        form.value.name = course.name;
        form.value.shortDescription = course.shortDescription;
        selectedCourse.value = course;
        return
      }
    }
  }
})

let response = await authStore.getAllUsers()

if (response.status.value == 'success') {
  users.value = response.data.value
}

onMounted(() => {
  selectedCourseId.value = route.query.id;
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-4">
        <p class="text-4xl font-semibold">Редактировать курс</p>
        <BackButton class="mt-4"></BackButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-select label="выбрать курс" :items="coursesToSelect" variant="outlined" v-model="selectedCourseId">
        </v-select>
      </v-col>
    </v-row>
    <v-row v-if="selectedCourseId">
      <v-col cols="12" md="8">
        <v-text-field variant="outlined" label="Название" v-model="form.name"></v-text-field>
        <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription"></v-textarea>
      </v-col>

      <v-col cols="12" md="4" class="pb-8">
        <div @click="visibleCropperModal = true" class="h-100">
          <label for="uploadLogo">
            <div class="h-100 flex flex-col align-center justify-center rounded border-opacity-25	border-sm">
              <v-icon icon="mdi mdi-cloud-upload-outline" class="icon" />
              <span class="explanation text-center">Загрузить обложку курса</span>
            </div>
          </label>
        </div>

        <v-dialog v-model="dialog" width="auto">
          <v-card max-width="400" title="Удалить фото">
            <template v-slot:actions>
              <v-btn text="нет" @click="dialog = false;"></v-btn>
              <v-btn text="да" @click="dialog = false; deletePreview()"></v-btn>
            </template>
          </v-card>
        </v-dialog>

        <v-dialog v-model="visibleCropperModal">
          <v-row class="justify-center">
            <v-col cols="12" md="8" lg="6">
              <v-card class="pa-4 rounded-lg">
                <ImageCropper @uploadImage="uploadLogo" />

                <v-card-actions>
                  <v-btn @click="visibleCropperModal = false" variant="tonal" size="large" class="btn ml-auto">
                    закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-img class="my-2 relative z-0 overflow-visible rounded" :src="photoPreview" width="200" v-if="photoPreview">
          <v-btn class="absolute -top-7 z-50 btn border" @click="dialog = true"
            icon="mdi mdi-trash-can-outline"></v-btn>
        </v-img>
      </v-col>

      <v-col cols="12">
        <p class="text-1xl font-semibold">Добавить пользователя в курс</p>
      </v-col>
      <v-col cols="12">
        <v-row v-for="user of users">
          <v-col class="d-flex align-center">
            <v-icon icon="mdi-account"></v-icon>
            {{ user.name }}
            {{ user.surname }}
            <v-btn class="ml-6" size="small" @click="addUserToCourse(user._id)"
              :disabled="isUserInCourse(user._id)">добавить</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="flex justify-center">
        <v-btn size="x-large">Создать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>