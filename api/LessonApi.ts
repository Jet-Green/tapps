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
  uploadImages(formData: FormData, _id: string): Promise<any> {
    return useApiFetch(`/lesson/images?lesson_id=${_id}`, { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData })
  },
  uploadVideo(videoFormData: FormData, lessonId: string): Promise<any> {
    return useApiFetch(`/video/upload?lesson_id=${lessonId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: videoFormData
    })
  },
  newSolution(solution: any): Promise<any> {
    return useApiFetch(`/solution`, {
      method: 'POST',
      body: { solution }
    })
  }
}