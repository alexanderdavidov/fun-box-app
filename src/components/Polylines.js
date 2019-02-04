import React from 'react';
import { Polyline  } from 'react-yandex-maps';

const polylines = (props) => {
    let geometryArray = [];
    if (props.arrayPoints.length !== 0) {
      for (let i = 0; i < props.arrayPoints.length; i++) {
        geometryArray.push(props.arrayPoints[i].split(','));
      }
    }
    return (
      <Polyline
        geometry={geometryArray}
        options={{
          interactiveZIndex: true,
          draggable: true,
          balloonCloseButton: false,
          strokeColor: '#0000FF',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
    );
}

export default polylines;
