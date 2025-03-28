"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, Loader2 } from "lucide-react"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Table.Row className="w-full hover:bg-emperor-50/30 dark:hover:bg-emperor-800/30 transition-colors" data-testid="product-row">
        <Table.Cell className="!pl-6 p-4">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className={clx("block overflow-hidden rounded-lg", {
              "w-16": type === "preview",
              "w-24": type === "full",
            })}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative aspect-square">
              <Thumbnail
                thumbnail={item.thumbnail}
                images={item.variant?.product?.images}
                size="square"
              />
            </motion.div>
          </LocalizedClientLink>
        </Table.Cell>

        <Table.Cell className="text-left">
          <div className="flex flex-col gap-1">
            <Text
              className="text-base font-medium text-emperor-950 dark:text-white hover:text-emperor-600 dark:hover:text-emperor-300 transition-colors"
              data-testid="product-title"
            >
              <LocalizedClientLink href={`/products/${item.product_handle}`}>
                {item.product_title}
              </LocalizedClientLink>
            </Text>
            <LineItemOptions variant={item.variant} className="text-sm text-emperor-600 dark:text-emperor-400" data-testid="product-variant" />
          </div>
        </Table.Cell>

        {type === "full" && (
          <Table.Cell>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(item.quantity - 1)}
                  disabled={updating || item.quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-emperor-950 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => changeQuantity(item.quantity + 1)}
                  disabled={updating || item.quantity >= maxQuantity}
                  className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <DeleteButton id={item.id}>
                <Trash2 className="w-4 h-4" />
              </DeleteButton>
              {updating && (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-emperor-600 dark:text-emperor-300" />
                </div>
              )}
            </div>
            {error && (
              <ErrorMessage error={error} className="mt-2" data-testid="product-error-message" />
            )}
          </Table.Cell>
        )}

        {type === "full" && (
          <Table.Cell className="hidden small:table-cell text-emperor-600 dark:text-emperor-300">
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </Table.Cell>
        )}

        <Table.Cell className="!pr-6 text-right">
          <span
            className={clx("", {
              "flex flex-col items-end h-full justify-center": type === "preview",
            })}
          >
            {type === "preview" && (
              <span className="flex gap-x-1 text-emperor-600 dark:text-emperor-300">
                <Text className="text-ui-fg-muted">{item.quantity}x </Text>
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </span>
            )}
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
              className="text-emperor-950 dark:text-white font-medium"
            />
          </span>
        </Table.Cell>
      </Table.Row>
    </motion.div>
  )
}

export default Item
