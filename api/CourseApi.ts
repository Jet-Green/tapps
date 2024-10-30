export default {
  getAll(courses: any): Promise<any> {
    return useApiFetch('/courses', { method: 'POST', body: { courses } })
  },
  getCourseByIdWithLessons(courseId: string): Promise<any> {
    return useApiFetch(`/courses/one-with-lessons?course_id=${courseId}`, { method: 'GET' })
  },
  addUserToCourse(userId: string, courseId: string) {
    return useApiFetch(`/courses/add-user-to-course`, {
      method: 'POST', body: {
        userId,
        courseId
      }
    })
  }
}