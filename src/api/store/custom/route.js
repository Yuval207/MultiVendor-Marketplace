import express from "express";
import {
  vendorSignUp,
  updateVendorProfile,
  addProduct,
  editProduct,
  deleteProduct,
  getVendorProducts,
  getVendorOrders,
} from "./controllers/storeController.js";
const router = express.Router();
// Vendor registration route
router.post("/vendors/register", vendorSignUp);
// Vendor profile update route
router.put("/vendors/profile", updateVendorProfile);
// Vendor's product management routes
router.post("/vendors/products", addProduct); // Add a new product
router.put("/vendors/products/:productId", editProduct); // Edit existing product
router.delete("/vendors/products/:productId", deleteProduct); // Delete product
// Get all products for a specific vendor
router.get("/vendors/products", getVendorProducts);
// Get all orders for a specific vendor
router.get("/vendors/orders", getVendorOrders);
export default router;
