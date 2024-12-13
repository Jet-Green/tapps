<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

const courseStore = useCourse()
const router = useRouter()

let { courses } = storeToRefs(courseStore)

await courseStore.getAll()

</script>
<template>
  <v-container>
    <v-row class="ga-3 ga-md-0 mt-5">
      <v-col cols="12" sm="6" md="4" lg="3">
        <div class="border cursor-pointer h-100 d-flex justify-center align-center" @click="router.push(`admin/add-course`)" style="font-size: 40px; border-radius: 36px;">
          <v-icon class="text-zinc-600 ma-8" icon="mdi-plus"></v-icon>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(course, index) in courses">
        <CourseCard :course="course" :key="index"></CourseCard>
      </v-col>
    </v-row>
  </v-container>
</template>
