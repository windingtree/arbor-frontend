import {countries} from './countries';
// import _ from 'lodash';
// import validators from './validators';
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
              orgidJsonPath: 'organizationalUnit.type',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Organization name',
              required: true,
              orgidJsonPath: 'organizationalUnit.name',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            // {
            //   type: 'select',
            //   name: 'Legal form',
            //   options: entityTypes,
            //   required: true,
            //   orgidJsonPath: 'organizationalUnit.legalType',
            //   validate: value => {
            //     if (!value) {
            //       return 'Required field';
            //     }
            //   }
            // },
            {
              type: 'input',
              name: 'Legal form',
              required: true,
              orgidJsonPath: 'organizationalUnit.legalType',
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
              orgidJsonPath: 'organizationalUnit.address.country',
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'State or region',
              orgidJsonPath: 'organizationalUnit.address.subdivision',
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
              orgidJsonPath: 'organizationalUnit.address.locality',
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
              orgidJsonPath: 'organizationalUnit.address.streetAddress',
              required: true,
              validate: value => {
                if (!value) {
                  return 'Required field';
                }
              }
            },
            {
              type: 'input',
              name: 'Apartment or office',
              orgidJsonPath: 'organizationalUnit.address.premise'
            },
            {
              type: 'input',
              name: 'Postal code',
              orgidJsonPath: 'organizationalUnit.address.postalCode',
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
              orgidJsonPath: 'organizationalUnit.contacts[0].phone',
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
              orgidJsonPath: 'organizationalUnit.contacts[0].website',
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'domain'}).get('[0]', false).value(),
              validate: value => {
                if (value && !value.trim().match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
                  return 'Wrong website URL';
                }
              }
            },
            {
              type: 'input',
              subtype: 'email',
              name: 'Email',
              orgidJsonPath: 'organizationalUnit.contacts[0].email',
              validate: value => {
                if (value && !value.trim().match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                  return 'Wrong email format';
                }
              }
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
              validate: value => {},
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'facebook'}).get('[0]', false).value()
            },
            {
              name: 'Twitter',
              type: 'input',
              icon: 'twitter',
              orgidJsonPath: 'organizationalUnit.contacts[0].twitter',
              validate: value => {},
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'twitter'}).get('[0]', false).value()
            },
            {
              name: 'Instagram',
              type: 'input',
              icon: 'instagram',
              orgidJsonPath: 'organizationalUnit.contacts[0].instagram',
              validate: value => {},
              // trust: (o)=> _.chain(o).get('trust.assertions', []).filter({'type': 'instagram'}).get('[0]', false).value()
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
