import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js"; // Adjust the path as necessary

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    vendorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "vendors", // The referenced model name
        key: "id", // The key in the referenced model
      },
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
