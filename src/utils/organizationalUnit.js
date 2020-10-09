import { countries } from './countries';
import { StepperGeneralIcon, StepperHostingIcon, StepperMetaMaskIcon } from '../assets/SvgComponents';

export const wizardConfig = [
  {
    type: 'step',
    name: 'Unit Info',
    icon: StepperGeneralIcon,
    longName: 'Unit Information',
    description: 'A business or organizational unit can be anything: a department within your company (legal, accounting, etc.), a business operated by it (Acme Anvils Main St.), etc. An Ethereum transaction will be required to create a business unit.',
    sections: [
      {
        name: 'Basics',
        type: 'section',
        fields: [
          {
            type: 'input',
            name: 'Unit name',
            required: true,
            orgidJsonPath: 'organizationalUnit.name',
            validate: value => {
              if (!value) {
                return 'Required field';
              }
            }
          },
          {
            type: 'input',
            name: 'Unit type (comma-separated list of tags, e.g. hotel, boutique, luxury)',
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
            name: 'Unit description (limit 255 symbols)',
            orgidJsonPath: 'organizationalUnit.description',
            validate: value => {
              if (value && value.length > 255) {
                return 'Description is too long';
              }
            }
          },
          {
            type: 'input',
            name: 'Long description',
            orgidJsonPath: 'organizationalUnit.longDescription'
          }
        ]
      },
      {
        name: 'Address (optional)',
        type: 'section',
        fields: [
          {
            type: 'select',
            name: 'Country',
            options: countries,
            orgidJsonPath: 'organizationalUnit.address.country'
          },
          {
            type: 'input',
            name: 'State or region',
            orgidJsonPath: 'organizationalUnit.address.subdivision'
          },
          {
            type: 'input',
            name: 'City',
            orgidJsonPath: 'organizationalUnit.address.locality'
          },
          {
            type: 'input',
            name: 'Street, building',
            orgidJsonPath: 'organizationalUnit.address.streetAddress'
          },
          {
            type: 'input',
            name: 'Office',
            orgidJsonPath: 'organizationalUnit.address.premise'
          },
          {
            type: 'input',
            name: 'Postal code',
            orgidJsonPath: 'organizationalUnit.address.postalCode'
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
              if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
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
        name: 'Social media',
        type: 'section',
        fields: [
          {
            name: 'Facebook',
            type: 'input',
            icon: 'facebook',
            orgidJsonPath: 'organizationalUnit.contacts[0].facebook',
            validate: value => {
              if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                return 'Wrong URL';
              }
            }
          },
          {
            name: 'Twitter',
            type: 'input',
            icon: 'twitter',
            orgidJsonPath: 'organizationalUnit.contacts[0].twitter',
            validate: value => {
              if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                return 'Wrong URL';
              }
            }
          },
          {
            name: 'Instagram',
            type: 'input',
            icon: 'instagram',
            orgidJsonPath: 'organizationalUnit.contacts[0].instagram',
            validate: value => {
              if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
                return 'Wrong URL';
              }
            }
          },
          {
            name: 'Logo',
            type: 'dropzone',
            orgidJsonPath: 'media.logo',
            description: '',
            helperText: 'Recommended dimensions: 908х400 (minimal: 454x200)\nFormat: JPG, PNG',
            validate: value => {
              if (value && !value.trim().match(/^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/)) {
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
    name: 'Blockchain',
    icon: StepperMetaMaskIcon,
    longName: 'Save to Blockchain',
    description: 'Almost done! You are about to save a fingerprint of your business unit data on Ethereum blockchain. Once you click the button below, your wallet window with transaction details will open.',
    cta: 'Save'
  }
];
