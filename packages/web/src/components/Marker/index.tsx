import React from 'react'

import mapIcon from '@/utils/mapIcon'
import { Marker as LeafletMarker, Popup, MarkerProps } from 'react-leaflet'

const Marker: React.FC<MarkerProps & { name?: string }> = ({
  name,
  children,
  ...rest
}) => {
  return (
    <LeafletMarker {...rest} icon={mapIcon}>
      <Popup
        closeButton={false}
        minWidth={240}
        maxWidth={240}
        className="map-popup"
      >
        {name}
        {children}
      </Popup>
    </LeafletMarker>
  )
}

export default Marker
