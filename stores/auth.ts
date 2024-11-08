import { defineStore } from "pinia"
import AuthAPI from "../api/AuthApi"

import type { User } from "../types/user.interface"
import { ref } from "vue"

export const useAuth = defineStore('auth', () => {
  let user = ref<User | null>()

  async function registration(data: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(data)
      if (response.data.value) {
        user.value = response.data.value.user
      }
      return true
    } catch {
      return false
    }
  }


  async function registerStudent(user: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registerStudent(user)
      if (response.data.value) {
        console.log(response);
      }
      return true
    } catch {
      return false
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await AuthAPI.login(email, password)
      if (response.data.value) {
        user.value = response.data.value.user
      }
      return response
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      if (user.value?._id) {
        return true
      }
      const response = await AuthAPI.refresh()
      
      if (response.data.value?._id) {
        user.value = response.data.value
        return true
      } else {
        return false
      }
    } catch (error) {
      await logout()
      return false
    }
  }

  async function getAllUsers(): Promise<any> {
    try {
      return await AuthAPI.getAllUsers()
    } catch (error) {
      console.log(error);
    }
  }

  // async function checkAdmin(): Promise<boolean | undefined> {
  //   try {
  //     if (!user.value?._id) {
  //       const response = await AuthAPI.refresh()
  //       if (response.data.value?._id) {
  //         user.value = response.data.value
  //       }
  //     }

  //     //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
  //     const hasAdminRole = user?.value?.roles.some(role => role === 'admin');
  //     return hasAdminRole
  //   } catch (error) {
  //     await logout()
  //     return false
  //   }
  // }
  // async function checkManager(): Promise<boolean | undefined> {
  //   try {
  //     if (!user.value?._id) {
  //       const response = await AuthAPI.refresh()
  //       if (response.data.value?._id) {
  //         user.value = response.data.value
  //       }
  //     }

  //     //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
  //     const hasManagerRole = user?.value?.roles.some(role => role === 'manager');
  //     return hasManagerRole
  //   } catch (error) {
  //     await logout()
  //     return false
  //   }
  // }

  async function logout(): Promise<any> {
    try {
      let res = await AuthAPI.logout()

      user.value = null
      useRouter().push('/')
      return res
    } catch { }
  }

  async function updateUser(new_user: any) {
    try {
      user.value = (await AuthAPI.updateUser(new_user)).data
    } catch { }
  }

  async function sendResetLink(email: string): Promise<any> {
    try {
      return await AuthAPI.sendResetLink(email)
    } catch (error) {
      console.log(error);
    }
  }

  async function resetPassword(password: string, userId: string, token: string): Promise<any> {
    try {
      return await AuthAPI.resetPassword(password, userId, token)
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // variables
    user,
    // functions
    registration, login, checkAuth, logout,
    updateUser, sendResetLink, resetPassword, registerStudent,
    getAllUsers,
  }
})
