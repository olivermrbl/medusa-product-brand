import { defineRouteConfig } from "@medusajs/admin-shared"
import { Container, Heading, Text, Button } from "@medusajs/ui"
import { Link } from "react-router-dom"
import { BrandsTable } from "./components/product-type-list-table"

const Brands = () => {
  return (
    <Container className="divide-y pb-6">
      <div className="flex items-center justify-between py-4">
        <div>
          <Heading level="h1">Brands</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            Manage your brands
          </Text>
        </div>
        <Button size="small" variant="secondary" asChild>
          <Link to="create">Create</Link>
        </Button>
      </div>
      <BrandsTable />
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Brands",
})

export default Brands
