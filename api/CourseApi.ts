export default {
  getAll(): Promise<any> {
    return useApiFetch('/courses', { method: 'GET' })
  },
  getCourseByIdWithLessons(courseId: string): Promise<any> {
    return useApiFetch(`/courses/one-with-lessons?course_id=${courseId}`, { method: 'GET' })
  }
}