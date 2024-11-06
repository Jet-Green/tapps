export default {
  uploadFolder(folderFD: any, destination: string): Promise<any> {
    return useApiFetch(`/solution/upload/folder?destination=${destination}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: folderFD
    })
  },
  uploadArchive(archivesFD: any, destination: string): Promise<any> {
    return useApiFetch(`/solution/upload/archives?destination=${destination}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: archivesFD
    })
  },
  uploadAnyFiles(anyFilesFD: any, destination: string): Promise<any> {
    return useApiFetch(`/solution/upload/any-files?destination=${destination}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: anyFilesFD
    })
  },
  uploadCode(codeFD: any, destination: string): Promise<any> {
    return useApiFetch(`/solution/upload/code?destination=${destination}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: codeFD
    })
  },
}