<script setup lang="ts">
import type { Course } from '~/types/course.interface';
import type { User } from '~/types/user.interface';

const courseStore = useCourse()
const authStore = useAuth()

let { courses } = storeToRefs(courseStore)

let coursesToSelect = ref<any>([])
let selectedCourseId = ref<string>('')
let selectedCourse = ref<Course>();

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
    for(let studentId of selectedCourse.value?.students) {
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
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-2xl font-semibold">Редактировать курс</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-select label="выбрать курс" :items="coursesToSelect" variant="outlined" v-model="selectedCourseId"></v-select>
      </v-col>
      <v-col cols="12" v-if="selectedCourseId">
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Название" v-model="form.name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea variant="outlined" label="Описание" v-model="form.shortDescription"></v-textarea>
          </v-col>
          <v-col cols="12">фотографии coming soon</v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <p class="text-1xl font-semibold">Добавить пользователя в курс</p>
          </v-col>
          <v-col cols="12">
            <v-row v-for="user of users" >
              <v-col class="d-flex align-center">
                <v-icon icon="mdi-account"></v-icon>
                {{ user.name }}
                {{ user.surname }}
                <v-btn class="ml-6" size="small" @click="addUserToCourse(user._id)" :disabled="isUserInCourse(user._id)">добавить</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>