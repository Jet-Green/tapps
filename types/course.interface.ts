import type { Lesson } from './lesson.interface'

export interface Course {
  _id: string,
  images: string[],
  name: string,
  shortDescription: string,
  lessons: Lesson[],
  students: string[]
}
