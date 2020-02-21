import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  TextField,
  withStyles
} from "@material-ui/core";
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import CopyIdComponent from "../../../components/CopyIdComponent";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import colors from "../../../styles/colors";
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
  dialogContainer: {
    '& > .MuiDialog-paper > .MuiDialogContent-root:first-child': {
      paddingTop: '80px'
    }
  },
  dialogContentWrapper: {
    position: 'relative',
    padding: '80px 100px',
    boxSizing: 'border-box'
  },
  dialogContent: {
    // minWidth: '440px'
  },
  dialogCloseButtonWrapper: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  dialogButton: {
    padding: '4px',
    borderRadius: '50%',
    minWidth: 'auto'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest
  },
  dialogSubtitleWrapper: {
    padding: '20px 0 32px 0'
  },
  dialogSubtitle: {
    fontSize: '16px',
    lineHeight: 1.45,
    fontWeight: 400,
    color: colors.greyScale.common
  },
  formWrapper: {

  },
  inputFieldWrapper: {
    marginBottom: '28px',
    '&:last-child': {
      marginBottom: '0'
    }
  }
});

function Agents(props) {
  const classes = styles();
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const { organization } = props;
  const { owner } = organization;
  const agents = _.get(organization, `jsonContent.publicKey`, []);

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  //mui overrides
  const DialogContent = withStyles({
    root: {
      '&:first-child': {
        paddingTop: '80px'
      }
    }
  })(MuiDialogContent);

  const addAgentKeyDialog = () => {
    return (
      <Dialog onClose={handleCloseModal} open={isModalOpen} className={classes.dialogContainer}>
        <DialogContent className={classes.dialogContentWrapper}>
          <div className={classes.dialogContent}>
            <DialogActions className={classes.dialogCloseButtonWrapper}>
              <Button onClick={handleCloseModal} className={classes.dialogButton}>
                <CloseIcon/>
              </Button>
            </DialogActions>
            <Typography variant={'caption'} className={classes.dialogTitle}>Add agent key</Typography>
            <div className={classes.dialogSubtitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.dialogSubtitle}>To add an agent, enter its key and write a comment, then confirm the transaction in MetaMask.</Typography>
            </div>
            <div className={classes.form}>
              <div className={classes.inputFieldWrapper}>
                <TextField
                  variant={'filled'}
                  label={'Enter Agent Key'}
                  fullWidth
                  // value={''} // TODO handle values from state
                  // onChange={() => console.log(value)}  // TODO handle
                />
              </div>
              <div className={classes.inputFieldWrapper}>
                <TextField
                  variant={'filled'}
                  label={'Write a comment for this agent'}
                  fullWidth
                  // value={''} // TODO handle values from state
                  // onChange={() => console.log(value)}  // TODO handle
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  };

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
            <Button onClick={handleOpenModal} className={classes.button}>
              <Typography variant={'inherit'}>+ Add Agent key</Typography>
            </Button>
            {addAgentKeyDialog()}
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
