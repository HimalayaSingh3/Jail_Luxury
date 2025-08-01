import * as itemsService from "../service/itemsService.js";

export async function findCatagoryById (catagoryId){
 return await  itemsService.findCatagoryById(catagoryId);
}

export async function getAllCategories (){
     return await itemsService.getAllCategories();
}


