import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const allTodo = {
  social: {
    step: 'Step 1. Confirm social network',
    link: '/trust/social',
    title: 'Verify your social media profiles',
    description: 'Post a specific message or comment on behalf of your corporate profiles on Twitter, Facebook and Instagram to prove your ownership.'
  },
  website: {
    step: 'Step 2. Confirm Website',
    link: '/trust/website',
    title: 'Verify your website ownership',
    description: 'It’s easy to prove that a website is linked to your organization profile via a DNS record or a text file in the root directory. '
  },
  ssl: {
    step: 'Step 3. Submit LIF stake',
    link: '/trust/lif-stake',
    title: 'Submit your Líf deposit and participate in platform governance ',
    description: 'Líf deposit serves as an anti-spam protection. You are required to submit 1000 Líf ($100) for every organization profile you create.'
  },
  lif: {
    step: 'Step 4. Setup Extended SSL',
    link: '/trust/ssl',
    title: 'Request an Extended Validation Certificate',
    description: 'Request a legal entity verification from a Certificate Authority of your choice. '
  }
};

export const getTodo = (organization) => {
  const todo = [];
  if (!(organization.isSocialFBProved || organization.isSocialTWProved || organization.isSocialIGProved || organization.isSocialLNProved)) todo.push(allTodo.social);
  if (!organization.isWebsiteProved) todo.push(allTodo.website);
  if (!organization.isSslProved) todo.push(allTodo.ssl);
  if (!organization.isLifProved) todo.push(allTodo.lif);
  return todo;
};

const styles = makeStyles({
  todoItemContainer: {

  }
});

function TodoList(props) {
  const classes = styles();
  const { organization } = props;
  const { orgid } = organization;
  const todos = getTodo(organization);
  return (
    <Container>
      <Typography>To do list ({todos.length})</Typography>
      {
        todos.map(({link, title, description}, index) => {
          return (
            <Container key={index} className={classes.todoItemContainer}>
              <Grid container>
                <Grid item xs={2}>
                  Icon
                </Grid>
                <Grid item xs={8}>
                  <Typography>{title}</Typography>
                  <Typography variant={'inherit'}>{description}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Link to={{pathname: link, state: { orgid }}}>Proceed -></Link>
                </Grid>
              </Grid>
            </Container>
          )
        })
      }
    </Container>
  )
}

export default TodoList;
