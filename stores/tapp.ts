import { defineStore } from "pinia"

import TappApi from "~/api/TappApi"

import type Tapp from "~/types/tapp.interface"

export const useTapp = defineStore('tapp', () => {

  // data isnt any - its Tapp
  async function createTapp(data: any): Promise<any> {    
    let res = await TappApi.createTapp(data);
    // console.log(res);
    return res
  }

  async function getById(tappId: string): Promise<any> {
    return await TappApi.getById(tappId);
  }

  return {
    // variables
    // functions
    createTapp, getById,
  }
})
