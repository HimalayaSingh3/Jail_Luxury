import connection from "../config/connection.js";
const sequelize = connection;



export async function findCategoryById(categoryId) {
    try {
      console.log("in itemsService with categoryId:", categoryId);
  
      // Execute the query
      const [results, metadata] = await sequelize.query(
        "SELECT * FROM product_catagory WHERE catagory_id = ?", // Use placeholders
        {
          replacements: [categoryId],
        }
      );
  
  
      // Return results
      return results;
    } catch (error) {
      console.error("Error in findCategoryById:", error.message);
      throw new Error("Failed to fetch category. Please try again later."); // Return user-friendly error
    }
  }


export async function getAllCategories() {
    try {
      const [results] = await sequelize.query(
        "SELECT * FROM product_catagory WHERE id_enabled = :isEnabled",
        {
          replacements: { isEnabled: 1 }
        }
      );
  console.log("results",results)
      return results; // Return the fetched results
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw error; // Rethrow the error for the caller to handle
    }
  }
