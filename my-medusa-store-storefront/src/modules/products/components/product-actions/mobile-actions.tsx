"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { useFavorites } from "@lib/context/favorites-context"
import { Heart } from "lucide-react"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  const isProductFavorite = isFavorite(product.id)

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-white dark:bg-emperor-900 flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full w-full border-t border-gray-200 dark:border-emperor-800">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-2">
                <span data-testid="mobile-title">{product.title}</span>
                <span>—</span>
                {selectedPrice ? (
                  <div className="flex items-end gap-x-2 text-ui-fg-base">
                    {selectedPrice.price_type === "sale" && (
                      <p>
                        <span className="line-through text-small-regular">
                          {selectedPrice.original_price}
                        </span>
                      </p>
                    )}
                    <span
                      className={clx({
                        "text-ui-fg-interactive":
                          selectedPrice.price_type === "sale",
                      })}
                    >
                      {selectedPrice.calculated_price}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleFavoriteClick}
                  variant="secondary"
                  className={`w-10 h-10 rounded-xl backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center transition-colors ${
                    isProductFavorite 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-glass-gradient dark:bg-glass-gradient-dark hover:opacity-80'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      isProductFavorite 
                        ? 'fill-white text-white' 
                        : 'text-emperor-950 dark:text-white'
                    }`} 
                  />
                </Button>
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-10 h-10 rounded-xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <ChevronDown className="w-5 h-5 text-emperor-950 dark:text-white" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || !variant || optionsDisabled || isAdding}
              variant="primary"
              className="w-full h-12 rounded-xl bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              isLoading={isAdding}
            >
              {!variant
                ? "Select variant"
                : !inStock
                ? "Out of stock"
                : "Add to cart"}
            </Button>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full h-full transform overflow-hidden bg-white dark:bg-emperor-900 p-5 text-left align-middle shadow-xl transition-all flex flex-col justify-between">
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={close}
                      className="bg-gray-100 dark:bg-emperor-800 p-2 rounded-full"
                    >
                      <X className="w-6 h-6 text-emperor-950 dark:text-white" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-y-6">
                    {product.variants.length > 1 && (
                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-4">
                          {product.options.map((option) => {
                            return (
                              <div key={option.id}>
                                <OptionSelect
                                  option={option}
                                  current={options[option.id]}
                                  updateOption={updateOptions}
                                  title={option.title}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

MobileActions.displayName = "MobileActions"

export default MobileActions
