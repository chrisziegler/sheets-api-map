import React, { Component } from 'react';
import MapAndMarkers from './MapAndMarkers';
import { GOOGLE_API } from './keys';
import './App.css';

const API = `https://sheets.googleapis.com/v4/spreadsheets/19yYIhYg4sMdkU5FkOdfm7qvWHCbUm6-X5gjV_GaY1AM/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${GOOGLE_API}`;

class App extends Component {
  state = {
    items: [],
    center: { lat: 37.8254957, lng: -122.4995417 },
    zoom: 10
  };

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        let { values } = data.valueRanges[0];
        const locations = values.map(([id, name, lat, lng]) => ({
          id,
          name,
          lat,
          lng
        }));
        this.setState({ items: locations });
        console.log(this.state.items);
      });
  }

  render() {
    // const listItems = this.state.items.map(item => (
    //   <li>
    //     {item.name} at Latitute {item.lat} and Longitude {item.lng}{' '}
    //   </li>
    // ));
    return (
      <div>
        {/* <ul>{listItems}</ul> */}
        <MapAndMarkers
          markers={this.state.items}
          zoom={this.state.zoom}
          center={this.state.center}
        />
      </div>
    );
  }
}

export default App;
