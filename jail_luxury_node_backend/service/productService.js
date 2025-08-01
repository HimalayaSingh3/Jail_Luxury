import connection from "../config/connection.js";
const sequelize = connection;

// Allowed columns for filtering & sorting to prevent SQL injection
const allowedProductDetailsFilters = ["in_stock"];

const allowedProductFilters = [
  "gender",
  "fk_category_id",
  "sizes",
  "priceStart",
  "priceEnd",
  "colors",
];

const allowedSortColumns = [
  "product_name",
  "product_price_local"
];

export async function findAllProductsByCategoryId({
  productDetailsFilters = {},
  productFilters = {},
  sortBy = "updated_at",
  sortOrder = "DESC",
  page = 1,
  limit = 12,
  defaultFlag = 0,
  userId = null, // ✅ Added userId to check wishlist status
  isFilterEnabled = false
}) {
  try {
    console.log(`Fetching products with filters:
      productDetailsFilters: ${JSON.stringify(productDetailsFilters)},
      productFilters: ${JSON.stringify(productFilters)}
    `);

    // ✅ Define base query with specific columns (avoid SELECT *)
    let query = `
    SELECT 
    JSON_OBJECT(
      'product_id', p.product_id,
      'product_price_inr', p.product_price_local,
      'product_name', p.product_name,
      'gender', p.gender,
      'is_enabled', p.is_enabled,
      'fk_category_id', p.fk_category_id,
      'description', p.description,
      'products_details_id', pd.product_detail_id,
      'inStock',pd.in_stock,
      'is_featured',pd.is_featured,
      'is_default_product',pd.is_default_product,
      'is_wishlisted', 
        IF(EXISTS (
            SELECT 1 FROM wishlist_items wi 
            JOIN wishlist w ON wi.fk_wishlist_id = w.wishlist_id 
            WHERE wi.fk_products_details_id = pd.product_detail_id 
            AND wi.fk_product_id = p.product_id
            AND w.fk_user_id = ?
        ), TRUE, FALSE)
       ) AS product_details, 
    
        -- ✅ Select gallery fields
        JSON_OBJECT(
          'gallery_id', g.product_img_id,
          'gallery', g.product_gallrey
        ) AS gallery_details,
        
        -- ✅ Select color fields
        JSON_OBJECT(
          'color_id', c.pk_color_id,
          'color_name', c.color_name,
          'color_hex', c.color_hex
        ) AS color_details,
        
        -- ✅ Select product sizes
        JSON_OBJECT(
          'size_name', s.size_name,
          'pkSizeId',s.pk_size_id
        ) AS size_details

        FROM 
          products_details pd
        JOIN 
          products p ON pd.fk_product_id = p.product_id
        LEFT JOIN 
          sizes s ON pd.fk_size_id = s.pk_size_id  
        LEFT JOIN 
          product_gallary g ON pd.fk_gallery_id = g.product_img_id
        LEFT JOIN 
          product_colors c ON pd.fk_color_id = c.pk_color_id   
        WHERE 1=1
        `;

    // ✅ Query Parameters (First placeholder is for wishlist check)
    const replacements = [userId];

    // ✅ Apply Dynamic productDetailsFilters (Filtering on products_details)
    Object.keys(productDetailsFilters).forEach((key) => {
      if (allowedProductDetailsFilters.includes(key)) {
        query += ` AND pd.${key} = ?`;
        replacements.push(productDetailsFilters[key]);
      }
    });

    // ✅ Apply Dynamic productFilters (Filtering on products)
    Object.keys(productFilters).forEach((key) => {
      if (
        allowedProductFilters.includes(key) &&
        productFilters[key] != [] &&
        productFilters[key] != "" &&
        productFilters[key] != null &&
        productFilters[key] != undefined
      ) {
        console.log(
          `Applying filter -> Key: ${key}, Value: ${productFilters[key]}`
        );

        // ✅ Handle price range filtering
        if (key === "priceStart" && productFilters.priceEnd) {
          query += ` AND p.product_price_local BETWEEN ? AND ?`;
          replacements.push(productFilters.priceStart, productFilters.priceEnd);
        }
        // ✅ Handle size filtering properly
        else if (key === "sizes") {
          console.log("sizes arr ", productFilters[key]);
          query += ` AND pd.fk_size_id IN (?)`;
          replacements.push(productFilters[key]);
        } else if (key === "colors") {
          console.log("colors arr ", productFilters[key]);
          query += ` AND pd.fk_color_id IN (?)`;
          replacements.push(productFilters[key]);
        }
        // ✅ Handle other general filters
        else if (key !== "priceStart" && key !== "priceEnd") {
          query += ` AND p.${key} = ?`;
          replacements.push(productFilters[key]);
        }
      }
    });

    // ✅ Fix: Correct condition for defaultFlag
    console.log("isFilterEnabled",isFilterEnabled);

    // ✅ SOFT delete IMPL
    query += " AND  pd.is_deleted = 0";

    query += " ORDER BY pd.in_stock DESC , ";

    // ✅ Apply Sorting (Only if it's a valid column)
    if (allowedSortColumns.includes(sortBy)) {
      console.log("sortBy", sortBy);
      query += ` p.${sortBy} ${
        sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC"
      } `;
    } else {
      query += " pd.created_at DESC "; // Default sorting
    }

    // ✅ Optimize Pagination with Index-Based Offset
    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    replacements.push(parseInt(limit), parseInt(offset));

    // ✅ Log final query before execution
    console.log(`Final Query: ${query}`);
    console.log(`Replacements: ${JSON.stringify(replacements)}`);

    // ✅ Execute Query
    const [results] = await sequelize.query(query, { replacements });

    console.log(`Fetched ${results.length} products with applied filters.`);
    if (defaultFlag === 1) {
      return results?.filter(item=>item?.product_details?.is_default_product == 1)
    }
    return results;
  } catch (error) {
    console.error("Error in findAllProductsByCategoryId:", error.message);
    throw new Error("Failed to fetch products. Please try again later.");
  }
}

