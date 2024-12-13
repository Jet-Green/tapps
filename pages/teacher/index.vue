<script setup lang="ts">
definePageMeta({
  middleware: ["teacher"]
  // or middleware: 'auth'
})

const courseStore = useCourse()
const authStore = useAuth()
const router = useRouter()

let { courses } = storeToRefs(courseStore)

await courseStore.getAll()
</script>
<template>
  <v-container>
    <v-col>
      <p class="text-4xl font-semibold">Мои курсы</p>
    </v-col>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <div class="border cursor-pointer h-100 d-flex justify-center align-center"
          @click="router.push(`${authStore.user?.roles[0]}/add-course`)" style="font-size: 40px; border-radius: 36px;">
          <v-icon class="text-zinc-600 ma-8" icon="mdi-plus"></v-icon>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(course, index) in courses">
        <CourseCard :course="course" :key="index"></CourseCard>
      </v-col>
    </v-row>
  </v-container>
</template>
