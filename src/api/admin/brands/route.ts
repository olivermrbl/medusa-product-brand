import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils"

export const POST = async (req, res) => {
  const brandService = req.scope.resolve("brandModuleService")

  const { name } = req.body

  const created = await brandService.createBrands([{ name }])

  res.json({ brand: created })
}

export const GET = async (req, res) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "brand",
    fields: ["id", "name", "description"],
  })

  const result = await remoteQuery(queryObject)

  res.json({
    brands: result,
  })
}