export async function findProductsByPdId({ productName, pid, pdid, userId }) {
  try {
    const replacements = [userId,userId];

    let query = `
      SELECT 
        JSON_OBJECT(
          'productName', p.product_name,
          'productPrice', p.product_price_local,
          'productId', p.product_id,
          'productDetailsId', pd.product_detail_id,
          'description', p.description,
          'moreDetails', p.more_details,
          'is_wishlisted', 
            IF(EXISTS (
              SELECT 1 FROM wishlist_items wi 
              JOIN wishlist w ON wi.fk_wishlist_id = w.wishlist_id 
              WHERE wi.fk_products_details_id = pd.product_detail_id 
              AND wi.fk_product_id = p.product_id
              AND w.fk_user_id = ?
            ), TRUE, FALSE),
           'is_carted', 
            IF(EXISTS (
              SELECT 1 FROM cart_items ci 
              JOIN carts c ON ci.fk_cart_id = c.cart_id 
              WHERE ci.fk_product_details_id = pd.product_detail_id 
              AND ci.fk_product_id = p.product_id
              AND c.fk_user_id = ?
            ), TRUE, FALSE),
          'gallery', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'productImgId', pg.product_img_id,
                  'urls', CAST(pg.gallary AS JSON)
                )
              )
              FROM product_gallary pg
              WHERE pg.product_img_id = p.fk_gallary_id
            ),
          'allColorProducts', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'productId', p2.product_id,
                'colorId', pc2.pk_color_id,
                'colorHex', pc2.color_hex
              )
            )
            FROM products p2
            INNER JOIN product_colors pc2 ON p2.fk_color_id = pc2.pk_color_id
            WHERE p2.product_name = p.product_name
          ),
          'sizesPerProductId', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'productId', p3.product_id,
                'productDetailId', pd3.product_detail_id,
                'sizeId', s.pk_size_id,
                'sizeName', s.size_name,
                'inStock', pd3.in_stock
              )
            )
            FROM products p3
            INNER JOIN products_details pd3 ON p3.product_id = pd3.fk_product_id
            INNER JOIN sizes s ON pd3.fk_size_id = s.pk_size_id
            WHERE p3.product_name = p.product_name 
              AND pd3.fk_product_id = p.product_id
          )
        ) AS product_info
      FROM 
        products p
      INNER JOIN 
        products_details pd ON p.product_id = pd.fk_product_id
      WHERE 1=1
    `;

    if (productName != "undefined") {
      query += " AND p.product_name LIKE ?";
      replacements.push(`%${productName}%`);
    }

    if (pid != "undefined" && pid !== null) {
      query += " AND p.product_id = ?";
      replacements.push(pid);
    }

    if (pdid != "undefined" && pdid !== null) {
      query += " AND pd.product_detail_id = ?";
      replacements.push(pdid);
    }

    const [results] = await sequelize.query(query, { replacements });

    return results[0] || {};
  } catch (error) {
    console.error("Error fetching products:", error);
    return {};
  }
}



