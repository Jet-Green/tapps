export default {
  createTapp(tapp: any): Promise<any> {    
    return useApiFetch('/tapp/create', { method: 'POST', body: { tapp } })
  },
}