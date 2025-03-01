import {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  
  import { createBrandWorkflow } from "../../../workflows/create-brand"
  import { updateBrandWorkflow } from "../../../workflows/update-brand"
  import { deleteBrandWorkflow } from "../../../workflows/delete-brand"
import { PostAdminCreateBrand } from "./validators"
import { z } from "zod"

  
  type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>

  
  export const POST = async (
    req: MedusaRequest<PostAdminCreateBrandType>,
    res: MedusaResponse
  ) => {
    const { result } = await createBrandWorkflow(req.scope)
      .run({
        input: req.validatedBody,
      })
  
    res.json({ brand: result })
  }


  
  export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const query = req.scope.resolve("query")
    
    const { 
      data: brands, 
      metadata: { count, take, skip } = {},
    } = await query.graph({
      entity: "brand",
      ...req.queryConfig,
    })
  
    res.json({ 
      brands,
      count,
      limit: take,
      offset: skip,
    })
  }

export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { result } = await updateBrandWorkflow(req.scope)
    .run({
      input: {
        id: req.params.id,
        name: req.params.name,
        description: req.params.description,
      },
    })

  res.json({ brand: result })
}

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { result } = await deleteBrandWorkflow(req.scope)
    .run({
      input: {
        id: req.params.id,
      },
    })
console.log(result)
  res.json({
    id: req.params.id,
    object: "brand",
    deleted: true,
  })
}