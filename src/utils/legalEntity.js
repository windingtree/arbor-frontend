import {countries} from './countries';
import { StepperGeneralIcon, StepperHostingIcon, StepperMetaMaskIcon } from '../assets/SvgComponents';
import match from './regex';

export const wizardConfig = [
  {
    type: 'step',
    name: 'Company',
    icon: StepperGeneralIcon,
    longName: 'Company Information',
    description: 'Please note that the final third step of creating a company account is to save a fingerprint of company data on the blockchain, which requires an Ethereum transaction. Please make sure you have enough funds in your wallet to cover the transaction fee.',
    sections: [
      {
        name: 'Company Information',
        type: 'section',
        fields: [
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
            name: 'Company number in local business registry',
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
        name: 'Registration Address',
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
            name: 'Office',
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
        name: 'Contact Information',
        type: 'section',
        fields: [
          {
            type: 'input',
            subtype: 'phone',
            name: 'Phone',
            orgidJsonPath: 'legalEntity.contacts[0].phone',
            validate: value => {
              if (value && !value.trim().match(match.phone)) {
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
              if (value && !value.trim().match(match.url)) {
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
              if (value && !value.trim().match(match.email)) {
                return 'Wrong email format';
              }
            }
          }
        ]
      },
      {
        name: 'Social Media',
        type: 'section',
        fields: [
          {
            name: 'Facebook',
            type: 'input',
            icon: 'facebook',
            orgidJsonPath: 'legalEntity.contacts[0].facebook',
            validate: value => {
              if (value && !value.trim().match(match.url)) {
                return 'Wrong URL';
              }
            }
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'legalEntity.contacts[0].twitter',
            validate: value => {
              if (value && !value.trim().match(match.url)) {
                return 'Wrong URL';
              }
            }
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'legalEntity.contacts[0].instagram',
            validate: value => {
              if (value && !value.trim().match(match.url)) {
                return 'Wrong URL';
              }
            }
          }
        ]
      },
      {
        name: 'Company Logo',
        type: 'section',
        fields: [
          {
            name: 'Logo',
            type: 'dropzone',
            description: 'Add a logo or any image that represents your organization. It will help you stand out in search results.',
            orgidJsonPath: 'legalEntity.media.logo',
            helperText: 'Recommended dimensions: 908х400 (at least 454x200) Format: JPG, PNG, SVG',
            validate: value => {
              if (value && !value.trim().match(match.url)) {
                return 'Media URI contains forbidden symbols';
              }
            }
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
    longName: 'Choose Data Store',
    description: 'Please choose where to store your data',
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
    name: 'Blockchain',
    icon: StepperMetaMaskIcon,
    longName: 'Save to Blockchain',
    description: 'Almost done! You are about to save a fingerprint of your company data on Ethereum blockchain. Once you click the button below, your wallet window with transaction details will open.',
    cta: 'Save'
  }
];
