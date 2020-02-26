import {countries} from './countries';
import validators from "./validators";
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
            orgidJsonPath: 'legalEntity.legalIdentifier'
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
            orgidJsonPath: 'legalEntity.registeredAddress.subdivision'
          },
          {
            type: 'input',
            name: 'City',
            orgidJsonPath: 'legalEntity.registeredAddress.locality'
          },
          {
            type: 'input',
            name: 'Street, building',
            orgidJsonPath: 'legalEntity.registeredAddress.street_address'
          },
          {
            type: 'input',
            name: 'Apartment or office',
            orgidJsonPath: 'legalEntity.registeredAddress.premise'
          },
          {
            type: 'input',
            name: 'Postal code',
            orgidJsonPath: 'legalEntity.registeredAddress.postal_code'
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
            orgidJsonPath: 'legalEntity.contacts[0].phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'Website',
            orgidJsonPath: 'legalEntity.contacts[0].website',
            schema: validators.website
          },
          {
            type: 'input',
            subtype: 'email',
            name: 'Email',
            orgidJsonPath: 'legalEntity.contacts[0].email',
            schema: validators.email
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
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'legalEntity.contacts[0].twitter',
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'legalEntity.contacts[0].instagram',
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
