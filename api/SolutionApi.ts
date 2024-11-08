
export default {
  getAll(): Promise<any> {
    return useApiFetch(`/solution`, {
      method: 'GET',
    })
  },
  getById(solutionId: string): Promise<any> {
    return useApiFetch(`/solution/get-by-id?_id=${solutionId}`, {
      method: 'GET',
    })
  },
  setTeacherResponse(body: any): Promise<any> {
    return useApiFetch(`/solution/set-teacher-response`, {
      method: 'POST',
      body: body
    })
  }
}