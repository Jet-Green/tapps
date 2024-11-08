import { defineStore } from "pinia"
import SolutionApi from "~/api/SolutionApi"

export const useSolutions = defineStore('solution', () => {

  let solutions = ref<any>([])

  async function getAll() {
    let res = await SolutionApi.getAll()
    if (res.status.value == 'success') {
      solutions.value = res.data.value;
    }
    return res
  }

  async function getById(solutionId: string) {
    return await SolutionApi.getById(solutionId);
  }

  async function setTeacherResponse(status: string, teacherComment: string, solutionId: string) {
    return await SolutionApi.setTeacherResponse({ status, teacherComment, solutionId })
    // return await SolutionApi.setTeacherResponse(status, teacherComment)
  }

  return {
    // functions
    getAll, getById, setTeacherResponse,
    // variables
    solutions,
  }
})