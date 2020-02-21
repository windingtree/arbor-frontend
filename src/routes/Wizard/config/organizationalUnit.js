import {countries} from './countries';
import Joi from '@hapi/joi';
import StepperGeneralIcon from '../../../assets/SvgComponents/StepperGeneralIcon';
import StepperDetailsIcon from '../../../assets/SvgComponents/StepperDetailsIcon';
import StepperHostingIcon from '../../../assets/SvgComponents/StepperHostingIcon';
import StepperMetaMaskIcon from '../../../assets/SvgComponents/StepperMetaMaskIcon';

export const wizardConfig = [
  {
    type: 'step',
    name: 'General',
    icon: StepperGeneralIcon,
    longName: 'General information',
    description: 'You will need at least 0.1 ether in your MetaMask account.',
    sections: [
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
        name: 'Location',
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
            name: 'Subdivision',
            orgidJsonPath: 'organizationalUnit.registeredAddress.subdivision'
          },
          {
            type: 'input',
            name: 'Locality',
            orgidJsonPath: 'organizationalUnit.registeredAddress.locality'
          },
          {
            type: 'input',
            name: 'postal code',
            orgidJsonPath: 'organizationalUnit.registeredAddress.postal_code'
          },
          {
            type: 'input',
            name: 'Street, building',
            orgidJsonPath: 'organizationalUnit.registeredAddress.street_address'
          },
          {
            type: 'input',
            name: 'Premise',
            orgidJsonPath: 'organizationalUnit.registeredAddress.premise'
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
            orgidJsonPath: 'organizationalUnit.contacts[0].phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'Website',
            orgidJsonPath: 'organizationalUnit.contacts[0].website',
            schema: Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri').label('Website')
          },
          {
            type: 'input',
            subtype: 'email',
            name: 'Email',
            orgidJsonPath: 'organizationalUnit.contacts[0].email',
            schema: Joi.string().email({tlds: { allow: false }})
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
        name: 'Main info',
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
    description: 'The description that Arbor offers two types of hosting, depending on your needs.',
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
    longName: 'MetaMask confirming',
    description: 'MetaMask also lets the user create and manage their own identities, so when a Dapp wants to perform a transaction and write to the blockchain, the user gets a secure interface to review the transaction, before approving or rejecting it.',
    cta: 'Register my organization'
  }
];
