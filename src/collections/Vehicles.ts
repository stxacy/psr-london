import type { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'make', 'price', 'status', 'featured'],
    listSearchableFields: ['title', 'make', 'model', 'slug'],
    group: 'Inventory',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { or: [{ status: { equals: 'live' } }, { status: { equals: 'sold' } }] }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. 2022 Porsche 911 GT3' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly identifier e.g. porsche-911-gt3-2022' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Live', value: 'live' },
        { label: 'Sold', value: 'sold' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on homepage featured section' },
    },
    {
      type: 'row',
      fields: [
        { name: 'make', type: 'text', required: true },
        { name: 'model', type: 'text', required: true },
        { name: 'year', type: 'number', required: true },
      ],
    },
    {
      name: 'variant',
      type: 'text',
      admin: { description: 'e.g. GT3 PDK, S-line, AMG Line' },
    },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', required: true },
        { name: 'mileage', type: 'number', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bodyType',
          type: 'select',
          options: ['Saloon', 'Coupe', 'Convertible', 'SUV', 'Estate', 'Hatchback'],
          required: true,
        },
        {
          name: 'sellerType',
          type: 'select',
          options: [
            { label: 'Private Seller', value: 'private' },
            { label: 'Approved Dealer', value: 'dealer' },
          ],
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'transmission', type: 'select', options: ['Automatic', 'Manual'] },
        {
          name: 'fuelType',
          type: 'select',
          options: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'],
        },
        { name: 'colour', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'engineSize', type: 'text', admin: { placeholder: 'e.g. 4.0L' } },
        { name: 'power', type: 'text', admin: { placeholder: 'e.g. 510 bhp' } },
        { name: 'location', type: 'text', admin: { placeholder: 'e.g. London' } },
      ],
    },
    {
      name: 'sellerName',
      type: 'text',
      admin: { placeholder: 'e.g. Porsche Centre London (leave blank for private)' },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Upload vehicle photos — first image is used as the hero and card thumbnail' },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'specs',
      type: 'array',
      admin: { description: 'Key specification pairs shown on the detail page' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
