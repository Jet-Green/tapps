import type { Lesson } from './lesson.interface'
import type { User } from './user.interface'

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
