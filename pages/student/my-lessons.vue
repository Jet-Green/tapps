<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

const courseStore = useCourse()

let lessonByCourses = ref<any[]>([])

let res = await courseStore.getUserLessonsGroupedByCourse()
if (res.status.value == "success") {
  lessonByCourses.value = res.data.value
}

function getRole(roles: string[]): string {
  if (roles.indexOf("student") != -1) return "Ученик"
  else if (roles.indexOf("teacher") != -1) return "Учитель"
  else if (roles.indexOf("admin") != -1) return "Администратор"

  return "кто-то неопознанный"
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-4xl font-semibold">Доступные мне уроки</p>
      </v-col>
      <v-col cols="12" v-for="(course, index) of lessonByCourses" :key="index">
        <v-row>
          <v-col cols="auto">
            <img :src="course.images.logo" alt="картинка;)" style="border-radius: 12px; max-height: 200px" />
          </v-col>
          <v-col cols="8" class="course-info">
            <v-row>
              <v-col cols="12" class="d-flex align-center">
                <p class="text-xl font-semibold">Курс: {{ course.name }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex align-center">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <p class="text-xl font-semibold">
                      {{ course.teacher.name }}
                      {{ course.teacher.surname }}
                    </p>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    {{ getRole(course.teacher.roles) }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(lesson, index) in course.lessons">
            <LessonCard :key="index" :lesson="lesson" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.course-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
