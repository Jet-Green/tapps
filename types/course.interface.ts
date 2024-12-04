import type { Lesson } from './lesson.interface'

export interface Course {
  _id: string,
  images: { 
    logo: string 
  },
  name: string,
  shortDescription: string,
  lessons: Lesson[],
  students: string[],
  teacher: string | any,
}
