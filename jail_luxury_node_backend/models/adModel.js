import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const Ad = sequelize.define("Ad", {
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

export default Ad;
