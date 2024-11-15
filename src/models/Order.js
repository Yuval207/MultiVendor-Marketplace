import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Adjust the path as necessary
class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending", // Default status for an order
    },
    dispute: {
      type: DataTypes.JSON, // Use JSON if dispute data is structured, or STRING for text
      allowNull: true, // Allow null in case there’s no dispute
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);
export default Order;
