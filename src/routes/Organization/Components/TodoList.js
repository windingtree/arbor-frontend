import React from "react";
import {Container, Grid, Typography, Card} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import colors from '../../../styles/colors';
import _ from 'lodash';

import websiteIcon from '../../../assets/SvgComponents/trust-step-website-icon.svg';
import socialIcon from '../../../assets/SvgComponents/trust-step-social-icon.svg';
import lifIcon from '../../../assets/SvgComponents/trust-step-lif-icon.svg';
import sslIcon from '../../../assets/SvgComponents/trust-step-ssl-icon.svg';
import MaxTrustWebsiteIcon from '../../../assets/SvgComponents/max-trust-icon-domain.svg';
import MaxTrustLifIcon from '../../../assets/SvgComponents/max-trust-icon-lif.svg';
import MaxTrustDepositIcon from '../../../assets/SvgComponents/max-trust-icon-centred.svg';
import MaxTrustSocialIcon from '../../../assets/SvgComponents/max-trust-icon-social.svg';
import MaxTrustSSLIcon from '../../../assets/SvgComponents/max-trust-icon-ssl.svg';

const allTodo = {
  website: {
    step: 'Step 1. Verify website',
    link: '/trust/website',
    state: {},
    icon: websiteIcon,
    title: 'Verify your website ownership',
    description: 'It’s easy to prove that a website is linked to your organization profile via a DNS record or a text file in the root directory. '
  },
  social: {
    step: 'Step 2. Verify social network',
    link: '/trust/social',
    state: {},
    icon: socialIcon,
    title: 'Verify your social media profiles',
    description: 'Post a specific message or comment on behalf of your corporate profiles on Twitter, Facebook and Instagram to prove your ownership.'
  },
  ssl: {
    step: 'Step 3. Setup Extended SSL',
    link: '/trust/ssl',
    state: {},
    icon: sslIcon,
    title: 'Request an Extended Validation Certificate',
    description: 'Request a legal entity verification from a Certificate Authority of your choice. '
  },
  lif: {
    step: 'Step 4. Submit Líf deposit',
    link: '/trust/lif-stake',
    state: {},
    icon: lifIcon,
    title: 'Submit your Líf deposit and participate in platform governance ',
    description: 'Líf deposit serves as an anti-spam protection. You are required to submit 1000 Líf ($100) for every organization profile you create.'
  },
};

export const getTodo = (organization) => {
  const todo = [];
  const jsonContent = _.get(organization, `jsonContent`, {});
  const name = organization.name;
  const orgidType = jsonContent.legalEntity ? 'legalEntity' : 'organizationalUnit';
  const contacts = _.get(jsonContent, `${orgidType}.contacts[0]`, {});
  const { id } = jsonContent;

  let website = contacts.website;

  if (website && !organization.isWebsiteProved) {
    if (typeof website === 'string' && website.indexOf('://') === -1) website = `http://${website}`;
    todo.push(Object.assign({}, allTodo.website, {state: {website, isWebsiteVerified: organization.isWebsiteProved}}));
  }
  if ((contacts.twitter && !organization.isSocialTWProved) || (contacts.facebook && !organization.isSocialFBProved) || (contacts.instagram && !organization.isSocialIGProved)) {
    todo.push(Object.assign({}, allTodo.social, {state: {contacts, id }}));
  }
  if (website && organization.isWebsiteProved && !organization.isSslProved) todo.push(Object.assign({}, allTodo.ssl, { state: {name, isWebsiteVerified: organization.isWebsiteProved} }));
  if (!organization.isLifProved) todo.push(allTodo.lif);
  return todo;
};

const styles = makeStyles({
  todosContainer: {
    backgroundColor: colors.greyScale.moreLighter
  },
  todosContentWrapper: {
    paddingTop: '60px',
    paddingBottom: '100px'
  },
  listTitle: {
    fontWeight: 500,
    fontSize: '24px',
    marginBottom: '20px',
    color: colors.greyScale.darkest,
  },
  todoItemContainer: {
    padding: '35px',
    marginBottom: '12px',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)'
  },
  todoTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: 1.3,
    marginBottom: '10px',
    color: colors.greyScale.darkest,
  },
  todoDescription: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  buttonWrapper: {
    textAlign: 'right'
  },
  proceedButton: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.peach,
    textDecoration: 'none'
  },
  maxTrustTitleWrapper: {
    width: '50%',
    margin: '0 auto'
  },
  maxTrustIconsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  maxTrustIcon: {
    padding: '0 20px'
  },
});

function TodoList(props) {
  const classes = styles();
  const {organization} = props;
  const {orgid} = organization;
  const todos = getTodo(organization);
  return (
    <div className={classes.todosContainer}>
      <Container className={classes.todosContentWrapper}>
        {
          todos.length > 0 ? (
            <>
              <Typography variant={'h4'} className={classes.listTitle}>To-do list ({todos.length})</Typography>
              {
                todos.map(({link, title, description, icon, state}, index) => {
                  return (
                    <Card key={index} className={classes.todoItemContainer}>
                      <Grid container>
                        <Grid item xs={2}>
                          <img className={classes.icon} src={icon} alt="icon"/>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant={'subtitle2'} className={classes.todoTitle}>{title}</Typography>
                          <Typography variant={'caption'} className={classes.todoDescription}>{description}</Typography>
                        </Grid>
                        <Grid className={classes.buttonWrapper} item xs={2}>
                          <Link className={classes.proceedButton} to={{pathname: link, state: {id: orgid, ...state}}}>Proceed
                            -></Link>
                        </Grid>
                      </Grid>
                    </Card>
                  )
                })
              }
            </>
          ) : [organization.isWebsiteProved, organization.isSocialTWProved, organization.isSocialFBProved, organization.isSocialIGProved, organization.isSslProved, organization.isLifProved].some(item => item === false) ? (
            <div>
              <Typography variant={'h4'} className={classes.listTitle} align={'center'}>To begin verification, you first need to fill out the information in the organization’s settings</Typography>
            </div>
          ) : (
            <div>
              <div className={classes.maxTrustTitleWrapper}>
                <Typography variant={'h4'} className={classes.listTitle} align={'center'}>
                You have completed all the steps and achieved
                the highest trust level. Well done!
                </Typography>
              </div>
              <div className={classes.maxTrustIconsContainer}>
                {
                  [MaxTrustWebsiteIcon, MaxTrustLifIcon, MaxTrustDepositIcon, MaxTrustSocialIcon, MaxTrustSSLIcon].map((item, index) => {
                    return (
                      <div key={index.toString()} className={classes.maxTrustIcon}>
                        <img src={item} alt={'max-trust'}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </Container>
    </div>
  )
}

export default TodoList;
