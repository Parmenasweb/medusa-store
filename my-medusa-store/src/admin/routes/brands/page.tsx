import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid, PencilSquare, Trash } from "@medusajs/icons"
import { 
  Container,
  Heading,
  Button,
  IconButton,
  Input,
  Label,
  Textarea,
  Table,
  Drawer,
  
  Text,
  toast,
} from "@medusajs/ui"
import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  Cell,
  Header,
} from "@tanstack/react-table"
import { useQuery, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useMemo, useState } from "react"

type Brand = {
  id: string
  name: string
  description?: string
}

type BrandsResponse = {
  brands: Brand[]
  count: number
  limit: number
  offset: number
}

const columnHelper = createColumnHelper<Brand>()

type BrandFormProps = {
  initialData?: Brand
  onSubmit: (data: { name: string; description?: string }) => Promise<void>
  onClose: () => void
  title: string
  submitText: string
}

const BrandForm = ({ initialData, onSubmit, onClose, title, submitText }: BrandFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Drawer open onOpenChange={onClose}>
      <Drawer.Content>
        <Drawer.Header>
          <Heading>{title}</Heading>
        </Drawer.Header>
        <form 
          className="flex flex-col gap-y-8 p-6"
          onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)
            try {
              const formData = new FormData(e.currentTarget)
              await onSubmit({
                name: formData.get("name") as string,
                description: formData.get("description") as string,
              })
              toast.success(`Brand ${initialData ? "updated" : "created"} successfully`)
              onClose()
            } catch (error) {
              toast.error(`Failed to ${initialData ? "update" : "create"} brand`)
            } finally {
              setIsLoading(false)
            }
          }}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={initialData?.name}
                required 
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description"
                defaultValue={initialData?.description}
              />
            </div>
          </div>
          <div className="flex gap-x-2">
            <Button 
              variant="transparent" 
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              type="submit" 
              disabled={isLoading}
            >
              {submitText}
            </Button>
          </div>
        </form>
      </Drawer.Content>
    </Drawer>
  )
}

const DeleteBrandDialog = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => Promise<void>
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Drawer open onOpenChange={onClose}>
      <Drawer.Content>
        <Drawer.Header>
          <Heading>Delete Brand</Heading>
        </Drawer.Header>
        <div className="p-6 space-y-6">
          <Text>Are you sure you want to delete this brand?</Text>
          <div className="flex gap-x-2">
            <Button 
              variant="transparent" 
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                try {
                  await onConfirm()
                  toast.success("Brand deleted successfully")
                  onClose()
                } catch (error) {
                  toast.error("Failed to delete brand")
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}

const BrandsPage = () => {
  const [showNewBrand, setShowNewBrand] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null)
  const queryClient = useQueryClient()
  const limit = 15
  const [offset, setOffset] = useState(0)

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryKey: ["brands", limit, offset],
    queryFn: async () => {
      const response = await sdk.client.fetch(`/admin/brands`, {
        query: {
          limit,
          offset,
        },
      })
      return response as BrandsResponse
    },
  })

  const pageCount = useMemo(() => {
    return Math.ceil((data?.count || 0) / limit)
  }, [data?.count, limit])

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <Text className="font-medium">{info.getValue()}</Text>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <Text className="text-ui-fg-subtle">{info.getValue() || "-"}</Text>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center gap-x-2">
          <IconButton
            variant="transparent"
            size="small"
            onClick={() => setEditingBrand(info.row.original)}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            variant="transparent"
            size="small"
            onClick={() => setDeletingBrand(info.row.original)}
          >
            <Trash />
          </IconButton>
        </div>
      ),
    }),
  ], [])

  const table = useReactTable({
    data: data?.brands || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    manualPagination: true,
  })

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <div>
          <Heading>Brands</Heading>
          <Text className="text-ui-fg-subtle">Manage your product brands</Text>
        </div>
        <Button variant="primary" onClick={() => setShowNewBrand(true)}>
          Create Brand
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Text>Loading brands...</Text>
        </div>
      ) : (
        <>
          <Table>
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<Brand, unknown>) => (
                    <Table.HeaderCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row: Row<Brand>) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell: Cell<Brand, unknown>) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex items-center justify-end gap-x-2 mt-4">
            <Button
              variant="transparent"
              size="small"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - limit))}
            >
              Previous
            </Button>
            <Text>
              Page {Math.floor(offset / limit) + 1} of {pageCount}
            </Text>
            <Button
              variant="transparent"
              size="small"
              disabled={offset + limit >= (data?.count || 0)}
              onClick={() => setOffset(offset + limit)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {showNewBrand && (
        <BrandForm
          title="Create Brand"
          submitText="Create"
          onSubmit={async (data) => {
            await sdk.client.fetch(`/admin/brands`, {
              method: "POST",
              body: data,
            })
            queryClient.invalidateQueries({
              queryKey: ["brands"]
            } as InvalidateQueryFilters)
          }}
          onClose={() => setShowNewBrand(false)}
        />
      )}

      {editingBrand && (
        <BrandForm
          title="Edit Brand"
          submitText="Save Changes"
          initialData={editingBrand}
          onSubmit={async (data) => {
            await sdk.client.fetch(`/admin/brands/${editingBrand.id}`, {
              method: "PUT",
              body: data,
            })
            queryClient.invalidateQueries({
              queryKey: ["brands"]
            } as InvalidateQueryFilters)
          }}
          onClose={() => setEditingBrand(null)}
        />
      )}

      {deletingBrand && (
        <DeleteBrandDialog
          onClose={() => setDeletingBrand(null)}
          onConfirm={async () => {
            await sdk.client.fetch(`/admin/brands/${deletingBrand.id}`, {
              method: "DELETE",
            })
            queryClient.invalidateQueries({
              queryKey: ["brands"]
            } as InvalidateQueryFilters)
          }}
        />
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
})

export default BrandsPage