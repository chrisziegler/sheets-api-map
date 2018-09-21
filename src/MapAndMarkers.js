import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API } from './keys';

const Marker = ({ name }) => <div>{name}</div>;

export default class MapAndMarkers extends Component {
  render() {
    const { markers } = this.props; // Destructuring our props to get the google sheets data

    // map over the array of markers to create a set of mapmarkers for our map to display. Map markers, as you can imagine, need to have lat and lng props in order for the parent map to know where to put them.
    let mapmarkers = markers.map(marker => {
      return (
        <Marker
          key={marker.id}
          lat={markers.lat}
          lng={markers.lng}
          name={markers.name}
        />
      );
    });
    /*
Call the GoogleMapReact component and pass it the api keys and google maps version in the bootstrapURLKeys prop.
Pass it the center and zoom from props.
The array of mapmarkers is given to the GoogleMapReact component (as its child) to be rendered on the map
*/
    return (
      <div style={{ height: '100vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_API,
            v: '3.32'
          }}
          center={this.props.center}
          zoom={this.props.zoom}
        >
          {mapmarkers}
        </GoogleMapReact>
      </div>
    );
  }
}
