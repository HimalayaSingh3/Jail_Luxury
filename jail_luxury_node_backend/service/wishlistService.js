import connection from "../config/connection.js";

const sequelize = connection;

export async function addOrEditWishlist({ userId, productsDetailsId, product_id }) {
    try {
        // ✅ Validate input parameters
        if (!userId || !productsDetailsId || !product_id) {
            throw new Error("Missing required parameters: userId, productsDetailsId, or product_id");
        }

        // ✅ Check if the user has an existing wishlist
        const [wishlistResult] = await sequelize.query(
            `SELECT wishlist_id FROM wishlist WHERE fk_user_id = ?`,
            { replacements: [userId] }
        );

        let wishlistId;
        if (wishlistResult.length > 0) {
            wishlistId = wishlistResult[0].wishlist_id; // ✅ Use existing wishlist
        } else {
            // ✅ Create a new wishlist for the user if none exists
            console.log(`✅ proceeding to create wishlist for user ID: ${userId}`);
            const [wishlistInsert] = await sequelize.query(
                `INSERT INTO wishlist (fk_user_id) VALUE (?)`,
                { replacements: [userId] }
            );
            wishlistId = wishlistInsert.insertId; // ✅ Retrieve new wishlist ID
            console.log(`✅ Created new wishlist for user ID: ${userId} (ID: ${wishlistId})`);
        }

        console.log("wishlistId is ",wishlistId)

        // ✅ Check if the product is already in the user's wishlist
        const [existingItem] = await sequelize.query(
            `SELECT wish_item_id FROM wishlist_items 
             WHERE fk_products_details_id = ? 
             AND fk_product_id = ? 
             AND fk_wishlist_id = ?`,
            { replacements: [productsDetailsId, product_id, wishlistId] }
        );
        console.log("existingItem wish_item_id is ",existingItem)
        if (existingItem.length > 0) {
            // ✅ If product exists, DELETE it (Remove from wishlist)
            await deleteFromUserWishlist({ userId, productsDetailsId, product_id });

            console.log(`✅ Product (ID: ${product_id}) removed from wishlist.`);
            return { success: true, action: "removed", message: "Product removed from wishlist." };
        } else {
            // ✅ If product does NOT exist, INSERT it (Add to wishlist)
            console.log("proceeding to add  fk_wishlist_id is ",wishlistId)
            await sequelize.query(
                `INSERT INTO wishlist_items (fk_products_details_id, fk_product_id, fk_wishlist_id, created_at)
                 VALUES (?, ?, ?, NOW())`,
                { replacements: [productsDetailsId, product_id, wishlistId] }
            );

            console.log(`✅ Product (ID: ${product_id}) added to wishlist.`);
            return { success: true, action: "added", message: "Product added to wishlist." };
        }
    } catch (error) {
        console.error("❌ Error updating wishlist:", error.message);
        return { success: false, message: "Failed to update wishlist." };
    }
}

export async function deleteFromUserWishlist({ userId,productsDetailsId, product_id }) {
    try {
        // Validate input parameters
        if (!productsDetailsId || !product_id) {
            throw new Error("Missing required parameters: productsDetailsId or product_id");
        }

        // Execute DELETE query
        const result = await sequelize.query(
            `DELETE FROM wishlist_items 
             WHERE fk_products_details_id = ? 
             AND fk_product_id = ? AND fk_wishlist_id IN (SELECT wishlist_id FROM wishlist WHERE fk_user_id = ?)`,
            { replacements: [productsDetailsId, product_id, userId] }
        );

        // Check if a row was deleted
        if (result[0].affectedRows > 0) {
            console.log(`✅ Product (ID: ${product_id}) successfully removed from wishlist.`);
            return { success: true, message: "Product removed from wishlist." };
        } else {
            console.log(`⚠️ Product (ID: ${product_id}) not found in wishlist.`);
            return { success: false, message: "Product not found in wishlist." };
        }
    } catch (error) {
        console.error("❌ Error deleting from wishlist:", error.message);
        return { success: false, message: "Failed to remove product from wishlist." };
    }
}

export async function fetchUserWishlist({ userId }) {
  try {
    console.log("userId", userId);
    const replacements = [];
    let query = ` SELECT 
   pd.product_detail_id , 
   p.product_name,
   p.fk_color_id,
   pd.fk_size_id,
   p.product_id,

   JSON_OBJECT(
      "price", p.product_price_local,
      "description", p.description,
      "moreDetails", p.more_details,
      "gallery", CAST(pg.gallary AS JSON)
    ) AS product_data

    FROM 
      wishlist_items wi 
    JOIN 
      products p ON p.product_id = wi.fk_product_id
    left JOIN 
      products_details pd ON pd.product_detail_id = wi.fk_products_details_id   
    LEFT JOIN 
      product_gallary pg ON p.fk_gallary_id = pg.product_img_id   
    LEFT JOIN 
      wishlist w ON w.wishlist_id  = wi.fk_wishlist_id
    
    WHERE 1=1
    `;

    if (userId != undefined && userId != null) {
      query += " AND w.fk_user_id = ?";
      replacements.push(userId);
    }

    const [results] = await sequelize.query(query, { replacements });
    console.log(`Fetched ${results}`);
    return results;
  } catch (error) {
    console.error(error);
  }
}

