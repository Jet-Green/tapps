<script setup lang="ts">
import type { Lesson } from '~/types/lesson.interface';

const router = useRouter()
const route = useRoute()

let { lesson } = defineProps<{
  lesson: Lesson,
}>()
</script>
<template>
  <div class="border rounded-lg relative cursor-pointer h-100"
    @click="router.push(`lesson?_id=${lesson._id}&course_id=${route.params?._id}`)">
    <v-col cols="12" class="flex justify-center">
      <img class="w-50"
        src="https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg" />
      <v-btn variant="text"
        @click.stop="router.push({ name: 'lesson-manage', query: { lesson_id: lesson._id, course_id: route.params?._id} })"
        class="ma-2 z-50" icon="mdi-cog-outline"></v-btn>
    </v-col>
    <v-col cols="12">
      <p class="text-2xl font-semibold">{{ lesson.name }}</p>
    </v-col>
    <v-col cols="12">
      <p class="text-base">
        {{ lesson.shortDescription }}
      </p>
    </v-col>
  </div>
</template>
<style lang="css" scoped>
.v-btn {
  position: absolute;
  right: 0%;
  top: 0%;
}
</style>
