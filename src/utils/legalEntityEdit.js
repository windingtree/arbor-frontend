import {countries} from './countries';
import _ from 'lodash';
import validators from "./validators";

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
              name: 'Legal entity type',
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
              orgidJsonPath: 'legalEntity.legalType'
            },
            {
              type: 'input',
              name: 'Legal name',
              required: true,
              orgidJsonPath: 'legalEntity.legalName'
            },
            {
              type: 'input',
              name: 'Registration number',
              helperText: 'Number of your organization in the country-specific business registry',
              orgidJsonPath: 'legalEntity.legalIdentifier',
              required: true,
            }
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
              orgidJsonPath: 'legalEntity.registeredAddress.country'
            },
            {
              type: 'input',
              name: 'State or region',
              orgidJsonPath: 'legalEntity.registeredAddress.subdivision',
              required: true,
            },
            {
              type: 'input',
              name: 'City',
              orgidJsonPath: 'legalEntity.registeredAddress.locality',
              required: true,
            },
            {
              type: 'input',
              name: 'Street, building',
              orgidJsonPath: 'legalEntity.registeredAddress.streetAddress',
              required: true,
            },
            {
              type: 'input',
              name: 'Apartment or office',
              orgidJsonPath: 'legalEntity.registeredAddress.premise',
              required: true,
            },
            {
              type: 'input',
              name: 'Postal code',
              orgidJsonPath: 'legalEntity.registeredAddress.postalCode',
              required: true,
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
              orgidJsonPath: 'legalEntity.contacts[0].phone'
            },
            {
              type: 'input',
              subtype: 'website',
              name: 'Website',
              orgidJsonPath: 'legalEntity.contacts[0].website',
              schema: validators.website,
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'domain'}).get('[0]', false).value()
            },
            {
              type: 'input',
              subtype: 'email',
              name: 'Email',
              orgidJsonPath: 'legalEntity.contacts[0].email',
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
              orgidJsonPath: 'legalEntity.contacts[0].facebook',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'facebook'}).get('[0]', false).value()
            },
            {
              name: 'Twitter',
              type: 'input',
              icon: 'twitter',
              orgidJsonPath: 'legalEntity.contacts[0].twitter',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'twitter'}).get('[0]', false).value()
            },
            {
              name: 'Instagram',
              type: 'input',
              icon: 'instagram',
              orgidJsonPath: 'legalEntity.contacts[0].instagram',
              trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'instagram'}).get('[0]', false).value()
            }
          ]
        }
      ]
    }
  }
];
