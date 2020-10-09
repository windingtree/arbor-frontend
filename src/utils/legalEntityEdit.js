import {countries} from './countries';
// import _ from 'lodash';
// import validators from "./validators";
// import { entityTypes } from './constants';

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
            // {
            //   type: 'select',
            //   name: 'Legal entity type',
            //   options: entityTypes,
            //   required: true,
            //   orgidJsonPath: 'legalEntity.legalType'
            // },
            {
              type: 'input',
              name: 'Legal entity type',
              required: true,
              orgidJsonPath: 'legalEntity.legalType',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Legal name',
              required: true,
              orgidJsonPath: 'legalEntity.legalName',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Registration number',
              helperText: 'Number of your organization in the country-specific business registry',
              orgidJsonPath: 'legalEntity.legalIdentifier',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
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
              orgidJsonPath: 'legalEntity.registeredAddress.country',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'State or region',
              orgidJsonPath: 'legalEntity.registeredAddress.subdivision',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'City',
              orgidJsonPath: 'legalEntity.registeredAddress.locality',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Street, building',
              orgidJsonPath: 'legalEntity.registeredAddress.streetAddress',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Office',
              orgidJsonPath: 'legalEntity.registeredAddress.premise',
              required: false,
              validate: value => {}
            },
            {
              type: 'input',
              name: 'Postal code',
              orgidJsonPath: 'legalEntity.registeredAddress.postalCode',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
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
              orgidJsonPath: 'legalEntity.contacts[0].phone',
              validate: value => {
                if (value && !value.trim().match(/^([+]{0,1})([0-9- ]+)$/)) {
                  return 'Wrong phone number format';
                }
              }
            },
            {
              type: 'input',
              subtype: 'website',
              name: 'Website',
              orgidJsonPath: 'legalEntity.contacts[0].website',
              validate: value => {
                if (value && !value.trim().match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
                  return 'Wrong website URL';
                }
              }
              // schema: validators.website,
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'domain'}).get('[0]', false).value()
            },
            {
              type: 'input',
              subtype: 'email',
              name: 'Email',
              orgidJsonPath: 'legalEntity.contacts[0].email',
              validate: value => {
                if (value && !value.trim().match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                  return 'Wrong email format';
                }
              }
              // schema: validators.email
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
              validate: value => {
                if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                  return 'Wrong URL';
                }
              }
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'facebook'}).get('[0]', false).value()
            },
            {
              name: 'Twitter',
              type: 'input',
              icon: 'twitter',
              orgidJsonPath: 'legalEntity.contacts[0].twitter',
              validate: value => {
                if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                  return 'Wrong URL';
                }
              }
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'twitter'}).get('[0]', false).value()
            },
            {
              name: 'Instagram',
              type: 'input',
              icon: 'instagram',
              orgidJsonPath: 'legalEntity.contacts[0].instagram',
              validate: value => {
                if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                  return 'Wrong URL';
                }
              }
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'instagram'}).get('[0]', false).value()
            }
          ]
        }
      ]
    }
  }
];
