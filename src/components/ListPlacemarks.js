// import React from 'react';
// import CloseButton from '../imgs/CloseButton.svg';
//
// const listPlacemarks = (props) => {
//     let itemFromPlacemarksArray, arrayOfNumbers;
//     let liPlacemarks = [];
//
//     if (props.arrayPoints.length !== 0) {
//       for (let i = 0; i < props.arrayPoints.length; i++) {
//         itemFromPlacemarksArray = props.arrayPoints[i];
//         arrayOfNumbers = itemFromPlacemarksArray.split(',');
//         arrayOfNumbers = [Number(arrayOfNumbers[0]).toFixed(3), Number(arrayOfNumbers[1]).toFixed(3)];
//         itemFromPlacemarksArray = arrayOfNumbers.join(', ');
//         liPlacemarks.push(
//           <div key={i} className='LiWrapper'>
//             <li>{`Точка ${i+1}: ${itemFromPlacemarksArray}`}</li>
//             <img keyimg={i} onClick={props.onClickCloseButton} className='Close' src={CloseButton} alt='Close Button' />
//           </div>
//         );
//       }
//     }
//
//     return (
//       <ul>{liPlacemarks}</ul>
//     );
// }
//
// export default listPlacemarks;
import React from 'react';
import CloseButton from '../imgs/CloseButton.svg';

const listPlacemarks = (props) =>  {
  let itemFromPlacemarksArray, arrayOfNumbers;
  let liPlacemarks = [];
  if (props.arrayPoints.length !== 0) {
    for (let i = 0; i < props.arrayPoints.length; i++) {
      itemFromPlacemarksArray = props.arrayPoints[i];
      arrayOfNumbers = itemFromPlacemarksArray.split(',');
      arrayOfNumbers = [Number(arrayOfNumbers[0]).toFixed(3), Number(arrayOfNumbers[1]).toFixed(3)];
      itemFromPlacemarksArray = arrayOfNumbers.join(', ');
      liPlacemarks.push(
        <div key={i} className='LiWrapper' onDragOver={() => props.onDragOver(i)}>
          <li
            className="drag"
            draggable
            onDragStart={e => props.onDragStart(e, i)}
            onDragEnd={props.onDragEnd}
            >{`Точка ${i+1}: ${itemFromPlacemarksArray}`}</li>
            <img keyimg={i} onClick={props.onClickCloseButton} className='Close' src={CloseButton} alt='Close Button' />
        </div>
      );
    }
  }
  return (
    <ul>{liPlacemarks}</ul>
  );

}

export default listPlacemarks;
