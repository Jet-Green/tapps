export default {
  uploadFolder(folderFD: any): Promise<any> {
    return useApiFetch(`/solution/upload/folder`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: folderFD
    })
  },
  uploadArchive(archivesFD: any): Promise<any> {
    return useApiFetch(`/solution/upload/archives`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: archivesFD
    })
  },
  uploadAnyFiles(anyFilesFD: any): Promise<any> {
    return useApiFetch(`/solution/upload/any-files`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: anyFilesFD
    })
  },
  uploadCode(codeFD: any): Promise<any> {
    return useApiFetch(`/solution/upload/code`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: codeFD
    })
  },
}