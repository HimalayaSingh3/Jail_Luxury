
import * as usersService from "../service/usersService.js";

export async function addOrEditUserAddress(obj) {
  return await usersService.addOrEditUserAddress(obj);
}


export async function deleteUserAddress(obj) {
    return await usersService.deleteUserAddress(obj);
  }
  

  export async function getUserAddresses(obj) {
    return await usersService.getUserAddresses(obj);
  }
  


  export async function updateUserData(obj) {
    return await usersService.updateUserData(obj);
  }