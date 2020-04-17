import {countries} from './countries';
import _ from 'lodash';
import validators from './validators'

export const config = [
  {
    type: 'tab',
    name: 'General info',
    sections: {
      left: [
        {
          name: 'Main info',
          type: 'section',
          fields: [
            {
              type: 'select',
              name: 'Directory',
              options: {
                'hotel': 'Hotel',
                'airline': 'Airline',
                'insurance': 'Insurance',
                'ota': 'Travel agencies'
              },
              required: true,
              orgidJsonPath: 'organizationalUnit.type'
            },
            {
              type: 'input',
              name: 'Organization name',
              required: true,
              orgidJsonPath: 'organizationalUnit.name'
            },
            {
              type: 'select',
              name: 'Legal form',
              options: [
                'private entrepreneur',
                'private company limited by shares or Ltd. (UK, Ireland and the Commonwealth)',
                'public limited company (UK, Ireland and the Commonwealth)',
                'limited partnership',
                'unlimited partnership',
                'chartered company',
                'statutory company',
                'holding company',
                'subsidiary company',
                'one man company (sole proprietorship)',
                'charitable incorporated organisation (UK)',
                'non-governmental organization',
              ],
              required: true,
              orgidJsonPath: 'organizationalUnit.legalType'
            },
          ]
        },
        {
          name: 'Address of your organization',
          type: 'section',
          fields: [
            {
              type: 'select',
              name: 'Country',
              options: countries,
              required: true,
              orgidJsonPath: 'organizationalUnit.address.country'
            },
            {
              type: 'input',
              name: 'State or region',
              orgidJsonPath: 'organizationalUnit.address.subdivision',
              required: true
            },
            {
              type: 'input',
              name: 'City',
              orgidJsonPath: 'organizationalUnit.address.locality',
              required: true
            },
            {
              type: 'input',
              name: 'Street, building',
              orgidJsonPath: 'organizationalUnit.address.streetAddress',
              required: true
            },
            {
              type: 'input',
              name: 'Apartment or office',
              orgidJsonPath: 'organizationalUnit.address.premise',
              required: true
            },
            {
              type: 'input',
              name: 'Postal code',
              orgidJsonPath: 'organizationalUnit.address.postalCode',
              required: true
            }
          ]
        }
      ],
      right: [
        {
          name: 'Profile image',
          type: 'section',
          fields: [
            {
              name: 'Profile image',
              type: 'dropzone',
              orgidJsonPath: 'media.logo',
              description: 'Add a logo or any image that represents your organization. It will help you stand out in search results.',
              helperText: 'Recommended dimensions: 908х400 (minimal: 454x200)\nFormat: JPG, PNG'
            }
          ]
        }
      ]
    }
  },
  {
    type: 'tab',
    name: 'Contact info',
    sections: {
      left: [
        {
          name: 'Contact information',
          type: 'section',
          fields: [
            {
              type: 'input',
              subtype: 'phone',
              name: 'Phone',
              orgidJsonPath: 'organizationalUnit.contacts[0].phone'
            },
            {
              type: 'input',
              subtype: 'website',
              name: 'Website',
              orgidJsonPath: 'organizationalUnit.contacts[0].website',
              schema: validators.website,
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'domain'}).get('[0]', false).value()
            },
            {
              type: 'input',
              subtype: 'email',
              name: 'Email',
              orgidJsonPath: 'organizationalUnit.contacts[0].email',
              schema: validators.email
            }
          ]
        }
      ],
      right: [
        {
          name: 'Social media accounts',
          type: 'section',
          fields: [
            {
              name: 'Facebook',
              type: 'input',
              icon: 'facebook',
              orgidJsonPath: 'organizationalUnit.contacts[0].facebook',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'facebook'}).get('[0]', false).value()
            },
            {
              name: 'Twitter',
              type: 'input',
              icon: 'twitter',
              orgidJsonPath: 'organizationalUnit.contacts[0].twitter',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'twitter'}).get('[0]', false).value()
            },
            {
              name: 'Instagram',
              type: 'input',
              icon: 'instagram',
              orgidJsonPath: 'organizationalUnit.contacts[0].instagram',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'instagram'}).get('[0]', false).value()
            },
          ]
        }
      ]
    }
  },
  {
    type: 'tab',
    name: 'Organization details',
    sections: {
      left: [
        {
          name: 'Title',
          type: 'section',
          fields: [
            {
              type: 'input',
              name: 'Title',
              orgidJsonPath: 'organizationalUnit.details.title'
            }
          ]
        }
      ],
      right: [
        {
          name: 'Organization details',
          type: 'section',
          fields: [
            {
              type: 'input',
              name: 'Organization details',
              orgidJsonPath: 'organizationalUnit.details.details'
            }
          ]
        }
      ]
    }
  }
];
