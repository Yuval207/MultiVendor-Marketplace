import express from "express";
import {
  getAllVendors,
  approveVendor,
  suspendVendor,
  deleteVendor,
  updateVendor,
  getAllOrders,
  manageDispute,
} from "./controllers/adminController.js";
const router = express.Router();
// Route to get a list of all vendors
router.get("/vendors", getAllVendors);
// Route to approve a vendor (admin-only)
router.post("/vendors/:id/approve", approveVendor);
// Route to suspend a vendor (admin-only)
router.post("/vendors/:id/suspend", suspendVendor);
// Route to delete a vendor (admin-only)
router.delete("/vendors/:id", deleteVendor);
// Route to update vendor information (admin-only)
router.put("/vendors/:id", updateVendor);
// Route to view all orders for dispute and refund management
router.get("/orders", getAllOrders);
// Route to manage disputes (returns, refunds) - admin-only
router.post("/disputes/:orderId", manageDispute);
export default router;
