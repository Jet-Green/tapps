export interface User {
	_id: string
	name: string
	surname: string
	email: string
	password: string
	roles: string[]
	myCourses: string[]
	createdCourses: string[]
}
