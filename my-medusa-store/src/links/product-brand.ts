import BrandModule from "../modules/brands"
import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
)