import * as cartService from "../service/cartService.js";

export async function addOrEditCart (FilterObj){
    console.log("FilterObj",FilterObj)
 return await  cartService.addOrEditCart(FilterObj);
}

export async function fetchUserCart(FilterObj) {
    try {
      // Fetch user cart data
      const cartResult = await cartService.fetchUserCart(FilterObj);
  
      // Calculate subtotal using reduce
      const subTotal = cartResult.reduce((accumulator, item) => {
        const itemPrice = item?.cart_details?.itemPrice || 0;
        const quantity = item?.cart_details?.quantity || 0;
        return accumulator + itemPrice * quantity;
      }, 0);
  
      // Return structured response
      return {
        cartResult,
        subTotal,
      };
    } catch (error) {
      console.error("Error fetching user cart:", error);
      throw new Error("Failed to fetch user cart");
    }
  }
  
export async function  deleteFromUserCart(FilterObj){
    return await  cartService.deleteFromUserCart(FilterObj);
}

