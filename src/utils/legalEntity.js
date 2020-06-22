import {countries} from './countries';
import { StepperGeneralIcon, StepperHostingIcon, StepperMetaMaskIcon } from '../assets/SvgComponents';

export const wizardConfig = [
  {
    type: 'step',
    name: 'General',
    icon: StepperGeneralIcon,
    longName: 'General information',
    description: 'Creating an organization profile requires an Ethereum transaction. Make sure you have enough funds in your MetaMask account to cover the transaction fee.',
    sections: [
      {
        name: 'General information',
        type: 'section',
        fields: [
          // {
          //   type: 'select',
          //   name: 'Legal entity type',
          //   options: [
          //     'private entrepreneur',
          //     'private company limited by shares or Ltd. (UK, Ireland and the Commonwealth)',
          //     'public limited company (UK, Ireland and the Commonwealth)',
          //     'limited partnership',
          //     'unlimited partnership',
          //     'chartered company',
          //     'statutory company',
          //     'holding company',
          //     'subsidiary company',
          //     'one man company (sole proprietorship)',
          //     'charitable incorporated organisation (UK)',
          //     'non-governmental organization',
          //   ],
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
            required: true,
            helperText: 'Number of your organization in the country-specific business registry',
            orgidJsonPath: 'legalEntity.legalIdentifier',
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
            name: 'Street, building',
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
            name: 'Apartment or office',
            orgidJsonPath: 'legalEntity.registeredAddress.premise',
            required: true,
            validate: value => {
              if (!value) {
                return 'Required field';
              }
            }
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
          }
        ]
      },
      {
        name: 'Social media accounts',
        type: 'section',
        fields: [
          {
            name: 'Facebook',
            type: 'input',
            icon: 'facebook',
            orgidJsonPath: 'legalEntity.contacts[0].facebook',
            validate: value => {}
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'legalEntity.contacts[0].twitter',
            validate: value => {}
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'legalEntity.contacts[0].instagram',
            validate: value => {}
          },
          {
            name: 'Logo',
            type: 'dropzone',
            description: 'Add a logo or any image that represents your organization. It will help you stand out in search results.',
            orgidJsonPath: 'media.logo',
            helperText: 'Recommended dimensions: 908х400 (minimal: 454x200)\nFormat: JPG, PNG'
          }
        ]
      }
    ],
    cta: 'Next'
  },
  {
    type: 'step_hosting',
    name: 'Hosting',
    icon: StepperHostingIcon,
    longName: 'Hosting information',
    description: 'Choose where to store your organization profile data: on Arbor servers or on a hosting of your choice.',
    sections: [
      {
        name: 'Choose type of JSON hosting',
        type: 'section',
        fields: [
          {
            name: 'step2 test',
            type: 'input'
          },
          {
            name: 'Choose type of JSON hosting',
            type: 'json_hosting'
          }
        ]
      }
    ],
    cta: 'Confirm'
  },
  {
    type: 'step_metamask',
    name: 'Confirmation',
    icon: StepperMetaMaskIcon,
    longName: 'Сonfirmation',
    description: 'Once you click on the button below, you will get redirected to your MetaMask account. Submit a transaction fee to create your organization profile.',
    cta: 'Create profile'
  }
];
