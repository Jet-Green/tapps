<script setup lang="ts">
import type { Lesson } from "~/types/lesson.interface"

const router = useRouter()
const route = useRoute()

const authStore = useAuth()

let { lesson } = defineProps<{
  lesson: Lesson
}>()

</script>
<template>
  <div
    class="border rounded-lg relative cursor-pointer h-100"
    @click="router.push(`lesson?_id=${lesson._id}&course_id=${route.params?.course_id || lesson.course}`)"
  >
    <v-col cols="12" class="flex justify-center">
      <img class="w-50 mt-5" :src="lesson.images?.logo" />
      <v-btn
        v-if="authStore.user?.roles[0] == 'teacher' || authStore.user?.roles[0] == 'admin'"
        @click.stop="
          router.push(
            `/${authStore.user?.roles[0]}/lesson-manage?lesson_id=${lesson._id}&course_id=${
              route.params?.course_id || lesson.course
            }`
          )
        "
        class="absolute -top-6 z-50 btn border"
        icon="mdi-pencil-outline"
      ></v-btn>
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
<style lang="scss" scoped>
.btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
