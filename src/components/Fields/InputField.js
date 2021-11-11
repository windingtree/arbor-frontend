import React from 'react';
import _ from 'lodash';

import {TextField, InputAdornment} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FacebookIcon from '../../assets/SvgComponents/facebook-icon.svg';
import TwitterIcon from '../../assets/SvgComponents/twitter-icon.svg';
import InstagramSocialIcon from '../../assets/SvgComponents/InstagramSocialIcon';

const styles = makeStyles({
  inputWrapper: {
    marginBottom: '28px',
    '&:last-child': {
      marginBottom: '0'
    },
  },
  icon: {
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
});

const InputField = (props) => {
  const classes = styles();
  const {type, label, name, orgidJsonPath, index, helperText, icon, required, values, errors, touched, handleChange, handleBlur} = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);

  const socialIcon = () => {
    switch (icon) {
      case 'facebook':
        return <img src={FacebookIcon} alt={'icon'} className={classes.icon}/>;
      case 'twitter':
        return <img src={TwitterIcon} alt={'icon'} className={classes.icon}/>;
      case 'instagram':
        return <InstagramSocialIcon className={classes.icon}/>;
      default:
        return null;
    }
  };

  return (
    <div key={index} className={classes.inputWrapper}>
      <TextField
        type={type}
        label={label || name}
        variant={'filled'}
        name={orgidJsonPath}
        value={_.get(values, orgidJsonPath, '')}
        helperText={isError ? `${_.get(errors, orgidJsonPath)}`.replace('ValidationError: "value" ', '') : helperText}
        required={required}
        InputProps={
          icon ? (
            {
              startAdornment: (
                <InputAdornment position={'start'} className={classes.socialIconWrapper}>
                  {socialIcon()}
                </InputAdornment>
              )
            }
          ) : null}
        placeholder={icon && name.toLowerCase()+`.com/`/*TODO: fix this. Make placeholder via *.json files*/}
        fullWidth
        error={isError}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
      />
    </div>
  )
};

export default InputField;
