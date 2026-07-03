import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'vehicleTitle',
    defaultColumns: ['vehicleTitle', 'name', 'email', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'vehicleTitle'],
    group: 'Enquiries',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'new',
      required: true,
    },
    {
      name: 'vehicle',
      type: 'relationship',
      relationTo: 'vehicles',
      required: true,
    },
    {
      name: 'vehicleTitle',
      type: 'text',
      admin: { description: 'Snapshot of the vehicle title at time of enquiry' },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes — not visible to the enquirer',
        condition: () => true,
      },
    },
  ],
}
