import connection from "../config/connection.js";
const sequelize = connection;
// Function to classify user search terms dynamically
 export async function classifySearchTerms(userInput) {
    const words = userInput.trim().toLowerCase().split(' ');

    let colorTerm = '';
    let productTerm = '';
    let categoryTerm = '';

    // Fetch colors and categories from database using raw SQL
    const [colorRows] = await sequelize.query("SELECT color_name FROM product_colors");
    const [categoryRows] = await sequelize.query("SELECT catagory_name FROM product_catagory");

    const colorList = colorRows.map(row => row.color_name.toLowerCase());
    const categoryList = categoryRows.map(row => row.catagory_name.toLowerCase());

    words.forEach(word => {
        console.log("colorList",colorList,"word",word,"\ncategoryList",categoryList,"word",word);
        let flag= false;
        if (colorList.find(color => color.includes(word))) {
            colorTerm = word;
            flag= true
        }  if (categoryList.find(category => category.includes(word))) {
            categoryTerm = categoryList.find(category => category.includes(word));
            flag= true
        }  if(!flag){
            productTerm =word;
        }
        console.log( "colorTerm",colorTerm, "productTerm",productTerm, "categoryTerm",categoryTerm);
    });
    console.log( "final \ncolorTerm",colorTerm, "productTerm",productTerm, "categoryTerm",categoryTerm);
    return { colorTerm, productTerm, categoryTerm };
}

// Search API Route
export async function searchByNameColorCategory({ userInput, page, limit }) {
    try {
        // Validate page and limit
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        if (page < 1 || limit < 1) {
            throw new Error("Invalid page or limit. Both must be positive integers.");
        }

        // Classify search terms
        const { colorTerm, productTerm, categoryTerm } = await classifySearchTerms(userInput || '');

        // Base query
        let query = `
            SELECT 
                MIN(pd.product_detail_id) AS product_detail_id, 
                p.product_name, 
                p.fk_color_id,
                MIN(pd.fk_size_id) AS fk_size_id,
                p.product_id,
                JSON_OBJECT(
                    "price", p.product_price_local,
                    "description", p.description,
                    "moreDetails", p.more_details,
                    "gallery", CAST(pg.gallary AS JSON)
                ) AS product_data
            FROM products p
            INNER JOIN product_catagory pc ON p.fk_category_id = pc.catagory_id
            INNER JOIN products_details pd ON p.product_id = pd.fk_product_id
            INNER JOIN product_gallary pg ON pg.product_img_id = p.fk_gallary_id
            INNER JOIN product_colors col ON p.fk_color_id = col.pk_color_id
            WHERE 
                p.product_name LIKE CONCAT('%', :productTerm, '%') 
                AND col.color_name LIKE CONCAT('%', :colorTerm, '%') 
                AND pc.catagory_name LIKE CONCAT('%', :categoryTerm, '%') 
            GROUP BY 
                p.product_id, 
                p.fk_color_id, 
                p.product_name, 
                p.product_price_local, 
                p.description, 
                p.more_details, 
                pg.gallary
            LIMIT :limit OFFSET :offset;
        `;

        // Add pagination
        const offset = (page - 1) * limit;
        
        // Define replacements
        const replacements = {
            productTerm,
            colorTerm,
            categoryTerm,
            limit,
            offset,
        };

        // Execute query
        const [results] = await sequelize.query(query, { replacements });
        console.log("results:", results);

        // Return results or empty array if nothing is found
        return results.length > 0 ? results : [];
    } catch (error) {
        console.error('Error in searchByNameColorCategory:', error, {
            userInput,
            page,
            limit,
        });
        return [];
    }
}


export async function searchByProductNameV1({ 
    userInput, 
    colorArray = [], 
    gender=null, 
    sortOrder = 'ASC', 
    sortBy = 'product_price_local', 
    page = 1, 
    limit = 10 ,
    priceArray=[]
}) {
    console.log("searchByProductNameV1 ", { userInput,priceArray, colorArray, gender, sortOrder, sortBy, page, limit });

    try {
        // Validate page and limit
        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            throw new Error("Invalid page or limit. Both must be positive integers.");
        }

        // Base query
        let query = `
            SELECT 
                MIN(pd.product_detail_id) AS product_detail_id, 
                p.product_name, 
                p.fk_color_id,
                MIN(pd.fk_size_id) AS fk_size_id,
                p.product_id,
                JSON_OBJECT(
                    "price", p.product_price_local,
                    "description", p.description,
                    "moreDetails", p.more_details,
                    "gallery", CAST(pg.gallary AS JSON)
                ) AS product_data
            FROM products p
            INNER JOIN product_catagory pc ON p.fk_category_id = pc.catagory_id
            INNER JOIN products_details pd ON p.product_id = pd.fk_product_id
            INNER JOIN product_gallary pg ON pg.product_img_id = p.fk_gallary_id
            INNER JOIN product_colors col ON p.fk_color_id = col.pk_color_id
            WHERE 
                MATCH(p.product_name) AGAINST(:userInput IN BOOLEAN MODE)
        `;

        // Add color filter if colorArray is provided and not empty
        if (colorArray?.length > 0) {
            query += ` AND p.fk_color_id IN (:colorArray)`;
        }

        // Add gender filter if gender is provided
        if (gender) {
            query += ` AND p.gender = :gender`;
        }

        if (priceArray?.length > 0) {
            query += ` AND p.product_price_local BETWEEN ${priceArray[0]} AND  ${priceArray[1]}`;
        }

        // Add GROUP BY clause
        query += `
            GROUP BY 
                p.product_id, 
                p.fk_color_id, 
                p.product_name, 
                p.product_price_local, 
                p.description, 
                p.more_details, 
                pg.gallary
        `;

    

        // Add sorting if sortBy and sortOrder are provided
        if (sortBy && sortOrder) {
            query += ` ORDER BY ${sortBy} ${sortOrder}`;
        }

        // Add pagination
        const offset = (page - 1) * limit;
        query += ` LIMIT :limit OFFSET :offset;`;

        // Define replacements
        const replacements = {
            userInput,
            limit,
            offset,
            ...(colorArray?.length > 0 && { colorArray }),
            ...(gender && { gender }),
        };

        // Execute query
        const [results] = await sequelize.query(query, { replacements });
        console.log("results:", results);

        // Return results or empty array if nothing is found
        return results.length > 0 ? results : [];
    } catch (error) {
        console.error('Error in searchByProductNameV1:', {
            error: error.message,
            userInput,
            colorArray,
            gender,
            sortOrder,
            sortBy,
            page,
            limit,
        });
        return [];
    }
}