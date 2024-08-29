import { defineWidgetConfig } from "@medusajs/admin-shared"
import {
  Button,
  Container,
  DropdownMenu,
  Heading,
  IconButton,
  Table,
} from "@medusajs/ui"
import { XMarkMini } from "@medusajs/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AdminProduct, DetailWidgetProps } from "@medusajs/types"

const ProductWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const productCars = useQuery({
    queryKey: ["cars"],
    gcTime: 0,
    queryFn: async () => {
      const result = await fetch(`/cars?product_id=${data.id}`)
      return result.json()
    },
  })

  const cars = useQuery({
    queryKey: ["cars-list"],
    gcTime: 0,
    queryFn: async () => {
      const result = await fetch(`/cars`)
      return result.json()
    },
  })

  // assciate cars to product react query mutation

  const associateCar = useMutation({
    mutationFn: async (carId: string) => {
      const result = await fetch(`/cars/${carId}/products`, {
        method: "POST",
        body: JSON.stringify({ product_id: data.id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return result.json()
    },
    onSuccess: () => {
      productCars.refetch()
    },
  })

  const disassociateCar = useMutation({
    mutationFn: async (carId: string) => {
      const result = await fetch(`/cars/${carId}/products/${data.id}`, {
        method: "DELETE",
      })
      return result.json()
    },
    onSuccess: () => {
      productCars.refetch()
    },
  })

  const handleCarSelect = (carId: string) => {
    associateCar.mutate(carId)
  }

  const handleCarRemove = (carId: string) => {
    disassociateCar.mutate(carId)
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Compatible Cars</Heading>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Make</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productCars.data?.cars?.map((c) => {
            return (
              <Table.Row key={c.id}>
                <Table.Cell>{c.make}</Table.Cell>
                <Table.Cell>{c.model}</Table.Cell>
                <Table.Cell>{c.year}</Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant="transparent"
                    onClick={() => handleCarRemove(c.id)}
                  >
                    <XMarkMini />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <div className="py-4 px-6">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">Add Car</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {cars.data?.cars?.map((c) => {
              return (
                <DropdownMenu.Item
                  key={c.id}
                  onClick={() => handleCarSelect(c.id)}
                >
                  {c.make}, {c.model}, {c.year}
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductWidget
