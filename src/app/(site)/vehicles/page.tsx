import { getPayloadClient } from '@/lib/payload'
import type { Vehicle } from '@/lib/types'
import VehiclesClient from '@/components/vehicles/VehiclesClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'The Collection — PSR LONDON',
  description:
    'Browse the PSR LONDON curated collection of exceptional vehicles. Every listing is personally vetted by our team.',
}

export default async function VehiclesPage() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'vehicles',
      where: { status: { equals: 'live' } },
      sort: '-createdAt',
      limit: 200,
    })
    return <VehiclesClient vehicles={docs as unknown as Vehicle[]} />
  } catch {
    return <VehiclesClient vehicles={[]} />
  }
}
