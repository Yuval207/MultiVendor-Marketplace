var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import prisma from "../../../../../prisma/index.js"; // Import Prisma Client

// Fetch all vendors
export const getAllVendors = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vendors = yield prisma.vendor.findMany(); // Prisma query to fetch all vendors
      res.json(vendors);
    } catch (error) {
      res.status(500).send("Error fetching vendors");
    }
  });

// Approve a vendor
export const approveVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: parseInt(vendorId) },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      const updatedVendor = yield prisma.vendor.update({
        where: { id: parseInt(vendorId) },
        data: { approved: true }, // Update the vendor's approval status
      });
      res.send(`Vendor with ID: ${vendorId} has been approved`);
    } catch (error) {
      res.status(500).send("Error approving vendor");
    }
  });

// Suspend a vendor
export const suspendVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: parseInt(vendorId) },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      const updatedVendor = yield prisma.vendor.update({
        where: { id: parseInt(vendorId) },
        data: { suspended: true }, // Update the vendor's suspension status
      });
      res.send(`Vendor with ID: ${vendorId} has been suspended`);
    } catch (error) {
      res.status(500).send("Error suspending vendor");
    }
  });

// Delete a vendor
export const deleteVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: parseInt(vendorId) },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      yield prisma.vendor.delete({ where: { id: parseInt(vendorId) } }); // Prisma query to delete the vendor
      res.send(`Vendor with ID: ${vendorId} has been deleted`);
    } catch (error) {
      res.status(500).send("Error deleting vendor");
    }
  });

// Update vendor details
export const updateVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    const { businessName, contactInfo, taxDetails } = req.body;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: parseInt(vendorId) },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      const updatedVendor = yield prisma.vendor.update({
        where: { id: parseInt(vendorId) },
        data: {
          businessName: businessName || vendor.businessName,
          contactInfo: contactInfo || vendor.contactInfo,
          taxDetails: taxDetails || vendor.taxDetails,
        },
      }); // Update vendor details
      res.send(`Vendor with ID: ${vendorId} has been updated`);
    } catch (error) {
      res.status(500).send("Error updating vendor details");
    }
  });

// Manage disputes (returns, refunds)
export const manageDispute = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    try {
      const order = yield prisma.order.findUnique({
        where: { id: parseInt(orderId) },
      }); // Prisma query to find order by ID
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const updatedOrder = yield prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "Dispute managed" }, // Update order status for dispute
      });
      res.send(`Dispute for order ID: ${orderId} has been handled`);
    } catch (error) {
      res.status(500).send("Error handling dispute");
    }
  });

// Fetch all orders
export const getAllOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const orders = yield prisma.order.findMany(); // Prisma query to fetch all orders
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  });
