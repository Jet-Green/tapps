<script setup lang="ts">
definePageMeta({
  middleware: ["teacher"],
  // or middleware: 'auth'
})

import { toast } from "vue3-toastify";
import type { Course } from "~/types/course.interface"
import type { User } from "~/types/user.interface"

const courseStore = useCourse()
const authStore = useAuth()

let route = useRoute()
let { courses } = storeToRefs(courseStore)

let coursesToSelect = ref<any>([])
let selectedCourseId = ref()
let selectedCourse = ref<Course>()

let form = ref({
  name: "",
  shortDescription: "",
})
let users = ref<User[]>([])

await courseStore.getAll()

if (courses.value) {
  for (let c of courses.value) {
    coursesToSelect.value.push({
      title: c.name,
      value: c._id,
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
        form.value.name = course.name
        form.value.shortDescription = course.shortDescription
        selectedCourse.value = course
        return
      }
    }
  }
})

let loading = ref(false)
let submitCount = 0;
async function submit() {
  submitCount++;
  if (submitCount > 1 || !authStore.user?._id) return;
  loading.value = true

  let res = await courseStore.updateCourse(form.value, selectedCourseId.value, authStore.user.roles[0])  
  if (res.status.value == "success") {
    loading.value = false;
    toast("Курс успешно обновлён!", {
      type: "success"
    })
  }
}

let response = await authStore.getAllUsers()

if (response.status.value == "success") {
  users.value = response.data.value
}

onMounted(() => {
  selectedCourseId.value = route.query.id
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-4xl font-semibold">Редактировать курс</p>
        <BackButton class="mt-4" />
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <v-select
              label="выбрать курс"
              :items="coursesToSelect"
              variant="outlined"
              v-model="selectedCourseId"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="selectedCourseId">
            <v-row>
              <v-col cols="12">
                <v-text-field variant="outlined" label="Название" v-model="form.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription"></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="4"> фотки </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-col cols="12" class="border" style="border-radius: 36px">
          <v-col cols="12">
            <p class="text-2xl font-semibold">Люди в курсе</p>
          </v-col>
          <v-col cols="12">
            <v-row v-for="user of users">
              <v-col class="d-flex align-center">
                <v-icon icon="mdi-account"></v-icon>
                {{ user.name }}
                {{ user.surname }}
                <v-btn class="ml-6" size="small" @click="addUserToCourse(user._id)" :disabled="isUserInCourse(user._id)"
                  >добавить</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn class="submit-button" type="text" @click="submit" :loading="loading"
          >Изменить курс <v-icon>mdi-check</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
