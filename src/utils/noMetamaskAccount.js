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
          name: 'Legal entity type',
          required: true,
          orgidJsonPath: 'legalEntity.legalType',
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
          required: false
        },
        {
          type: 'input',
          name: 'City',
          required: true,
          orgidJsonPath: 'legalEntity.registeredAddress.locality',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        },
        {
          type: 'input',
          name: 'Street address',
          required: true,
          orgidJsonPath: 'legalEntity.registeredAddress.streetAddress',
          validate: value => {
            if (!value) {
              return 'Required field';
            }
          }
        },
        {
          type: 'input',
          name: 'Office or apartment',
          orgidJsonPath: 'legalEntity.registeredAddress.premise'
        },
        {
          type: 'input',
          name: 'Postal code',
          required: true,
          orgidJsonPath: 'legalEntity.registeredAddress.postalCode',
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
          orgidJsonPath: 'legalEntity.contacts[0].website',
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
          required: true,
          validate: value => {
            const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value && !regexp.test(value.trim().toLowerCase())) {
              return 'Wrong email format';
            }
          }
        }
      ]
    },
  ],
  cta: 'Create account'
};
