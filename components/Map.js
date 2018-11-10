import React, { Component } from 'react'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default class Map extends Component {
  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker key={i} title={place.name} coordinate={place.coords} />
    ))
  }

  render() {
    console.log("Rendering map...")
    const { region } = this.props
    return (
      <MapView.Animated
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderMarkers()}
      </MapView.Animated>
    )
  }
}
const styles = {
  container: {
    width: '100%',
    height: '100%',
  }
}