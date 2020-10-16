import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Dimensions } from 'react-native'

import { Container } from './styles'

import mapMarker from '../../images/mapmarker.png'

const Map: React.FC = () => {
  return (
    <Container>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -23.0784934,
          longitude: -52.4603822,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -23.0784934,
            longitude: -52.4603822
          }}
        ></Marker>
      </MapView>
    </Container>
  )
}

export default Map
