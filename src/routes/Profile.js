import React, { useEffect } from 'react';
import history from '../redux/history';
import { Container, Typography, Button, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Components
import OrgsListItem from '../components/OrgsListItem';
import JoinOrganizationItem from '../components/JoinOrganizationItem';
//Icons, images
import EmptyListIllustration from '../assets/SvgComponents/empty-list-illustration.svg';
//styles
import colors from '../styles/colors';
import { connect } from "react-redux";
import { fetchProfileOrganizations, isFetchedSelector, profileOrganizationsSelector} from "../ducks/fetchProfile";
import { selectSignInAddress } from "../ducks/signIn";
import { getJoinRequest, isJoinFetching, getJoinOrganizations } from '../ducks/join';

const styles = makeStyles({
  rootContainer: {
    paddingBottom: '40px'
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '20px 0 13px 0'
  },
  title: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  button: {
    backgroundImage: colors.gradients.green,
    borderRadius: '6px',
    textTransform: 'none',
  },
  buttonLabel: {
    color: colors.primary.white,
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.1,
    padding: '6px 12px'
  },
  emptyListContainer: {
    backgroundColor: colors.primary.white,
    border: `1px solid ${colors.greyScale.lightest}`,
    borderRadius: '8px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    boxSizing: 'border-box',
    padding: '40px',
    marginTop: '10px'
  },
  emptyListContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListTitleWrapper: {
    margin: '20px 0'
  },
  emptyListTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common,
  },
  address: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.greyScale.light,
  },
});

function Profile(props) {
  const classes = styles();
  const { organizations, address, fetchProfileOrganizations, getJoinRequest,
    isJoinFetching, joinOrganizations } = props;

  useEffect(() => {
    const profileId = sessionStorage.getItem('profileId');
    if (profileId) {
      getJoinRequest(profileId);
    }
    fetchProfileOrganizations({owner: address});
  }, [address, fetchProfileOrganizations, getJoinRequest]);

  return (
    <Container className={classes.rootContainer}>
      <div className={classes.headingContainer}>
        <div className={classes.titleWrapper}>
          <Typography variant={'h2'} className={classes.title}>My Organizations</Typography>
        </div>
        {
          (organizations.length !== 0 || Object.keys(joinOrganizations).length !== 0) && (
            <div>
              <Button onClick={() => history.push('/my-organizations/wizard', { type: 'legalEntity' })} className={classes.button}>
                <Typography variant={'subtitle2'} className={classes.buttonLabel}>Register New Organization</Typography>
              </Button>
            </div>
          )
        }
      </div>
      <div>
        {(!isJoinFetching && Object.keys(joinOrganizations).length !== 0) &&
        <List>
          {Object.keys(joinOrganizations).map(org => (
             <JoinOrganizationItem key={org} legalName={joinOrganizations[org].legalEntity.legalName} />
          ))}
        </List>
        }
      </div>
      {!isJoinFetching && organizations.length === 0 && Object.keys(joinOrganizations).length === 0 &&
      <div className={classes.emptyListContainer}>
        <div className={classes.emptyListContent}>
          <img src={EmptyListIllustration} alt={'illustration'}/>
          <Button onClick={() => history.push('/my-organizations/wizard', {type: 'legalEntity'})} className={classes.button}>
            <Typography variant={'subtitle2'} className={classes.buttonLabel}>Create Organization Account</Typography>
          </Button>
        </div>
      </div>
      }
      {organizations.length !== 0 &&
      <List>
        {organizations.map((item, index) =>
          <OrgsListItem key={index.toString()} canManage={true} organization={item}/>
        )}
      </List>
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    isJoinFetching: isJoinFetching(state),
    joinOrganizations: getJoinOrganizations(state),
    organizations: profileOrganizationsSelector(state),
    isFetched: isFetchedSelector(state),
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  fetchProfileOrganizations,
  getJoinRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
