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
  }
}