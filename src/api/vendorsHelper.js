// src/api/vendorHelpers.ts
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
import prisma from "../../prisma/index.js";

export const createVendor = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.vendor.create({
      data,
    });
  });

export const updateVendorProfile = (vendorId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.vendor.update({
      where: { id: parseInt(vendorId) },
      data,
    });
  });

export const createProduct = (vendorId, productData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.create({
      data: {
        ...productData,
        vendorId: parseInt(vendorId), // Ensure vendorId is an integer
      },
    });
  });

export const updateProduct = (productId, productData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.update({
      where: { id: parseInt(productId) },
      data: productData,
    });
  });

export const deleteProduct = (productId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.delete({
      where: { id: parseInt(productId) },
    });
  });

export const updateVendorStatus = (vendorId, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.vendor.update({
      where: { id: parseInt(vendorId) },
      data: { status },
    });
  });

export const deleteVendor = (vendorId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.vendor.delete({
      where: { id: parseInt(vendorId) },
    });
  });

export const handleDispute = (orderId, disputeData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { dispute: disputeData },
    });
  });