export async function findProductsByCategoryName({
  categoryName,
  colorFilter = null,
  sizeFilter = null,
  priceArray=null,
  gender = null,
  sortBy = "latest_updated",
  sortOrder = "DESC",
  page = 1,
  limit = 12,
  userId = null,
}) {
  try {
    console.log(`Fetching products for category: ${categoryName} for userId`, userId);

    // Base query
    let query = `
      SELECT 
        MIN(pd.product_detail_id) AS product_detail_id, 
        p.product_name, 
        p.fk_color_id,
        MIN(pd.fk_size_id) AS fk_size_id,
        p.product_id,
        MAX(pd.updated_at) AS latest_updated,
        MAX(pd.created_at) AS latest_created,
        p.product_price_local,
        JSON_OBJECT(
            "price", p.product_price_local,
            "description", p.description,
            "moreDetails", p.more_details,
            "gallery", CAST(pg.gallary AS JSON),
            'isWishlisted', 
            IF(EXISTS (
                SELECT 1 
                FROM wishlist_items wi 
                JOIN wishlist w ON wi.fk_wishlist_id = w.wishlist_id 
                WHERE wi.fk_products_details_id = (
                    SELECT MIN(pd2.product_detail_id)
                    FROM products_details pd2
                    WHERE pd2.fk_product_id = p.product_id
                )
                AND wi.fk_product_id = p.product_id
                AND w.fk_user_id = :userId
            ), TRUE, FALSE)
        ) AS product_data
      FROM products p
      INNER JOIN product_catagory pc 
          ON p.fk_category_id = pc.catagory_id
      INNER JOIN products_details pd 
          ON p.product_id = pd.fk_product_id
      INNER JOIN product_gallary pg 
          ON pg.product_img_id = p.fk_gallary_id
      INNER JOIN product_colors col 
          ON p.fk_color_id = col.pk_color_id
    `;

    const whereClauses = [];
    const replacements = {
      categoryName: categoryName,
      userId: userId || null, // Add userId to replacements
    };

    // Category filter (required)
    whereClauses.push(`pc.catagory_name = :categoryName`);

    // Color filter
    if (colorFilter) {
      whereClauses.push(`col.pk_color_id IN (:colorFilter)`);
      replacements.colorFilter = colorFilter;
    }

    // Size filter
    if (sizeFilter !== null && sizeFilter !== undefined) {
      whereClauses.push(`pd.fk_size_id IN (:sizeFilter)`);
      replacements.sizeFilter = sizeFilter;
    }
    //price filter
    if (priceArray != null && priceArray !== undefined && priceArray.length >= 2) {
      whereClauses.push(`p.product_price_local >= :priceStart AND p.product_price_local <= :priceEnd`);
      replacements.priceStart = priceArray[0];
      replacements.priceEnd = priceArray[1];
    }

    // Gender filter
    if (gender) {
      whereClauses.push(`p.gender = :gender`);
      replacements.gender = gender;
    }

    // Add WHERE clause if there are conditions
    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    // Group by
    query += `
      GROUP BY 
        p.product_id, 
        p.product_name, 
        p.fk_color_id, 
        p.product_price_local, 
        pg.gallary,
        p.description,
        p.more_details
    `;

    // Sorting
    const sortFieldMap = {
      'updated_at': 'latest_updated',
      'created_at': 'latest_created',
      'product_price_local': 'product_price_local'
    };
    const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const sortField = sortFieldMap[sortBy] || 'latest_updated';
    query += ` ORDER BY ${sortField} ${validSortOrder}`;

    // Pagination
    const offset = (page - 1) * limit;
    replacements.limit = parseInt(limit);
    replacements.offset = parseInt(offset);
    query += ` LIMIT :limit OFFSET :offset`;

    console.log("Final Query:", query);
    console.log("Replacements:", replacements);

    const [results] = await sequelize.query(query, { replacements});
    console.log(`Fetched ${results.length} products`);
    return results;
  } catch (error) {
    console.error("Error in findProductsByCategoryName:", error.message);
    throw new Error("Failed to fetch products. Please try again later.");
  }
}



