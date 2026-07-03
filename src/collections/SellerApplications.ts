import type { CollectionConfig } from 'payload'

export const SellerApplications: CollectionConfig = {
  slug: 'seller-applications',
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'vehicleTitle',
    defaultColumns: ['vehicleTitle', 'sellerName', 'sellerType', 'status', 'createdAt'],
    listSearchableFields: ['sellerName', 'sellerEmail', 'vehicleTitle'],
    group: 'Applications',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Under Review', value: 'reviewing' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      type: 'collapsible',
      label: 'Seller Details',
      fields: [
        {
          name: 'sellerName',
          type: 'text',
          required: true,
        },
        {
          name: 'sellerEmail',
          type: 'email',
          required: true,
        },
        {
          name: 'sellerPhone',
          type: 'text',
          required: true,
        },
        {
          name: 'sellerLocation',
          type: 'text',
        },
        {
          name: 'sellerType',
          type: 'select',
          options: [
            { label: 'Private Seller', value: 'private' },
            { label: 'Dealer', value: 'dealer' },
          ],
          required: true,
        },
        {
          name: 'dealerName',
          type: 'text',
          admin: {
            condition: (data) => data?.sellerType === 'dealer',
            description: 'Dealership name (dealers only)',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Vehicle Details',
      fields: [
        {
          name: 'vehicleTitle',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 2022 Porsche 911 GT3' },
        },
        {
          type: 'row',
          fields: [
            { name: 'vehicleMake', type: 'text', required: true },
            { name: 'vehicleModel', type: 'text', required: true },
            { name: 'vehicleYear', type: 'number', required: true },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'vehicleMileage', type: 'number', required: true },
            { name: 'askingPrice', type: 'number', required: true },
            { name: 'vehicleColour', type: 'text' },
          ],
        },
        {
          name: 'vehicleDescription',
          type: 'textarea',
        },
        {
          name: 'hasModifications',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'modifications',
          type: 'textarea',
          admin: {
            condition: (data) => data?.hasModifications === true,
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Admin Notes',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'adminNotes',
          type: 'textarea',
          admin: { description: 'Internal notes — not visible to the seller' },
        },
      ],
    },
  ],
}
