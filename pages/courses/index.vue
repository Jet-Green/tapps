<script setup lang="ts">
const courseStore = useCourse()
let { courses } = storeToRefs(courseStore)

await courseStore.getAll()
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(course, index) in courses">
        <CourseCard :course="course" :key="index"></CourseCard>
      </v-col>
    </v-row>
  </v-container>
</template>