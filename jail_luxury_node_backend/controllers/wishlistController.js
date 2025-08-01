
import * as wishlistService from "../service/wishlistService.js";

export async function addOrEditWishlist (FilterObj){
    console.log("FilterObj",FilterObj)
 return await  wishlistService.addOrEditWishlist(FilterObj);
}

export async function fetchUserWishlist (FilterObj){
    return await  wishlistService.fetchUserWishlist(FilterObj);
   }
export async function  deleteFromUserWishlist(FilterObj){
    return await  wishlistService.deleteFromUserWishlist(FilterObj);
}

