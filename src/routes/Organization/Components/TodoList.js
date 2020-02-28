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


const allTodo = {
  social: {
    step: 'Step 1. Verify social network',
    link: '/trust/social',
    state: {},
    icon: socialIcon,
    title: 'Verify your social media profiles',
    description: 'Post a specific message or comment on behalf of your corporate profiles on Twitter, Facebook and Instagram to prove your ownership.'
  },
  website: {
    step: 'Step 2. Verify website',
    link: '/trust/website',
    state: {},
    icon: websiteIcon,
    title: 'Verify your website ownership',
    description: 'It’s easy to prove that a website is linked to your organization profile via a DNS record or a text file in the root directory. '
  },
  ssl: {
    step: 'Step 3. Submit LIF deposit',
    link: '/trust/lif-stake',
    state: {},
    icon: lifIcon,
    title: 'Submit your Líf deposit and participate in platform governance ',
    description: 'Líf deposit serves as an anti-spam protection. You are required to submit 1000 Líf ($100) for every organization profile you create.'
  },
  lif: {
    step: 'Step 4. Setup Extended SSL',
    link: '/trust/ssl',
    state: {},
    icon: sslIcon,
    title: 'Request an Extended Validation Certificate',
    description: 'Request a legal entity verification from a Certificate Authority of your choice. '
  }
};

export const getTodo = (organization) => {
  const todo = [];
  const jsonContent = _.get(organization, `jsonContent`, {});
  const orgidType = jsonContent.legalEntity ? 'legalEntity' : 'organizationalUnit';
  const contacts = _.get(jsonContent, `${orgidType}.contacts[0]`, {});
  const { id } = jsonContent;

  if ((contacts.twitter && !organization.isSocialTWProved) || (contacts.facebook && !organization.isSocialFBProved) || (contacts.instagram && !organization.isSocialIGProved)) {
    todo.push(Object.assign({}, allTodo.social, {state: {contacts, id }}));
  }
  let website = contacts.website;

  if (!organization.isWebsiteProved && website) {
    if (typeof website === 'string' && website.indexOf('://') === -1) website = `https://${website}`;
    todo.push(Object.assign({}, allTodo.website, {state: {website}}));
  }
  if (!organization.isSslProved) todo.push(allTodo.ssl);
  if (!organization.isLifProved) todo.push(allTodo.lif);
  return todo;
};

const styles = makeStyles({
  listTitle: {
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '28px',
    marginBottom: '20px'
  },
  todoItemContainer: {
    padding: '35px',
    marginBottom: '12px',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)'
  },
  todoTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '28px',
    marginBottom: '10px'
  },
  todoText: {
    fontSize: '16px',
    lineHeight: '28px'
  },
  buttonWrapper: {
    textAlign: 'right'
  },
  proceedButton: {
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.secondary.peach,
    textDecoration: 'none'
  }
});

function TodoList(props) {
  const classes = styles();
  const {organization} = props;
  const {orgid} = organization;
  const todos = getTodo(organization);
  return (
    <Container>
      <Typography className={classes.listTitle}>To-do list ({todos.length})</Typography>
      {
        todos.map(({link, title, description, icon, state}, index) => {
          return (
            <Card key={index} className={classes.todoItemContainer}>
              <Grid container>
                <Grid item xs={2}>
                  <img className={classes.icon} src={icon} alt="icon"/>
                </Grid>
                <Grid item xs={8}>
                  <Typography className={classes.todoTitle}>{title}</Typography>
                  <Typography variant={'inherit'}>{description}</Typography>
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
    </Container>
  )
}

export default TodoList;
