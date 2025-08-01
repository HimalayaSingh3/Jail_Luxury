import * as paymentsService from "../service/paymentsService.js";

export async function checkout(obj) {
    console.log("checkout obj",obj)
    const checkoutData = await paymentsService.itemsCheckout(obj); 
    console.log("checkoutData",checkoutData)
    return checkoutData
}

export async function verification(obj) {
    console.log("verification obj",obj)
  return await paymentsService.paymentVerification(obj);
}



