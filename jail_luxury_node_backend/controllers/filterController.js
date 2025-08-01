
import * as filterService from "../service/filterService.js";

export async function getSizeFilterByCategory(categoryName) {
  return await filterService.getSizeFilterByCategory(categoryName);
}

export async function getAllColors() {
  return await filterService.getAllColors();
}


