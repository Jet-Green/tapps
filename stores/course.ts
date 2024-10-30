import { defineStore } from "pinia"
import CourseApi from '../api/CourseApi'

// interfaces
import type { Course } from "../types/course.interface"


export const useCourse = defineStore('course', () => {
  let courses = ref<Course[]>()
  let currentCourse = ref<Course>()

  async function getAll() {
    if (courses.value && courses.value?.length > 0) return null
    
    let res = await CourseApi.getAll()

    courses.value = res.data.value

    return res
  }


  async function getCourseByIdWithLessons(courseId: string) {
    let res = await CourseApi.getCourseByIdWithLessons(courseId)
    if (res.status.value == 'success') {
      currentCourse.value = res.data.value
    }
  }

  async function addUserToCourse(userId: string, courseId: string) {
    return await CourseApi.addUserToCourse(userId, courseId)
  }

  return {
    // functions
    getAll, getCourseByIdWithLessons, addUserToCourse,
    // variables
    courses, currentCourse,
  }
})