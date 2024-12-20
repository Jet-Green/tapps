export default {
  getAll(role: string, courses: string[]|null): Promise<any> {    
    return useApiFetch(`/courses/${role}/get-all`, { method: 'POST', body: { courses } })
  },
  uploadImages(formData: FormData, _id: string): Promise<any> {
    return useApiFetch(`/courses/images?course_id=${_id}`, { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData })
  },
  getCourseByIdWithLessons(courseId: string): Promise<any> {
    return useApiFetch(`/courses/one-with-lessons?course_id=${courseId}`, { method: 'GET' })
  },
  addUserToCourse(userId: string, courseId: string): Promise<any> {
    return useApiFetch(`/courses/add-user-to-course`, {
      method: 'POST', body: {
        userId,
        courseId
      }
    })
  },
  createLesson(body: any): Promise<any> {
    return useApiFetch(`/courses/create-lesson`, {
      method: 'POST',
      body
    })
  },
  createCourse(course: any): Promise<any> {
    return useApiFetch(`/courses/create`, {
      method: 'POST',
      body: { course }
    })
  },
  getLessonsByCourseId(courseId: string): Promise<any> {
    return useApiFetch(`/courses/get-lessons-by-course?course_id=${courseId}`, {
      method: 'GET'
    })
  },
  getHomeworksByCourses(courses: string[]): Promise<any> {
    return useApiFetch('/lesson/homeworks-by-courses', {
      method: 'POST',
      body: {
        courses
      }
    })
  },
  updateCourse(body: any, role: string): Promise<any> {
    return useApiFetch(`/courses/${role}/update`, {
      method: 'POST',
      body: body,
    })
  },
  getUserLessonsGroupedByCourse(userCourses: string[]): Promise<any> {
    return useApiFetch(`/courses/student/get-my-lessons-by-courses`, {
      method: 'POST',
      body: {
        userCourses
      },
    })
  }
}