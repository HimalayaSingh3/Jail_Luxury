import { DataTypes, Model } from "sequelize";
import connection from "../config/connection.js";

const sequelize = connection;

class User extends Model {}

 User.init(
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Nullable for OAuth-based users
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true, // Ensure phone numbers are unique
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW, // Automatically update timestamp
    },
    refreshToken: {
      type: DataTypes.TEXT, // Store the refresh token for OAuth
      allowNull: true,
    },
    is_logged_in:{
      type: DataTypes.TINYINT, // Store the refresh token for OAuth
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false, // Disable Sequelize's automatic timestamps
    modelName: "User",
    tableName: "users", // Explicitly set table name to match the database
  }
);



export default User;