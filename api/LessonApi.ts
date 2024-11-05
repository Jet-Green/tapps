import type { Lesson } from "~/types/lesson.interface"

export default {
  updateLesson(lesson: Lesson, newHomeworks: any): Promise<any> {
    return useApiFetch('/lesson/update', {
      method: 'POST',
      body: {
        lesson,
        newHomeworks
      }
    })
  },
  uploadVideo(videoFormData: FormData, lessonId: string): Promise<any> {
    return useApiFetch(`/video/upload?lesson_id=${lessonId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: videoFormData
    })
  }
}