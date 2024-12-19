interface Link {
  name: string,
  value: string
}

export interface Lesson {
  _id: string,
  name: string,
  shortDescription: string,
  links: Link[],
  videos: string[],
  homework: [],
  course: string,
  images: {
    logo: string
  },
}