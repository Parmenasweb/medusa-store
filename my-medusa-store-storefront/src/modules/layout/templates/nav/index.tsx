import { listRegions } from "@lib/data/regions"
import NavContent from "@modules/layout/components/nav-content"

export default async function Nav() {
  const regions = await listRegions()
  return <NavContent regions={regions} />
}
