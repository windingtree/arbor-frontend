import { countries } from './countries';
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
          //   orgidJsonPath: 'organizationalUnit.legalType'
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
            name: 'Office',
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
      },
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
            validate: value => {}
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'organizationalUnit.contacts[0].twitter',
            validate: value => {}
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'organizationalUnit.contacts[0].instagram',
            validate: value => {}
          },
          {
            name: 'Logo',
            type: 'dropzone',
            orgidJsonPath: 'media.logo',
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
    description: 'Choose where to store your organization profile data: on Winding Tree Marketplace servers or on a hosting of your choice.',
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
