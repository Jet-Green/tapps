import { defineStore } from "pinia"
import CourseApi from '../api/CourseApi'

import { useAuth } from './auth';

// interfaces
import type { Course } from "../types/course.interface"


export const useCourse = defineStore('course', () => {
  let courses = ref<Course[]>()
  let currentCourse = ref<Course>()

  async function getAll() {
    if (courses.value && courses.value?.length > 0) return null
    const auth = useAuth();
    // когда админ - получает все курсы
    // когда обычный пользователь только свои курсы
    
    let res;
    if (auth.user?.roles[0] == 'teacher') {
      res = await CourseApi.getAll(null)
    } else {
      res = await CourseApi.getAll(auth.user?.courses)
    }
    // console.log(res.data.value);

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

  async function createLesson(form: any, courseId: string) {
    return await CourseApi.createLesson({ lesson: form, courseId })
  }

  async function createCourse(course: any) {
    return await CourseApi.createCourse(course)
  }

  async function getLessonsByCourseId(courseId: string) {
    return await CourseApi.getLessonsByCourseId(courseId)
  }

  async function getHomeworksByCourses(courses: string[]) {
    return await CourseApi.getHomeworksByCourses(courses)
  }

  return {
    // functions
    getAll, getCourseByIdWithLessons, addUserToCourse, createLesson, createCourse,
    getLessonsByCourseId, getHomeworksByCourses,
    // variables
    courses, currentCourse,
  }
})