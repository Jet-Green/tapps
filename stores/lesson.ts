import { defineStore } from "pinia"
import LessonApi from '../api/LessonApi'
import type { Lesson } from "~/types/lesson.interface"

export const useLesson = defineStore('lesson', () => {

  async function updateLesson(lesson: Lesson, newHomeworks: any) {
    return await LessonApi.updateLesson(lesson, newHomeworks)
  }

  return {
    // functions
    updateLesson,
    // variables
  }
})