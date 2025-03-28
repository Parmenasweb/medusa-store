"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
          </div>
          <Heading className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white">
            Shopping Cart
          </Heading>
        </div>
        <span className="text-sm text-emperor-600 dark:text-emperor-300">
          {items?.length || 0} {items?.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="rounded-xl overflow-hidden bg-white/50 dark:bg-emperor-800/50 backdrop-blur-sm">
        <Table>
          <Table.Header className="border-t-0 bg-emperor-50/50 dark:bg-emperor-800/50">
            <Table.Row className="text-emperor-600 dark:text-emperor-300 text-sm">
              <Table.HeaderCell className="!pl-6">Item</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell">
                Price
              </Table.HeaderCell>
              <Table.HeaderCell className="!pr-6 text-right">
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items ? (
              items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Item
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  </motion.div>
                ))
            ) : (
              <motion.div variants={itemVariants}>
                {repeat(3).map((i) => (
                  <SkeletonLineItem key={i} />
                ))}
              </motion.div>
            )}
          </Table.Body>
        </Table>
      </div>
    </motion.div>
  )
}

export default ItemsTemplate