export async function findAllAvalibaleColorsByPidAndSizeId({ productId, fkSizeId }) {
  try {
    const replacements = [];
    let query = `
      SELECT DISTINCT fk_color_id 
      FROM products_details pd 
      WHERE pd.in_stock = 1 
        AND pd.quantity > 0 
    `;

    if (productId != null) { // ✅ Covers both undefined & null
      query += " AND pd.fk_product_id = ? ";
      replacements.push(productId);
    }

    if (fkSizeId != null) {
      query += " AND pd.fk_size_id = ? ";
      replacements.push(fkSizeId);
    }

    console.log("Executing Query:", query, "Replacements:", replacements);

    const [results] = await sequelize.query(query, { replacements });
    
    return results;
  } catch (error) {
    console.error("❌ Error in findAllAvailableColorsByPidAndSizeId:", error);
    throw error; // ✅ Ensures error is propagated for proper handling
  }
}


export async function findAllAvalibaleSizesByPidAndColorId({ productId, fkColorId }) {
  try {
    const replacements = [];
    let query = `
      SELECT DISTINCT fk_size_id 
      FROM products_details pd 
      WHERE pd.quantity > 0 
    `;

    if (productId != null) { // ✅ More concise check
      query += " AND pd.fk_product_id = ? ";
      replacements.push(productId);
    }

    if (fkColorId != null) {
      query += " AND pd.fk_color_id = ? ";
      replacements.push(fkColorId);
    }

    console.log("Executing Query:", query, "Replacements:", replacements);

    const [results] = await sequelize.query(query, { replacements });

    console.log("results",results)

    return results;
  } catch (error) {
    console.error("❌ Error in findAllAvailableSizesByPidAndColorId:", error);
    throw error; // ✅ Ensures proper error handling
  }
}

export async function findBestSellerByGender({ gender, userId }) {
  try {
    const replacements = { userId };
    let query = `
      SELECT 
        ANY_VALUE(pd.product_detail_id) AS product_detail_id,
        ANY_VALUE(p.product_name) AS product_name,
        ANY_VALUE(p.fk_color_id) AS fk_color_id,
        ANY_VALUE(pd.fk_size_id) AS fk_size_id,
        ANY_VALUE(p.gender) AS gender,

        p.product_id,
        ANY_VALUE(pd.updated_at) AS latest_updated,
        ANY_VALUE(pd.created_at) AS latest_created,
        ANY_VALUE(p.product_price_local) AS product_price_local,
        JSON_OBJECT(
          'price', ANY_VALUE(p.product_price_local),
          'description', ANY_VALUE(p.description),
          'moreDetails', ANY_VALUE(p.more_details),
          'gallery', CAST(ANY_VALUE(pg.gallary) AS JSON),
          'isWishlisted', ANY_VALUE(EXISTS (
            SELECT 1 
            FROM wishlist_items wi
            JOIN wishlist w ON wi.fk_wishlist_id = w.wishlist_id
            WHERE wi.fk_products_details_id = pd.product_detail_id
              AND wi.fk_product_id = p.product_id
              AND w.fk_user_id = :userId
          ))
        ) AS product_data
      FROM products p
      INNER JOIN products_details pd 
        ON p.product_id = pd.fk_product_id
      INNER JOIN product_gallary pg 
        ON pg.product_img_id = p.fk_gallary_id
      WHERE p.is_bestseller = 1
    `;

    if (gender !== null) {
      query += " AND p.gender = :gender";
      replacements.gender = gender;
    }

    query += `
      GROUP BY p.product_id
      ORDER BY ANY_VALUE(pd.created_at) DESC
    `;

    const [results] = await sequelize.query(query, { 
      replacements
    });


    console.log("results",results)
    return results;
  } catch (error) {
    console.error("❌ Error in findBestSellerByGender:", error);
    throw error;
  }
}
