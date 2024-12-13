<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

const courseStore = useCourse();

let lessonByCourses = ref<any[]>([])

let res = await courseStore.getUserLessonsGroupedByCourse();
if (res.status.value == 'success') {
  lessonByCourses.value = res.data.value;
  console.log(res.data.value);
  
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-4xl font-semibold">Доступные мне уроки</p>
      </v-col>
      <v-col cols="12" v-for="(course, index) of lessonByCourses" :key="index">
        {{ course }}
      </v-col>
    </v-row>
  </v-container>
</template>