import { createProductsWorkflow } from "@medusajs/core-flows"
import { Modules } from "@medusajs/utils"

createProductsWorkflow.hooks.productsCreated(
  async ({ additional_data, products }, { container }) => {
    // I use the workflow in `POST /admin/products` and `POST /admin/products/:id`,
    // so I know there will only ever be one product in the array
    const product = products[0]

    if (additional_data?.brand_id) {
      const remoteLink = container.resolve("remoteLink")

      const link = {
        [Modules.PRODUCT]: { product_id: product.id },
        BrandModuleRegistrationKey: { brand_id: additional_data.brand_id },
      }

      await remoteLink.create(link)
    }
  }
)
