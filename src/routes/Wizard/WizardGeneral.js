import React from "react";

import { Container, Typography, TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
// import colors from "../../styles/colors";

const wizardConfig = [
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
            values: ['Limited liability company']
          },
          {
            type: 'input',
            name: 'Legal name'
          },
          {
            type: 'input',
            name: 'Registration number',
            helperText: 'That\'s the number in country-specific business registry'
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
            }
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
            type: 'phone',
            name: 'Phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'website'
          }
        ]
      }
    ]
  }
];

const STEP_1 = wizardConfig[0];

const styles = makeStyles({
  sectionTitle: {
    fontStyle: 'normal',
    fontWight: 500,
    fontSize: '16px',
    lineHeight: '28px',
  }
});

const InputField = (props) => {
  const {name, helperText, index} = props;
  return (
    <Container key={index}>
      <TextField
        id={`input-${name}`}
        label={name}
        helperText={helperText}
        fullWidth
      />
    </Container>
  );
};

const SelectField = (props) => {
  const classes = styles();
  const {name, index, values} = props;
  const valuesObj = Array.isArray(values) ? values.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : values;
  return (
    <Container key={index}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{name}</InputLabel>
        <Select
          native
          fullWidth
          /*value={}*/
          /*onChange={handleChange('age')}*/
          inputProps={{
            name: name,
            id: `select-${name.replace(' ','-')}-${index}`,
          }}
        >
          {
            Object.keys(valuesObj).map((value) => (
              <option value={value} key={value}>{valuesObj[value]}</option>
            ))
          }
        </Select>
      </FormControl>
    </Container>
  );
};

const Section = (props) => {
  const classes = styles();
  let {name, fields} = props.data;
  console.log(name, fields, props);
  const knownFields = {
    'input': InputField,
    'select': SelectField
  };

  fields = fields.map((item, index) => {
    if (knownFields[item.type]) {
      return knownFields[item.type]({...item, index})
    }
  });

  return (
    <Container>
      <Typography className={classes.sectionTitle}>{name}</Typography>
      {fields}
    </Container>
  );
};

const Step = (props) => {
  let {longName, description, sections} = props.data;
  return (
    <Container>
      <Typography variant={'h3'}>Step: {longName}</Typography>
      <div>{description}</div>
      {
        sections.map((section, index) => {
          return (
            <Section data={section} key={index}/>
          )
        })
      }
      <div>[Next > ]</div>
    </Container>
  )
};

export default function WizardGeneral(/*props*/) {
  return (
    <Container>
      <Typography variant={'h2'}>WizardGeneral</Typography>
      <Container maxWidth="sm">
        <Step data={STEP_1} />
      </Container>
    </Container>
  );
}
