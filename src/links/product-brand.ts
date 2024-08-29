import ProductModule from "@medusajs/product";
import { defineLink } from "@medusajs/utils";
import BrandModule from "../modules/brand";

export default defineLink(
  ProductModule.linkable.product,
  BrandModule.linkable.brand
);
