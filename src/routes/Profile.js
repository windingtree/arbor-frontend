import React, { useState } from 'react';
import history from '../redux/history';
import { Container, Typography, Button, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Components
import OrgsListItem from '../components/OrgsListItem';
//Icons, images
import EmptyListIllustration from '../assets/SvgComponents/empty-list-illustration.svg';
//styles
import colors from '../styles/colors';

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
  }
});

function Profile(props) {
  const [isSubsOpen, toggleSubsOpen] = useState(false);
  const classes = styles();
  const { ownOrgs } = props;

  return (
    <Container className={classes.rootContainer}>
      <div className={classes.headingContainer}>
        <div className={classes.titleWrapper}>
          <Typography variant={'h2'} className={classes.title}>My organizations</Typography>
        </div>
        {
          ownOrgs.length !== 0 && (
            <div>
              <Button onClick={() => history.push('/my-organizations/wizard', { type: 'legalEntity' })} className={classes.button}>
                <Typography variant={'subtitle2'} className={classes.buttonLabel}>+ Add organization</Typography>
              </Button>
            </div>
          )
        }
      </div>
      {
        ownOrgs.length === 0 ? (
          <div className={classes.emptyListContainer}>
            <div className={classes.emptyListContent}>
              <img src={EmptyListIllustration} alt={'illustration'}/>
              <div className={classes.emptyListTitleWrapper}>
                <Typography variant={'subtitle2'} className={classes.emptyListTitle}>You don’t have any organizations yet. Let’s create one!</Typography>
              </div>
              <Button onClick={() => history.push('/my-organizations/wizard', { type: 'legalEntity' })} className={classes.button}>
                <Typography variant={'subtitle2'} className={classes.buttonLabel}>+ Add your first organization</Typography>
              </Button>
            </div>
          </div>
        ) : (
          <List>
            {
              ownOrgs.map((item, index) => {
                return (
                  <OrgsListItem
                    key={index.toString()}
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    trustLevel={item.trustLevel}
                    subs={item.subs}
                    isSubsOpen={isSubsOpen}
                    toggleSubsOpen={toggleSubsOpen}
                  />
                )
              })
            }
          </List>
        )
      }
    </Container>
  )
}

export default Profile;

Profile.defaultProps = {
  ownOrgs: [
    {
      id: '0xnfjrfh774854nre7nj442jss6h',
      img: null,
      name: 'Default Organization',
      trustLevel: '5',
      subs: [
        {
          id: '0x67jrfh774854nre7ns8r8f85g',
          entityName: 'Default Organization',
          subName: 'Default subOrg',
          isSub: true,
          type: 'Travel Agency',
          entityTrustLevel: '5'
        },
        {
          id: '0x67jrfh774854nre7ns8r8f6ig',
          entityName: 'Default Organization',
          subName: 'Default subOrg with very long name',
          isSub: true,
          type: 'Hotel',
          entityTrustLevel: '5'
        },
        {
          id: '0x67jrfh774854nre7ns8r8fmju',
          entityName: 'Default Organization',
          subName: 'Default subOrg',
          isSub: true,
          type: 'Travel Agency',
          entityTrustLevel: '5'
        },
        {
          id: '0x67jrfh774854nre7ns8r8f88o',
          entityName: 'Default Organization',
          subName: 'Default subOrg',
          isSub: true,
          type: 'Insurance',
          entityTrustLevel: '5'
        },
        {
          id: '0x67jrfh774854nre7ns8r8f54f',
          entityName: 'Default Organization',
          subName: 'Suuuuuubbbooooooorg',
          isSub: true,
          type: 'Hotel',
          entityTrustLevel: '5'
        },
        {
          id: '0x67jrfh774854nre7ns8r8fnh6',
          entityName: 'Default Organization',
          subName: 'Default subOrg',
          isSub: true,
          type: 'Travel Agency',
          entityTrustLevel: '5'
        },
      ],
    },
    {
      id: '0xnfjrfh774854nre7nj44gdse6h',
      img: null,
      name: 'Another Default Organization',
      trustLevel: '5',
      subs: []
    }
  ],
};
