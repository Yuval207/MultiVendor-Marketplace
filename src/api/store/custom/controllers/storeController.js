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
import prisma from "../../../../../prisma/index.js";

// Register a new vendor
export const vendorSignUp = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, contactInfo, taxDetails } = req.body;

    // Validate required fields
    if (!businessName || !contactInfo || !taxDetails) {
      return res.status(400).json({
        error:
          "All fields (businessName, contactInfo, taxDetails) are required.",
      });
    }

    try {
      // Optionally check if the vendor already exists (based on contactInfo or businessName)
      const existingVendor = yield prisma.vendor.findFirst({
        where: { contactInfo }, // Check if the contactInfo already exists
      });

      if (existingVendor) {
        return res
          .status(400)
          .json({ error: "Vendor with this contact info already exists." });
      }

      // Create the new vendor
      const newVendor = yield prisma.vendor.create({
        data: {
          businessName,
          contactInfo,
          taxDetails,
          status: "pending", // Default status for new vendor
        },
      });

      // Send the response with the newly created vendor
      return res.status(201).json(newVendor);
    } catch (error) {
      // Log the error for debugging
      console.error("Error registering new vendor:", error);
      return res.status(500).json({
        error: "Error registering new vendor",
        details: error.message,
      });
    }
  });

// Update vendor profile
export const updateVendorProfile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id; // Get the vendorId from the URL parameter
    const { businessName, contactInfo, taxDetails } = req.body;

    // Validation: At least one field should be present in the request body
    if (!businessName && !contactInfo && !taxDetails) {
      return res.status(400).json({
        error:
          "At least one field (businessName, contactInfo, or taxDetails) is required to update.",
      });
    }

    try {
      // Check if the vendor exists
      const vendor = yield prisma.vendor.findUnique({
        where: { id: vendorId }, // Use the vendorId directly (no parsing needed)
      });

      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      // Update the vendor's profile with the provided data
      const updatedVendor = yield prisma.vendor.update({
        where: { id: vendorId }, // Use vendorId directly
        data: {
          businessName: businessName || vendor.businessName,
          contactInfo: contactInfo || vendor.contactInfo,
          taxDetails: taxDetails || vendor.taxDetails,
        },
      });

      // Send the updated vendor data in the response
      return res.json(updatedVendor);
    } catch (error) {
      console.error("Error updating vendor profile:", error); // Log the error for debugging
      return res.status(500).json({
        error: "Error updating vendor profile",
        details: error.message,
      });
    }
  });

// Add a new product
// Add a new product
export const addProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.body.vendorId; // Vendor ID from the URL parameter
    const { name, description, price, stock } = req.body;

    // Validate request body
    if (!name || !description || price === undefined || stock === undefined) {
      return res
        .status(400)
        .send("Missing required fields: name, description, price, or stock.");
    }

    try {
      // Create a new product with the provided details
      const newProduct = yield prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          vendorId, // Vendor ID (string UUID) from the URL
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error adding new product:", error); // Log the error for debugging
      res.status(500).send("Error adding new product");
    }
  });

// Edit an existing product
export const editProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId; // Product ID from the URL parameter
    const { name, description, price, stock } = req.body;

    // Validate request body
    if (!name && !description && price === undefined && stock === undefined) {
      return res
        .status(400)
        .send(
          "At least one field (name, description, price, stock) must be provided to update."
        );
    }

    try {
      // Find the product by its ID
      const product = yield prisma.product.findUnique({
        where: { id: productId }, // Product ID is a UUID (string), no parsing needed
      });

      if (!product) {
        return res.status(404).send("Product not found");
      }

      // Update the product with the new values (or keep existing values)
      const updatedProduct = yield prisma.product.update({
        where: { id: productId },
        data: {
          name: name || product.name,
          description: description || product.description,
          price: price !== undefined ? price : product.price,
          stock: stock !== undefined ? stock : product.stock,
        },
      });

      res.json(updatedProduct);
    } catch (error) {
      console.error("Error editing product:", error); // Log the error for debugging
      res.status(500).send("Error editing product");
    }
  });

// Delete a product
export const deleteProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId; // Product ID from the URL parameter

    try {
      // Find the product by its ID
      const product = yield prisma.product.findUnique({
        where: { id: productId }, // Product ID is a UUID (string), no parsing needed
      });

      if (!product) {
        return res.status(404).send("Product not found");
      }

      // Delete the product
      yield prisma.product.delete({
        where: { id: productId },
      });

      res.send(`Product with ID: ${productId} has been deleted`);
    } catch (error) {
      console.error("Error deleting product:", error); // Log the error for debugging
      res.status(500).send("Error deleting product");
    }
  });

// Get all products for a specific vendor
export const getVendorProducts = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId; // Vendor ID from the URL parameter

    try {
      // Fetch all products associated with the vendor
      const products = yield prisma.product.findMany({
        where: { vendorId }, // Vendor ID (string UUID) from the URL
      });

      res.json(products);
    } catch (error) {
      console.error("Error fetching products for vendor:", error); // Log the error for debugging
      res.status(500).send("Error fetching products for vendor");
    }
  });

// Get all orders for a specific vendor
export const getVendorOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId; // Vendor ID from the URL parameter

    try {
      // Fetch all orders related to the vendor
      const orders = yield prisma.order.findMany({
        where: { product: { vendorId } }, // Filter orders by the vendor's product
      });

      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders for vendor:", error); // Log the error for debugging
      res.status(500).send("Error fetching orders for vendor");
    }
  });
