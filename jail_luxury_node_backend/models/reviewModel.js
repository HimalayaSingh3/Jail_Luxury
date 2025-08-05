import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const Review = sequelize.define("Review", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Review;
