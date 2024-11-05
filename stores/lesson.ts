import { defineStore } from "pinia"
import LessonApi from '../api/LessonApi'
import type { Lesson } from "~/types/lesson.interface"

export const useLesson = defineStore('lesson', () => {

  async function updateLesson(lesson: Lesson, newHomeworks: any) {
    return await LessonApi.updateLesson(lesson, newHomeworks)
  }

  async function uploadVideo(videoFormData: FormData, lessonId: string) {
    return await LessonApi.uploadVideo(videoFormData, lessonId)
  }
  async function newSolution(solution: any) {
    return await LessonApi.newSolution(solution)
  }

  return {
    // functions
    updateLesson, uploadVideo, newSolution,
    // variables
  }
})