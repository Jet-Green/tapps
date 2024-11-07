export default {
  uploadFolder(folderFD: any, destination: string, solutionId: string): Promise<any> {
    return useApiFetch(`/solution/upload/folder?destination=${destination}&solution_id=${solutionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: folderFD
    })
  },
  uploadArchive(archivesFD: any, destination: string, solutionId: string): Promise<any> {
    return useApiFetch(`/solution/upload/archives?destination=${destination}&solution_id=${solutionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: archivesFD
    })
  },
  uploadAnyFiles(anyFilesFD: any, destination: string, solutionId: string): Promise<any> {
    return useApiFetch(`/solution/upload/any-files?destination=${destination}&solution_id=${solutionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: anyFilesFD
    })
  },
  uploadCode(codeFD: any, destination: string, solutionId: string): Promise<any> {
    return useApiFetch(`/solution/upload/code?destination=${destination}&solution_id=${solutionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: codeFD
    })
  },
}