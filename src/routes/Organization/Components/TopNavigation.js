import React from "react";
import _ from 'lodash';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Box, Button, Container, Hidden, Tooltip, Typography} from "@material-ui/core";
import history from "../../../redux/history";
import {ArrowLeftIcon, EyeIcon, EditIcon, InfoIcon, TrustLevelIcon, TwitterIcon, LifIcon} from '../../../assets/SvgComponents';
import SSLIcon from '../../../assets/SvgComponents/trust-ssl-icon.svg';
import DomainIcon from '../../../assets/SvgComponents/trust-domain-icon.svg';
import colors from '../../../styles/colors';

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.greyScale.common,
    fontSize: '12px',
    fontWeight: 400,
    padding: '12px',
    boxSizing: 'border-box'
  }
})(Tooltip);

const styles = makeStyles({
  itemTrustInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '15px'
  },
  publicTrustLevelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemTrustInfoBase: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '46px',
    borderRadius: '4px',
    backgroundColor: colors.primary.white,
    color: colors.greyScale.common,
    border: `1px solid ${colors.greyScale.lightest}`,
    padding: '0 22px'
  },
  itemStage: {
    color: colors.primary.white,
    width: '266px',
    boxSizing: 'border-box',
    marginLeft: '11px',
    padding: '0 26px',
    cursor: 'pointer'
  },
  tooltipRef: {
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer'
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    marginLeft: '-7px',
    opacity: .5,
    color: colors.greyScale.common,
    transition: `opacity .3s ease, color .3s ease`,
    '&:hover': {
      opacity: 1,
      color: colors.secondary.green
    }
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
  },
  itemStageTitle: {
    fontSize: '16px',
    fontWeight: 500
  },
  iconTrustLevel: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 4px 0 14px'
  },
  trustLevelValue: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    color: colors.primary.black
  },
  stageIcon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  },
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '19px',
    ['@media (max-width: 960px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '88px'
    }
  },
  buttonWrapper: {
    marginLeft: '-8px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  eyeIcon: {
    width: '15px',
    height: '12px'
  },
  editIcon: {
    width: '14px',
    height: '14px'
  },
  itemActionButton: {
    marginLeft: '20px'
  },
  itemActionButtonIcon: {
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '9px'
  },
});

function TopNavigation(props) {
  const classes = styles();
  const {organization, canManage, todos} = props;
  const {orgid: id, jsonContent, proofsQty} = organization;
  const orgidType = _.get(organization, 'orgidType', '') === 'legalEntity' ? 'legalEntity' : 'organizationalUnit';
  const editState = {action: 'edit', type: orgidType, id, jsonContent};

  const trustIcon = () => {
    if(todos[0].step.includes('1')) return <img src={DomainIcon} alt={'website'} className={classes.stageIcon}/>;
    if(todos[0].step.includes('2')) return <TwitterIcon className={classes.stageIcon}/>;
    if(todos[0].step.includes('3')) return <img src={SSLIcon} alt={'ssl'} className={classes.stageIcon}/>;
    if(todos[0].step.includes('4')) return <LifIcon viewBox={'0 0 20 20'} className={classes.stageIcon}/>;
  };

  const stepBaseBg = () => {
    if(todos[0].step.includes('1')) return colors.secondary.yellow;
    if(todos[0].step.includes('2')) return colors.secondary.cyan;
    if(todos[0].step.includes('3')) return colors.secondary.peach;
    if(todos[0].step.includes('4')) return colors.secondary.green;
  };

  return (
    <Container>
      <Box className={classes.screenHeader}>
        <div className={classes.buttonWrapper}>
          <Button onClick={history.goBack}>
            <Typography variant={'caption'} className={classes.buttonLabel}>
              <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
              Back
            </Typography>
          </Button>
        </div>
        <Hidden mdUp>
          <div className={classes.publicTrustLevelWrapper}>
            <Typography variant={'caption'} className={classes.itemTrustInfoTitle}
                        style={{color: colors.greyScale.common}}>Trust level: </Typography>
            <TrustLevelIcon className={classes.iconTrustLevel}/>
            <Typography variant={'caption'} className={classes.trustLevelValue}>{!!proofsQty ? proofsQty : '0'}</Typography>
          </div>
        </Hidden>
        {
          canManage ? (
            <div>
              <Button onClick={() => history.push(`/organization/${id}`, {id})}>
                <Typography variant={'caption'} className={classes.buttonLabel}>
                  <EyeIcon viewBox={'0 0 16 12'} className={[classes.itemActionButtonIcon, classes.eyeIcon].join(' ')}/>
                  Public organization view
                </Typography>
              </Button> {/*View*/}

              <Button
                onClick={() => history.push(`/my-organizations/${id}/edit`, editState)}
                className={classes.itemActionButton}>
                <Typography variant={'caption'} className={classes.buttonLabel}>
                  <EditIcon viewBox={'0 0 14 14 '}
                            className={[classes.itemActionButtonIcon, classes.editIcon].join(' ')}/>
                  Edit organization profile
                </Typography>
              </Button> {/*Edit*/}
            </div>
          ) : null
        }
      </Box>
      {
        canManage && (
          <div className={classes.itemTrustInfoContainer}>
            <div className={classes.itemTrustInfoBase}>
              <LightTooltip
                title={'Your Trust level reflects the number of completed trust steps.'}
                placement={'top-start'}
              >
                <button className={classes.tooltipRef}>
                  <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
                </button>
              </LightTooltip>
              <Typography variant={'caption'} className={classes.itemTrustInfoTitle}>Trust level: </Typography>
              <TrustLevelIcon className={classes.iconTrustLevel}/>
              <Typography variant={'caption'} className={classes.trustLevelValue}>{!!proofsQty ? proofsQty : '0'}</Typography>
            </div>
            {
              todos.length > 0 && (
                <div className={[classes.itemTrustInfoBase, classes.itemStage].join(' ')}
                     onClick={() => history.push(todos[0].link, {id, ...todos[0].state})}
                     style={{ backgroundColor: stepBaseBg(), borderColor: stepBaseBg() }}
                >
                  {trustIcon()}
                  <Typography variant={'caption'}
                              className={[classes.itemTrustInfoTitle, classes.itemStageTitle].join(' ')} noWrap>{todos[0].step}</Typography>
                </div>
              )
            }
          </div>
        )
      }
    </Container>
  )
}

export default TopNavigation;
