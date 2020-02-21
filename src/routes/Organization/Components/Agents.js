import { Button, Container, Grid, Typography } from "@material-ui/core";
import CopyIdComponent from "../../../components/CopyIdComponent";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import colors from "../../../styles/colors";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = makeStyles({
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
  },
  keyIcon: {
    fontSize: 'large',
    color: colors.greyScale.common,
    verticalAlign: 'sub',
    opacity: .5,
    marginRight: '14px'
  },
  button: {
    width: '100%',
    position: 'relative',
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.cyan,
    textTransform: 'none',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
    backgroundColor: colors.primary.white,
    borderRadius: '8px',
    padding: '20px 0'
  },
  // agent
  agentsContent: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    padding: '40px 0'
  },
  agentsTitleWrapper: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  agentsSubtitle: {
    fontSize: '16px',
    lineHeight: 1.4
  },
  ownerInfoWrapper: {
    margin: '30px 0'
  },
  ownerInfo: {
    marginTop: '10px'
  },
  agentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    color: colors.greyScale.darkest,
  },
  deleteAgentButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    float: 'right',
    color: colors.secondary.peach,
    textTransform: 'none',
  },

});

function Agents(props) {
  const classes = styles();
  const { organization } = props;
  const { owner } = organization;
  const agents = _.get(organization, `jsonContent.publicKey`, []);

  return (
    <Container>
      <div className={classes.agentsContent}>
        <div className={classes.agentsTitleWrapper}>
          <Typography variant={'inherit'}>Manage owners and agents</Typography>
        </div>
        <div>
          <Typography variant={'inherit'} className={classes.agentsSubtitle}>
            Assign agents that could act on behalf of your organization. You can add public keys of your employees (or devices) that will be able to sign and encrypt communication on behalf of your organization
          </Typography>
        </div>
        <div className={classes.ownerInfoWrapper}>
          <Typography variant={'inherit'} className={classes.agentTitle}>Owner</Typography>
          <div className={classes.ownerInfo}>
            <CopyIdComponent
              id={owner || '0xLOADING'}
              leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
              fontSize={'14px'}
              color={colors.greyScale.dark}
            />
          </div>
        </div>
        <div className={classes.agentsListContainer}>
          <div className={classes.agentInfoWrapper}>
            <Typography variant={'inherit'} className={classes.agentTitle}>Agents</Typography>
          </div>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => console.log('add agent')} className={classes.button}>
              <Typography variant={'inherit'}>+ Add Agent key</Typography>
            </Button>
          </div>
          {
            agents.length !== 0 ? (
              <div>
                <ul>
                  {
                    agents.map((agent, index) => {
                      return (
                        <li key={index.toString()} className={classes.agentItemWrapper}>
                          <Grid container justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={2}>
                              <CopyIdComponent
                                id={agent.id}
                                leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                                fontSize={'14px'}
                                color={colors.greyScale.dark}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{agent.comment}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Button onClick={() => console.log('delete agent')} className={classes.deleteAgentButton}>
                                <Typography variant={'inherit'}>Delete agent key</Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            ) : (
              <div>
                <Typography>You have no agents</Typography>
              </div>
            )
          }
        </div>
      </div>
    </Container>
  )
}

export default Agents;
