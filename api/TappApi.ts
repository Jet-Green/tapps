export default {
  createTapp(tapp: any): Promise<any> {    
    return useApiFetch('/tapp/create', { method: 'POST', body: { tapp } })
  },
  getById(tappId: string): Promise<any> {
    return useApiFetch(`/tapp/get-by-id?_id=${tappId}`, { method: 'GET' })
  }
}