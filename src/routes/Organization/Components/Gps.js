import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../styles/colors';
import PositionDialog from '../../../components/PositionDialog';
import ShowMap from '../../../components/ShowMap';
import CopyTextComponent from '../../../components/CopyTextComponent';
import CopyIcon from '../../../assets/SvgComponents/copy-icon.svg';
import {
  strCenterEllipsis
} from "../../../utils/helpers";

const styles = makeStyles({
  content: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    // padding: '20px 0',
    marginBottom: '40px'
  },
  titleWrapper: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
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
  coordinatesSubtitle: {
    marginTop: '15px'
  }
});

const Gps = props => {
  const classes = styles();
  const {
    canManage,
    organization
  } = props;
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleCloseAddDialog = position => {
    setAddDialogOpen(false);
  };

  let isCoordinates;
  let addressKey;

  if (organization && organization.jsonContent) {
    addressKey = organization.orgidType === 'legalEntity'
      ? 'registeredAddress'
      : 'address';
    isCoordinates = organization.jsonContent[organization.orgidType] &&
      organization.jsonContent[organization.orgidType][addressKey] &&
      organization.jsonContent[organization.orgidType][addressKey].gps;
  } else {
    return null;
  }

  if (!isCoordinates && !canManage) {
    return null;
  }

  let gpsLabel = '';

  if (isCoordinates) {
    gpsLabel = strCenterEllipsis(organization.jsonContent[organization.orgidType][addressKey].gps, 12);
  }

  return (
    <Container>
      <div className={classes.content}>
        <div className={classes.titleWrapper}>
          <Typography variant={'inherit'}>GPS Coordinates</Typography>
        </div>
        <PositionDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
          organization={organization}
        />
        {isCoordinates &&
          <div>
            <ShowMap position={organization.jsonContent[organization.orgidType][addressKey].gps.split(',')} />
            <div className={classes.coordinatesSubtitle}>
              <CopyTextComponent
                title='Coordinates are copied to clipboard'
                text={organization.jsonContent[organization.orgidType][addressKey].gps}
                label={gpsLabel}
                color='rgb(94, 102, 106)'
                fontWeight='500'
                fontSize='14px'
                icon={CopyIcon}
              />
            </div>
          </div>
        }
        {canManage &&
          <div className={classes.buttonWrapper}>
            <Button onClick={() => setAddDialogOpen(true)} className={classes.button}>
              <Typography variant={'inherit'}>
                {
                  isCoordinates
                    ? 'Change Coordinates'
                    : 'Add Coordinates'
                }
              </Typography>
            </Button>
          </div>
        }
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Gps);
