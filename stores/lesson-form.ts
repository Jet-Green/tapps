import { defineStore } from "pinia"

import { ref } from "vue"

export const useLessonForm = defineStore('lesson-form', () => {
  let currentLesson = ref<any>()
  let isCurrentLessonChanged = ref<boolean>(false)

  async function uploadAvatar() {
    try {

    } catch (error) {
    }
  }

  return {
    // variables
    currentLesson,
    // functions
    uploadAvatar,
  }
})
