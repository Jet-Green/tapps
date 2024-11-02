export default {
  getAll(courses: any): Promise<any> {
    return useApiFetch('/courses', { method: 'POST', body: { courses } })
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
  }
}