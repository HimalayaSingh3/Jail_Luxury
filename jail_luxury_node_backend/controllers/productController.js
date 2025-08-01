import * as productService from "../service/productService.js";
export async function findAllProductsByCatagoryId(FilterObj) {
  return await productService.findAllProductsByCatagoryId(FilterObj);
}

export async function findProductsByPdId({  productName,
  pid,
  pdid,
  userId= null}) {
  return await productService.findProductsByPdId({  productName,
    pid,
    pdid,
    userId});
}

export async function findProductsByCategoryName({
    categoryName,
    colorFilter = null,
    sizeFilter = null,
    priceArray=null,
    sortBy = "updated_at",
    sortOrder = "DESC",
    page = null,
    limit = null,
    userId = null,
    gender = null
  }) {
    return await productService.findProductsByCategoryName({
      categoryName,
      colorFilter: colorFilter || null,
      sizeFilter: sizeFilter || null,
      priceArray:priceArray||null,
      sortBy: sortBy || null,
      sortOrder: sortOrder || null,
      page: page || null,
      limit: limit || null,
      userId: userId || null,
      gender: gender || null
    });
  }
  

export async function findAllAvalibaleSizesByPidAndColorId({FilterObj}) {
  return await productService.findAllAvalibaleSizesByPidAndColorId(FilterObj);
}

export async function findBestSellerByGender({gender,userId=null}) {
  return await productService.findBestSellerByGender({gender,userId});
}

export async function findAllAvalibaleColorsByPidAndSizeId(FilterObj) {
  return await productService.findAllAvalibaleColorsByPidAndSizeId(FilterObj);
}
