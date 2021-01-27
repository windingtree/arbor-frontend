import React from "react";

import { FormControl, MenuItem, InputLabel, Select, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = makeStyles({
  selectWrapper: {
    marginBottom: '28px'
  },
  formControl: {
    width: '100%',
    '& > .MuiInputLabel-root': {
      zIndex: 1,
      transform: 'translate(12px, 22px) scale(1)'
    },
    '& > .MuiInputLabel-shrink': {
      transform: 'translate(20px, 10px) scale(0.75)'
    }
  }
});

const SelectField = (props) => {
  const classes = styles();
  const {name, label, variant, orgidJsonPath, index, options, required, disabled,
    values, errors, touched, handleChange, handleBlur, helperText} = props;
  const optionsObj = Array.isArray(options) ? options.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : options;
  const isError = (_.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath)) || helperText;

  const getValue = () => {
    if (typeof values !== 'object') {
      return values;
    }
    // Hardcode for directories
    if(orgidJsonPath === 'organizationalUnit.type') {
      let value = _.get(values, orgidJsonPath, []);
      if(value.length > 1) {
        value.shift();
      }
      return value;

    }
    return _.get(values, orgidJsonPath, '');
  };

  const [open, setOpen] = React.useState(false);
  const customHandleChange = (event) => {
    setOpen(false);
    handleChange(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div key={index} className={classes.selectWrapper}>
      <FormControl className={classes.formControl}>
        {label &&
          <InputLabel>{label}{required ? ' *' : ''}</InputLabel>
        }
        {!label &&
          <InputLabel>{name}{required ? ' *' : ''}</InputLabel>
        }
        <Select
          variant={variant ? variant : 'filled'}
          name={orgidJsonPath ? orgidJsonPath : name}
          value={getValue()}
          required={required}
          error={isError}
          onChange={customHandleChange}
          onBlur={handleBlur}
          multiple={Array.isArray(getValue())}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          disabled={disabled}
        >
          <MenuItem value={''} key={''}/>
          {
            Object.keys(optionsObj).map((optionValue) => (
              <MenuItem value={optionValue} key={optionValue}>{optionsObj[optionValue]}</MenuItem>
            ))
          }
        </Select>
        <FormHelperText>
          {isError ? `${helperText || _.get(errors, orgidJsonPath)}`.replace('ValidationError: "value" ', '') : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default SelectField;
