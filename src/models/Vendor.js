import sequelize from "../config/database.js"; // Adjust the path as necessary
import { Model, DataTypes, Sequelize } from "sequelize";

class Vendor extends Model {}
Vendor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value for approved flag
    },
    suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value for suspended flag
    },
  },
  {
    sequelize,
    tableName: "vendors",
  }
);
export default Vendor;
