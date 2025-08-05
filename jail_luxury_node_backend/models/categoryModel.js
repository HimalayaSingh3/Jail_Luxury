import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('name', value.trim()); 
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

export default Category;
