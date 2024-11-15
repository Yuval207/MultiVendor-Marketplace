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
export const approveVendor = async (req, res) => {
  const vendorId = req.params.id; // Get vendor ID from URL params

  try {
    // Find the vendor by the UUID (no need for parseInt as it's a string)
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId }, // Use vendorId directly as it's a string (UUID)
    });

    if (!vendor) {
      // If the vendor doesn't exist, return a 404
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Update the vendor's approval status
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId }, // Use vendorId directly as it's a string (UUID)
      data: { status: "approved" }, // Assuming you want to update the `status` field to "approved"
    });

    // Respond with the updated vendor information
    res.status(200).json(updatedVendor);
  } catch (error) {
    // Log the error for debugging
    console.error("Error approving vendor:", error);

    // Return a 500 status code if there's an issue
    res.status(500).json({ error: "Error approving vendor" });
  }
};

// Suspend a vendor
export const suspendVendor = async (req, res) => {
  const vendorId = req.params.id; // Get vendor ID from URL params
  try {
    // Find the vendor by the UUID (no need for parseInt as it's a string)
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId }, // Use vendorId directly as it's a string (UUID)
    });

    if (!vendor) {
      // If the vendor doesn't exist, return a 404
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Update the vendor's status to "suspended"
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId }, // Use vendorId directly as it's a string (UUID)
      data: { status: "suspended" }, // Assuming you want to update the `status` field to "suspended"
    });

    // Respond with the updated vendor information
    res.status(200).json(updatedVendor);
  } catch (error) {
    // Log the error for debugging
    console.error("Error suspending vendor:", error);

    // Return a 500 status code if there's an issue
    res.status(500).json({ error: "Error suspending vendor" });
  }
};

// Delete a vendor
export const deleteVendor = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: vendorId },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      yield prisma.vendor.delete({ where: { id: vendorId } }); // Prisma query to delete the vendor
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
        where: { id: vendorId },
      }); // Prisma query to find vendor by ID
      if (!vendor) {
        return res.status(404).send("Vendor not found");
      }
      const updatedVendor = yield prisma.vendor.update({
        where: { id: vendorId },
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

// Create an order for a specific vendor
export const createOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body; // Expect productId and quantity in the request body

    try {
      // Validate that the product exists
      const product = yield prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if there's enough stock
      if (product.stock < quantity) {
        return res.status(400).json({
          error: `Insufficient stock. Only ${product.stock} items available.`,
        });
      }

      // Create a new order
      const newOrder = yield prisma.order.create({
        data: {
          productId,
          quantity,
        },
      });

      // Update the product stock
      yield prisma.product.update({
        where: { id: productId },
        data: {
          stock: product.stock - quantity,
        },
      });

      res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating order" });
    }
  });

// Manage disputes (returns, refunds)
export const manageDispute = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    try {
      const order = yield prisma.order.findUnique({
        where: { id: orderId },
      }); // Prisma query to find order by ID
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const updatedOrder = yield prisma.order.update({
        where: { id: orderId },
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
    const vendorId = req.params.vendorId; // Getting vendorId from the query parameters, if provided

    try {
      let orders;

      if (vendorId) {
        // If vendorId is provided, filter orders by vendorId
        orders = yield prisma.order.findMany({
          where: {
            product: {
              vendorId: vendorId, // Filter orders where the related product has the given vendorId
            },
          },
        });
      } else {
        // Fetch all orders if no vendorId is provided
        orders = yield prisma.order.findMany();
      }

      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }

      res.status(200).json(orders); // Return fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  });
