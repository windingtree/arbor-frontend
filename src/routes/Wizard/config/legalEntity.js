module.exports = [
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
            values: [
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
            values: {
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
            orgidJson: 'legalEntity.contacts[0].website'
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
            type: 'hosting_selector'
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
