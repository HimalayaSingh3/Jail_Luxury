import { DataTypes, Model } from "sequelize";
import connection from "../config/connection.js";

const sequelize = connection;

class Addresses extends Model {}
Addresses.init(
  {
    address_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    adress_line1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adress_line2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_default: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    fk_user_adderess_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    deliver_to: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false, // Disable Sequelize's automatic timestamps
    modelName: "Addresses",
    tableName: "addresses", // Explicitly set table name to match the database
  }
);

export default Addresses;
