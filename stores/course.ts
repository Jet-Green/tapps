import { defineStore } from "pinia"
import CourseApi from '../api/CourseApi'

import { useAuth } from './auth';

// interfaces
import type { Course } from "../types/course.interface"
import type { CourseToDb } from "~/types/course.to-db.interface";


export const useCourse = defineStore('course', () => {
  let courses = ref<Course[]>()
  let currentCourse = ref<Course>()

  async function getAll() {
    if (courses.value && courses.value?.length > 0) return null
    const auth = useAuth();

    // когда админ или учитель - получает все курсы
    // когда обычный пользователь только свои курсы
    const roles = auth.user?.roles;
    
    if (!roles) return null;
    
    let res;
    if (roles.indexOf('teacher') != -1) {
      res = await CourseApi.getAll('teacher', null)
    } else if (roles.indexOf('admin') != -1) {
      res = await CourseApi.getAll('admin', null)
    } else if (roles.indexOf('student') != -1 && auth.user != null) {
      res = await CourseApi.getAll('student', auth.user.courses)
    } else {
      res = await CourseApi.getAll('student', [])
    }

    courses.value = res.data.value

    return res
  }


  async function getCourseByIdWithLessons(courseId: string) {
    let res = await CourseApi.getCourseByIdWithLessons(courseId)
    if (res.status.value == 'success') {
      currentCourse.value = res.data.value
    }
  }

  async function uploadImages(formData: FormData, courseId: string) {
    return await CourseApi.uploadImages(formData, courseId)
  }

  async function addUserToCourse(userId: string, courseId: string) {
    return await CourseApi.addUserToCourse(userId, courseId)
  }

  async function createLesson(form: any, courseId: string) {
    return await CourseApi.createLesson({ lesson: form, courseId })
  }

  async function createCourse(course: CourseToDb) {
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
    getLessonsByCourseId, getHomeworksByCourses, uploadImages,
    // variables
    courses, currentCourse,
  }
})