<script setup lang="ts">
import type { Homework } from '~/types/homework.interface';

definePageMeta({
  middleware: ["auth"]
})

const courseStore = useCourse()
const authStore = useAuth()

let tasks = ref<Homework[]>([])

if (authStore.user?._id) {
  let res = await courseStore.getHomeworksByCourses(authStore.user.courses)
  if (res.status.value == 'success') {
    tasks.value = res.data.value;
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(task, index) in tasks">
        <TaskCard :task="task" :key="index" />
      </v-col>
    </v-row>
  </v-container>
</template>