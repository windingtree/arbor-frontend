import React, { useEffect } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchOrganizationInfo, fetchOrganizationSubInfo, selectItem, selectSubs } from '../ducks/fetchOrganizationInfo';
import history from '../redux/history';
import { Container, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import EyeIcon from '../assets/SvgComponents/EyeIcon';
import EditIcon from '../assets/SvgComponents/EditIcon';
import OrgProfileView from '../components/OrgProfileView';

import colors from '../styles/colors';

const styles = makeStyles({
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '19px'
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

function Organization(props) {
  const classes = styles();

  const id = history.location.state ? history.location.state.id : history.location.pathname.split('/')[2];
  const canManageOrganization = history.location.pathname !== `/organization/${id}`;

  useEffect(() => {
    props.fetchOrganizationInfo({ id: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { item } = props;
  let subOrgs = _.get(item, 'subsidiaries', []);

  useEffect(() => {
    subOrgs !== 0 && subOrgs !== null && subOrgs.forEach(sub => {
      props.fetchOrganizationSubInfo({ id: sub });
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOrgs]);

  const type = item.parent ? 'entity' : 'legalEntity';
  const editState = { action: 'edit', type, id, jsonContent: item.jsonContent };
  if (type === 'entity') {
    editState.parent = item.parent;
  }

  return (
    <div>
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
          {
            canManageOrganization ? (
              <div>
                <Button onClick={() => history.push(`/organization/${id}`, {id})}>
                  <Typography variant={'caption'} className={classes.buttonLabel}>
                    <EyeIcon viewBox={'0 0 16 12'} className={[classes.itemActionButtonIcon, classes.eyeIcon].join(' ')}/>
                    Public organization view
                  </Typography>
                </Button> {/*View*/}

                <Button
                    onClick={() => history.push('/my-organizations/wizard', editState)}
                    className={classes.itemActionButton}>
                  <Typography variant={'caption'} className={classes.buttonLabel}>
                    <EditIcon viewBox={'0 0 14 14 '} className={[classes.itemActionButtonIcon, classes.editIcon].join(' ')}/>
                    Edit organization profile
                  </Typography>
                </Button> {/*Edit*/}
              </div>
            ) : null
          }
        </Box>
      </Container>
      <OrgProfileView item={item} subs={props.subs} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    item: selectItem(state),
    subs: selectSubs(state)
  }
};

const mapDispatchToProps = {
  fetchOrganizationInfo,
  fetchOrganizationSubInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
