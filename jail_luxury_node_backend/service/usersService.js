import connection from "../config/connection.js";
import Addresses from "../models/Addresses.js";
import User from "../models/User.js";

const sequelize = connection;

export async function addOrEditUserAddress({
    userId,
    addressLine1,
    addressLine2="",
    state,
    country,
    pincode,
    defaultAddress = 0,
    addressId = null,
    addressName = "",
    deliverTo=null,
    phoneNumber=null
  }) {
    try {
        console.log("mandatory params ",deliverTo,phoneNumber)
      // ✅ Validate input parameters
      if (!userId || !addressLine1 || !state || !country || !pincode|| !deliverTo || !phoneNumber) {
        throw new Error("Missing required parameters: userId, addressLine1, state, country, pincode");
      }
  
      // ✅ Get user_address entry (FIXED: Properly handle query result)
      const [userAddressRows] = await sequelize.query(
        `SELECT user_address_id FROM user_address WHERE fk_user_id = ?`,
        { replacements: [userId], type: sequelize.QueryTypes.SELECT }
      );
      
      let userAddressId;
      if (userAddressRows?.user_address_id) {
        userAddressId = userAddressRows?.user_address_id;
      } else {
        // ✅ Create new user_address entry
        const [addressInsert] = await sequelize.query(
          `INSERT INTO user_address (fk_user_id) VALUES (?)`,
          { replacements: [userId] }
        );
        userAddressId = addressInsert.insertId;
        console.log(`✅ Created user_address entry (ID: ${userAddressId})`);
      }
  
      // ✅ Check for existing address (optimized query)
      const existingAddress = await Addresses.findOne({
        where: {
          address_id :addressId,
          fk_user_adderess_id: userAddressId
        }
      });

      if (defaultAddress == 1) {
        try {
            await Addresses.update(
                { is_default: 0 },  // Set is_default to 1
                { where: { is_default: 1 } }  // Update records where is_default is 0
            );
        } catch (error) {
            console.log("error", error);
        }
    }
  
      if (existingAddress) {
        // ✅ Update existing address
        await existingAddress.update({ 
            adress_line1: addressLine1,
            adress_line2: addressLine2,
            state,
            country,
            pincode,
            is_default: defaultAddress,
            fk_user_adderess_id: userAddressId,
            address_name:addressName,
            deliver_to:deliverTo,
            phone_number:phoneNumber });
        return { 
          success: true, 
          action: "updated", 
          message: "Address updated successfully",
          addressId: existingAddress.address_id,
         
        };
      }
  
      // ✅ Create new address
      const newAddress = await Addresses.create({
        adress_line1: addressLine1,
        adress_line2: addressLine2,
        state,
        country,
        pincode,
        is_default: defaultAddress,
        fk_user_adderess_id: userAddressId,
        address_name:addressName,
        deliver_to:deliverTo,
        phone_number:phoneNumber 
      });
  
      return { 
        success: true, 
        action: "added", 
        message: "Address added successfully",
        addressId: newAddress.address_id 
      };
  
    } catch (error) {
      console.error("❌ Address update error:", error.message);
      return { 
        success: false, 
        message: `Address operation failed: ${error.message}` 
      };
    }
  }


  export async function deleteUserAddress({ userId, addressId = null }) {
    try {
      // ✅ Validate input parameters
      if (!addressId || !userId) {
        throw new Error("Missing required parameters: addressId and userId");
      }
  
      // ✅ Get user_address entry
      const [userAddressRows] = await sequelize.query(
        `SELECT user_address_id FROM user_address WHERE fk_user_id = ?`,
        { replacements: [userId], type: sequelize.QueryTypes.SELECT }
      );
  
      // ✅ Check if user_address exists
      if (!userAddressRows?.user_address_id) {
        throw new Error("User address not found for the given userId");
      }
  
      const userAddressId = userAddressRows?.user_address_id;
  
      // ✅ Execute DELETE query
      const [result] = await sequelize.query(
        `DELETE FROM addresses 
         WHERE address_id = ? 
         AND fk_user_adderess_id = ?`,
        { replacements: [addressId, userAddressId] }
      );
  
      // ✅ Check if a row was deleted
      if (result.affectedRows > 0) {
        console.log(`✅ Address (ID: ${addressId}) successfully deleted.`);
        return { success: true, message: "Address deleted successfully." };
      } else {
        console.log(`⚠️ Address (ID: ${addressId}) not found.`);
        return { success: false, message: "Address not found." };
      }
    } catch (error) {
      console.error("❌ Error deleting address:", error.message);
      return {
        success: false,
        message: `Failed to delete address: ${error.message}`,
      };
    }
  }


export async function getUserAddresses({ userId }) {
  try {


          // ✅ Validate input parameters
          if (!userId) {
            throw new Error("Missing required parameters: addressId and userId");
          }
      
          // ✅ Get user_address entry
          const [userAddressRows] = await sequelize.query(
            `SELECT user_address_id FROM user_address WHERE fk_user_id = ?`,
            { replacements: [userId], type: sequelize.QueryTypes.SELECT }
          );
      
          // ✅ Check if user_address exists
          if (!userAddressRows?.user_address_id) {
            throw new Error("User address not found for the given userId");
          }
      
          const userAddressId = userAddressRows?.user_address_id;
  
          
    console.log("userId", userId);
    const existingAddressesResult = await Addresses.findAll({
        where: {
          fk_user_adderess_id: userAddressId
        }
      });

    console.log(`Fetched ${existingAddressesResult}`);
    return existingAddressesResult;
  } catch (error) {
    console.error(error);
  }
}

//uodateUserData

export async function updateUserData({
    userId,
    phone = null,
    first_name = null,
    last_name = null,
  }) {
    try {
      // ✅ Validate input parameters
      if (!userId) {
        throw new Error("Missing required parameters: userId");
      }
  
      // Dynamically build the update object
      const updateData = {};
      console.log("updateUserData", phone, first_name, last_name);
  
      if (phone !== null) {
        // Check if the phone number already exists for another user
        const existingUser = await User.findOne({
          where: { phone },
        });
  
        if (existingUser && existingUser.user_id !== userId) {
          throw new Error("Phone number is already in use by another user.");
        }
  
        updateData.phone = phone;
      }
  
      if (first_name !== null) updateData.first_name = first_name;
      if (last_name !== null) updateData.last_name = last_name;
  
      if (Object.keys(updateData).length === 0) {
        throw new Error("No data provided to update.");
      }
  
      await User.update(updateData, {
        where: { user_id: userId },
      });
  
      return {
        success: true,
        action: "update",
        message: "User Data Updated",
      };
    } catch (error) {
      console.error("❌ User update error:", error);
      return {
        success: false,
        message: `User operation failed: ${error.message}`,
      };
    }
  }