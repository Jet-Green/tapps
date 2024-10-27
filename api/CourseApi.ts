export default {
  getAll(): Promise<any> {
    return useApiFetch('/courses', { method: 'GET' })
  }
}