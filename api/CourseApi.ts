export default {
  getAll(): Promise<any> {
    return useApiFetch('/courses', { method: 'GET' })
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