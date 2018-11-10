import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import Map from './components/Map'
import {
  Location,
  Permissions,
  MapView
} from 'expo'
import { Dimensions } from 'react-native'

import YelpService from './services/Yelp'

// Constants
let {
  width,
  height
} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.1
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const SHOP_CATEGORY = "indonesian"

const sanfrancisco = {
  latitude: 37.774929,
  longitude: -122.419418
}

// In the future, we can animate the region move
const region = new MapView.AnimatedRegion({
  latitude: sanfrancisco.latitude,
  longitude: sanfrancisco.longitude,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
});

const deltas = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

export default class App extends React.Component {
  state = {
    region,
    shops: [],
  }

  async componentDidMount() {
    await this.getLocationPermissions()
    await this._moveMap(sanfrancisco)
  }

  _moveMap = async (location) => {
    const shops = await YelpService.getBusinesses(location, SHOP_CATEGORY);

    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      ...deltas
    }

    this.setState({
      region,
      shops
    })
  }

  getLocationPermissions = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }
  }

  // Currently not used. :)
  getCurrentUserLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({})

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    }

    this.setState({
      region
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={this.state.region}
          places={this.state.shops}
        />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  }
}