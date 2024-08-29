import { Table, Container, Heading, Text } from "@medusajs/ui"
import { useBrands } from "../../hooks"

export const BrandsTable = () => {
  const { data, loading } = useBrands()

  return (
    <Container className="flex flex-col p-0 overflow-hidden border-none">
      <Table>
        <Table.Header className="border-none">
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data?.brands && (
          <Table.Body>
            {data.brands.map((brand) => (
              <Table.Row key={brand.id}>
                <Table.Cell>{brand.name}</Table.Cell>
                <Table.Cell>{brand.description ?? "-"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <div className="p-6"></div>
    </Container>
  )
}
