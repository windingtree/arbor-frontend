const Joi = require('@hapi/joi');

export const wizardConfig = [
  {
    type: 'step',
    name: 'General',
    longName: 'General information',
    description: 'You will need at least 0.1 ether in your MetaMask account.',
    sections: [
      {
        name: 'Main info',
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
            orgidJson: 'legalEntity.legalType'
          },
          {
            type: 'input',
            name: 'Legal name',
            required: true,
            orgidJson: 'legalEntity.legalName'
          },
          {
            type: 'input',
            name: 'Registration number',
            helperText: 'That\'s the number in country-specific business registry',
            orgidJson: 'legalEntity.legalIdentifier'
          }
        ]
      },
      {
        name: 'Location',
        type: 'section',
        fields: [
          {
            type: 'select',
            name: 'Country',
            options: {
              'UA': 'Ukraine',
              'UK': 'United Kingdom',
              'US': 'United States'
            },
            required: true,
            orgidJson: 'legalEntity.registeredAddress.country'
          },
          {
            type: 'input',
            name: 'City'
          },
          {
            type: 'input',
            name: 'Street, building',
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
            orgidJson: 'legalEntity.contacts[0].phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'Website',
            orgidJson: 'legalEntity.contacts[0].website',
            schema: Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri')
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
            orgidJson: 'legalEntity.contacts[0].facebook',
          },
          {
            name: 'Twitter',
            type: 'input',
            orgidJson: 'legalEntity.contacts[0].twitter',
          },
          {
            name: 'Instagram',
            type: 'input',
            orgidJson: 'legalEntity.contacts[0].instagram',
          },
          {
            name: 'social media #',
            type: 'Field generator'
          },
          {
            name: 'Logo',
            type: 'image_link_with_upload',
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
    name: 'Hosting',
    longName: 'Hosting information',
    description: 'The description that Arbor offers two types of hosting, depending on your needs.',
    sections: [
      {
        name: 'Choose type of JSON hosting',
        type: 'section',
        fields: [
          {
            name: 'Choose type of JSON hosting',
            type: 'orgjd_json_link_with_upload'
          }
        ]
      }
    ],
    cta: 'Confirm'
  },
  {
    type: 'step',
    name: 'Confirmation',
    longName: 'MetaMask confirming',
    description: 'MetaMask also lets the user create and manage their own identities, so when a Dapp wants to perform a transaction and write to the blockchain, the user gets a secure interface to review the transaction, before approving or rejecting it.',
    cta: 'Register my organization'
  }
];
