import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BRAND_MODULE } from "../modules/brands"
import BrandModuleService from "../modules/brands/service"
import { emitEventStep } from "@medusajs/medusa/core-flows"

export type DeleteBrandStepInput = {
  id: string
}

type DeleteBrandWorkflowInput = {
  id: string
}

export const deleteBrandStep = createStep(
  "delete-brand-step",
  async (input: DeleteBrandStepInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    const brand = await brandModuleService.listBrands({
      id: input.id,
    })
    await brandModuleService.deleteBrands(input.id)

    return new StepResponse(null, brand)
  },
  async (brand, { container }) => {
    if (!brand) {
      return
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    await brandModuleService.createBrands(brand)
  }
)

export const deleteBrandWorkflow = createWorkflow(
  "delete-brand",
  (input: DeleteBrandWorkflowInput) => {
    const brand = deleteBrandStep(input)
    emitEventStep({
      eventName: "brand.deleted",
      data: {
        id: input.id,
      },
    })

    return new WorkflowResponse(brand)
  }
) 