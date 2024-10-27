import { defineStore } from "pinia"
import CourseApi from '../api/CourseApi'

// interfaces
import type { Course } from "../types/course.interface"


export const useCourse = defineStore('course', () => {
  let courses = ref<Course[]>()

  async function getAll() {
    let res = await CourseApi.getAll()

    courses.value = res.data.value

    return res
  }

  return {
    // functions
    getAll,
    // variables
    courses
  }
})