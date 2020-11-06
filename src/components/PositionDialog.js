import React, { useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';
import colors from '../styles/colors';
import Dialog from './Dialog';
import WizardStepHosting from './WizardStepHosting';
import WizardStepMetaMask from './WizardStepMetaMask';
import { wizardConfig as wizardConfigLegalEntity  } from '../utils/legalEntity';
import { wizardConfig as wizardConfigOrganizationalUnit  } from '../utils/organizationalUnit';
import {
  fetchOrganizationInfo
} from '../ducks/fetchOrganizationInfo';
import {
  resetTransactionStatus,
  selectPendingState,
  selectSuccessState,
  addGpsCoordinates
} from '../ducks/wizard';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

const styles = makeStyles({
  dialogContent: {
    width: '540px'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  mapContainer: {
    width: '100%',
    height: '300px'
  },
  dialogButtonWrapper: {
    display: 'table',
    paddingTop: '10px',
    margin: '0 auto'
  },
  dialogButton: {
    height: '44px',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    textTransform: 'none',
    padding: '6px 20px',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'none'
    }
  },
  dialogButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  progressWrapper: {
    display: 'table',
    margin: '0 auto'
  },
  dialogSubtitleWrapper: {
    padding: '20px 0 32px 0'
  },
  inButtonProgress: {
    marginLeft: '10px',
    marginBottom: '-3px;'
  },
  error: {
    color: colors.primary.accent,
    marginTop: '10px'
  }
});

const UseMapEventsHook = props => {
  const {
    setPosition
  } = props;
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return null;
};

const DraggableMarker = props => {
  const {
    position,
    onDragEnd
  } = props;
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const latlng = marker.getLatLng()
          onDragEnd([latlng.lat, latlng.lng]);
        }
      },
    }),
    [onDragEnd],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup>{position[0]}, {position[1]}</Popup>
    </Marker>
  )
}

const PositionDialog = props => {
  const classes = styles();
  const {
    isOpen,
    onClose,
    position: initialPosition,
    organization,
    addGpsCoordinates,
    pendingTransaction,
    successTransaction,
    resetTransactionStatus,
    fetchOrganizationInfo
  } = props;
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(initialPosition || [0, 0]);
  const [step, setStep] = useState(0);
  const [stepContent, setStepContent] = useState(null);
  const [closeProgress, setCloseProgress] = useState(false);

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geolocation => setPosition(
          [geolocation.coords.latitude, geolocation.coords.longitude]
        ),
        setError
      );
    }
  }, [initialPosition]);

  useEffect(() => {
    if (organization) {
      setStepContent(
        organization.orgidType
          ? wizardConfigLegalEntity
          : wizardConfigOrganizationalUnit
      );
    }
  }, [organization, step]);

  const handleClose = () => {
    onClose(position);
  };

  const handleNext = () => {
    setStep(currentStep => currentStep + 1);
  };

  return (
    <Dialog
      handleClose={() => handleClose()}
      isOpen={isOpen}
    >
      <div className={classes.dialogContent}>
        {step === 0 &&
          <>
            <Typography variant={'h3'} className={classes.dialogTitle}>
              Choose coordinates
            </Typography>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              className={classes.mapContainer}
            >
              <UseMapEventsHook setPosition={setPosition} />
              <EsriLeafletGeoSearch
                position='topleft'
                useMapBounds={false}
                eventHandlers={{
                  requeststart: () => console.log('Started request...'),
                  requestend: () => console.log('Ended request...'),
                  results: result => setPosition(
                    [result.latlng.lat, result.latlng.lng]
                  )
                }}
              />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <DraggableMarker
                position={position}
                onDragEnd={setPosition}
              />
            </MapContainer>
            <div className={classes.dialogButtonWrapper}>
              <Button
                className={classes.dialogButton}
                onClick={() => {
                  addGpsCoordinates(position);
                  handleNext();
                }}
              >
                <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                  Save
                </Typography>
              </Button>
            </div>
          </>
        }
        {step === 1 && stepContent &&
          <>
            <Typography variant={'h3'} className={classes.dialogTitle}>
              Select ORG.JSON storage
            </Typography>
            <WizardStepHosting
              data={stepContent}
              action={'edit'}
              handleNext={handleNext}
              key={step}
              index={step}
              stepTitle={false}
            />
          </>
        }
        {step === 2 && stepContent && !pendingTransaction && !successTransaction &&
          <>
            <Typography variant={'h3'} className={classes.dialogTitle}>
              Update ORG.JSON
            </Typography>
            <WizardStepMetaMask
              data={stepContent}
              action={'edit'}
              handleNext={handleNext}
              key={step}
              index={step}
              stepTitle={false}
            />
          </>
        }
        {step === 2 && stepContent && pendingTransaction &&
          <div className={classes.progressWrapper}>
            <Typography variant={'caption'} className={classes.dialogTitle}>
              Transaction in progress
            </Typography>
            <div className={classes.dialogSubtitleWrapper}>
              <Grid container alignItems='center' justify='center'>
                <Grid item>
                  <CircularProgress/>
                </Grid>
              </Grid>
            </div>
          </div>
        }
        {step === 2 && stepContent && successTransaction &&
          <div className={classes.progressWrapper}>
            <Typography variant={'caption'} className={classes.dialogTitle}>
              Transaction is succeed
            </Typography>
            <div className={classes.dialogButtonWrapper}>
              <Button
                className={classes.dialogButton}
                onClick={() => {
                  setCloseProgress(true);
                  setTimeout(() => {
                    fetchOrganizationInfo({ id: organization.orgid });
                    resetTransactionStatus();
                    setCloseProgress(false);
                    handleClose();
                  }, 3000);
                }}
              >
                <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                  Close
                  {closeProgress &&
                    <CircularProgress size={18} color={'secondary'} className={classes.inButtonProgress} />
                  }
                </Typography>
              </Button>
            </div>
          </div>
        }
        {error &&
          <div>
            <Typography className={classes.error}>
              {error.message}
            </Typography>
          </div>
        }
      </div>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  pendingTransaction: selectPendingState(state),
  successTransaction: selectSuccessState(state)
});

const mapDispatchToProps = {
  addGpsCoordinates,
  resetTransactionStatus,
  fetchOrganizationInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionDialog);
