import { countries } from './countries';
import validators from './validators'
import { StepperGeneralIcon, StepperDetailsIcon, StepperHostingIcon, StepperMetaMaskIcon } from '../assets/SvgComponents';

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
            orgidJsonPath: 'organizationalUnit.registeredAddress.country'
          },
          {
            type: 'input',
            name: 'State or region',
            orgidJsonPath: 'organizationalUnit.registeredAddress.subdivision'
          },
          {
            type: 'input',
            name: 'City',
            orgidJsonPath: 'organizationalUnit.registeredAddress.locality'
          },
          {
            type: 'input',
            name: 'Street, building',
            orgidJsonPath: 'organizationalUnit.registeredAddress.street_address'
          },
          {
            type: 'input',
            name: 'Apartment or office',
            orgidJsonPath: 'organizationalUnit.registeredAddress.premise'
          },
          {
            type: 'input',
            name: 'Postal code',
            orgidJsonPath: 'organizationalUnit.registeredAddress.postal_code'
          },
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
            orgidJsonPath: 'organizationalUnit.contacts[0].phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'Website',
            orgidJsonPath: 'organizationalUnit.contacts[0].website',
            schema: validators.website
          },
          {
            type: 'input',
            subtype: 'email',
            name: 'Email',
            orgidJsonPath: 'organizationalUnit.contacts[0].email',
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
            orgidJsonPath: 'organizationalUnit.contacts[0].facebook',
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'organizationalUnit.contacts[0].twitter',
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'organizationalUnit.contacts[0].instagram',
          },
          {
            name: 'Logo',
            type: 'dropzone',
            orgidJsonPath: 'media[0].uri',
            description: 'Add a logo or any image that represents your organization. It will help you stand out in search results.',
            helperText: 'Recommended dimensions: 908х400 (minimal: 454x200)\nFormat: JPG, PNG'
          }
        ]
      }
    ],
    cta: 'Next'
  },
  {
    type: 'step',
    name: 'Details',
    icon: StepperDetailsIcon,
    longName: 'Details',
    description: 'You can tell us a bit more about your sub-organization or skip this step.',
    sections: [
      {
        name: 'General information',
        type: 'section',
        fields: [
          {
            type: 'input',
            name: 'Title',
            orgidJsonPath: 'organizationalUnit.details.title'
          },
          {
            type: 'input',
            name: 'Organization details',
            orgidJsonPath: 'organizationalUnit.details.details'
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
    longName: 'Confirmation',
    description: 'Once you click on the button below, you will get redirected to your MetaMask account. Submit a transaction fee to create your organization profile.',
    cta: 'Create profile'
  }
];
