import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const styles = makeStyles({
  mapContainer: {
    width: '100%',
    height: '300px',
    zIndex: 1,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      height: '200px'
    }
  }
});

const ShowMap = props => {
  const classes = styles();
  const {
    position
  } = props;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className={classes.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={position}
      >
        <Popup>{position[0]}, {position[1]}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ShowMap;
