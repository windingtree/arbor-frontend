import {countries} from './countries';

export default {
  type: 'create_account',
  name: 'General',
  //icon: StepperGeneralIcon,
  longName: 'Create account',
  sections: [
    {
      name: 'General information',
      type: 'section',
      fields: [
        {
          type: 'input',
          name: 'Registration number',
          required: true,
          helperText: 'Number of your organization in the country-specific business registry',
          orgidJsonPath: 'legalIdentifier',
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
          orgidJsonPath: 'legalName',
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
          orgidJsonPath: 'country',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        },
        {
          type: 'input',
          name: 'State or region',
          orgidJsonPath: 'subdivision',
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
          required: true,
          orgidJsonPath: 'locality',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        },
        {
          type: 'input',
          name: 'Street, building',
          required: true,
          orgidJsonPath: 'streetAddress',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        },
        {
          type: 'input',
          name: 'Apartment',
          orgidJsonPath: 'premise'
        },
        {
          type: 'input',
          name: 'Postal code',
          required: true,
          orgidJsonPath: 'postalCode',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        }
      ]
    },
    {
      name: 'Contact information',
      type: 'section',
      fields: [
        {
          type: 'input',
          subtype: 'website',
          name: 'Website',
          orgidJsonPath: 'website',
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
          orgidJsonPath: 'email',
          validate: value => {
            if (value && !value.trim().match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
              return 'Wrong email format';
            }
          }
        }
      ]
    },
  ],
  cta: 'Create Organization'
};
