<script setup lang="ts">
import type { Course } from '~/types/course.interface';

import { useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const authStore = useAuth();

const CourseProps = defineProps<{
  course: Course,
}>()

let { course } = CourseProps
</script>
<template>
  <div class="border relative rounded-lg cursor-pointer h-100" @click="router.push(`${authStore.user?.roles[0]}/${course._id}`)">
    <v-col cols="12" class="flex justify-center">
      <img class="w-50 mt-5" :src="course.images?.logo" />
      <v-btn v-if="authStore.user?.roles[0] == 'teacher' || authStore.user?.roles[0] == 'admin'"
        @click.stop="router.push(`${authStore.user?.roles[0]}/course-manage?id=${course._id}`)" class="absolute -top-6 z-50 btn border"
        icon="mdi-pencil-outline"></v-btn>
    </v-col>
    <v-col cols="12">
      <p class="text-2xl font-semibold">{{ course.name }}</p>
    </v-col>
    <v-col cols="12">
      <p class="text-base">
        {{ course.shortDescription }}
      </p>
    </v-col>
  </div>
</template>
<style lang="css" scoped>
.btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
