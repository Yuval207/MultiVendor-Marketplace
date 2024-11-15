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
    try {
      const newVendor = yield prisma.vendor.create({
        data: {
          businessName,
          contactInfo,
          taxDetails,
          approved: false,
        },
      });
      res.status(201).json(newVendor);
    } catch (error) {
      res.status(500).send("Error registering new vendor");
    }
  });

// Update vendor profile
export const updateVendorProfile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    const { businessName, contactInfo, taxDetails } = req.body;
    try {
      const vendor = yield prisma.vendor.findUnique({
        where: { id: parseInt(vendorId) },
      });
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
      });
      res.json(updatedVendor);
    } catch (error) {
      res.status(500).send("Error updating vendor profile");
    }
  });

// Add a new product
export const addProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId;
    const { name, description, price, stock } = req.body;
    try {
      const newProduct = yield prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          vendorId: parseInt(vendorId),
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).send("Error adding new product");
    }
  });

// Edit an existing product
export const editProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const { name, description, price, stock } = req.body;
    try {
      const product = yield prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      const updatedProduct = yield prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          name: name || product.name,
          description: description || product.description,
          price: price || product.price,
          stock: stock || product.stock,
        },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).send("Error editing product");
    }
  });

// Delete a product
export const deleteProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
      const product = yield prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      yield prisma.product.delete({
        where: { id: parseInt(productId) },
      });
      res.send(`Product with ID: ${productId} has been deleted`);
    } catch (error) {
      res.status(500).send("Error deleting product");
    }
  });

// Get all products for the vendor
export const getVendorProducts = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId;
    try {
      const products = yield prisma.product.findMany({
        where: { vendorId: parseInt(vendorId) },
      });
      res.json(products);
    } catch (error) {
      res.status(500).send("Error fetching products for vendor");
    }
  });

// Get all orders for the vendor
export const getVendorOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId;
    try {
      const orders = yield prisma.order.findMany({
        where: { vendorId: parseInt(vendorId) },
      });
      res.json(orders);
    } catch (error) {
      res.status(500).send("Error fetching orders for vendor");
    }
  });
