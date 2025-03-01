import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BRAND_MODULE } from "../modules/brands"
import BrandModuleService from "../modules/brands/service"
import { emitEventStep } from "@medusajs/medusa/core-flows"

export type UpdateBrandStepInput = {
  id: string
  name: string
  description?: string
}

type UpdateBrandWorkflowInput = {
  id: string
  name: string
  description?: string
}

export const updateBrandStep = createStep(
  "update-brand-step",
  async (input: UpdateBrandStepInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    const prevBrand = await brandModuleService.listBrands({
      id: input.id,
    })
    const updatedBrand = await brandModuleService.updateBrands({
      name: input.name,
      description: input.description,
    })

    return new StepResponse(updatedBrand, prevBrand)
  },
  async (prevBrand, { container }) => {
    if (!prevBrand) {
      return
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    await brandModuleService.updateBrands(prevBrand)
  }
)

export const updateBrandWorkflow = createWorkflow(
  "update-brand",
  (input: UpdateBrandWorkflowInput) => {
    const brand = updateBrandStep(input)
    emitEventStep({
      eventName: "brand.updated",
      data: {
        id: brand.id,
      },
    })

    return new WorkflowResponse(brand)
  }
) 