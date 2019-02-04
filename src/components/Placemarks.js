// import React from 'react';
// import { Placemark  } from 'react-yandex-maps';
//
// const placemarks = (props) => {
//     let placemarks = [];
//     if (props.arrayPoints.length !== 0) {
//       for (let i = 0; i < props.arrayPoints.length; i++) {
//         placemarks.push(<Placemark
//           modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
//           onDragEnd={props.onDragEndPlacemark}
//           options={{
//             draggable: true,
//             zIndexDrag: i,
//             balloonContentLayout: '<h1>Hey</h3>'
//           }}
//           key={i}
//           geometry={props.arrayPoints[i].split(',')} />);
//       }
//     }
//     return (placemarks);
// }
//
// export default placemarks;


import React from 'react';
import { Placemark  } from 'react-yandex-maps';

const placemarks = (props) => {
    let placemarks = [];
    if (props.arrayPoints.length !== 0) {
      for (let i = 0; i < props.arrayPoints.length; i++) {
        placemarks.push(props.template && (<Placemark
          modules={['geoObject.addon.balloon']}
          onBalloonOpen={props.onBalloonOpenPlacemark}
          onDragEnd={props.onDragEndPlacemark}
          options={{
            draggable: true,
            zIndexDrag: i,
            balloonContentLayout: props.template
          }}
          key={i}
          geometry={props.arrayPoints[i].split(',')} />));
      }
    }
    return (placemarks);
}

export default placemarks;
