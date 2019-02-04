import React, { Component, Fragment } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import Placemarks from './components/Placemarks';
import Polylines from './components/Polylines';
import ListPlacemarks from './components/ListPlacemarks';
import './App.css';

class App extends Component {

  state = {
    ymaps: '',
    template: null,
    mapCenterDefault: [55.75, 37.57],
    inputValue: '',
    arrayPoints: [],
  }

  createTemplateLayoutFactory = (ymaps) => {
    if (ymaps && !this.state.template) {
      this.setState({
        template: ymaps.templateLayoutFactory.createClass(
          `<h3>Точка 0</h3>`
        ),
        ymaps: ymaps
        });
      }
  };


  handleChange = (event) => {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let arrayOfInputSigns, inputValueCopy, eightyFiveDegree, oneHundredEightyDegree;

    inputValueCopy = this.state.inputValue.replace(/ +/g, "");

    arrayOfInputSigns = inputValueCopy.split('');

    arrayOfInputSigns[0] === '-' ? arrayOfInputSigns.splice(0,1) : arrayOfInputSigns.splice(0,0);
    arrayOfInputSigns[7] === '-' ? arrayOfInputSigns.splice(7,1) : arrayOfInputSigns.splice(0,0);
    arrayOfInputSigns[8] === '-' ? arrayOfInputSigns.splice(8,1) : arrayOfInputSigns.splice(0,0);

    if (
      arrayOfInputSigns[2] === '.' &&
      arrayOfInputSigns[6] === ',' &&
      arrayOfInputSigns[10] === '.' &&
      arrayOfInputSigns.length === 14
    ) {

      arrayOfInputSigns.splice(2, 1);
      arrayOfInputSigns.splice(5, 1);
      arrayOfInputSigns.splice(8, 1);

      if (!arrayOfInputSigns.some(isNaN)) {

        eightyFiveDegree = arrayOfInputSigns.slice(0, 2);
        eightyFiveDegree = Number(eightyFiveDegree.join(''));
        oneHundredEightyDegree = arrayOfInputSigns.slice(5, 8);
        oneHundredEightyDegree = Number(oneHundredEightyDegree.join(''));


        if (this.state.arrayPoints.length < 8 && eightyFiveDegree < 85 && oneHundredEightyDegree <= 180) {
          this.setState(prevState => ({
            arrayPoints: [...prevState.arrayPoints, inputValueCopy],
            inputValue: ''
          }));
        } else {
          alert('Можно внести не более 8 точек на карту.');
        }


      }
    } else {
      alert('Пожалуйста введите число следующего формата: 00.000,000.000 - где первое число широта, второе долгота. Диапазон широты в Яндекс Картах (-85, 85). Диапазон долготы в Яндекс Картах [-180, 180]. Пример 1: 55.750, 037.570. Пример 2: -55.750, -037.570.');
    }


  }

  onDragEndPlacemark = (event) => {
    let arrayPointsCopy = [...this.state.arrayPoints];
    let newCoordinates = String(event.get('target').geometry.getCoordinates());
    let indexInArray = event.get('target').options._options.zIndexDrag;
    arrayPointsCopy.splice(indexInArray, 1, newCoordinates);
    this.setState({arrayPoints: arrayPointsCopy});
  }

  onBalloonOpenPlacemark = (event) => {
    let arrayOfNumbers = [];
    let ymaps = {...this.state.ymaps}
    let arrayPointsCopy = [...this.state.arrayPoints];
    let index = event.get('target').options._options.zIndexDrag;
    let itemFromArray = arrayPointsCopy[index];
    arrayOfNumbers = itemFromArray.split(',');
    arrayOfNumbers = [Number(arrayOfNumbers[0]).toFixed(3), Number(arrayOfNumbers[1]).toFixed(3)];
    itemFromArray = arrayOfNumbers.join(', ');
    this.setState({
      template: ymaps.templateLayoutFactory.createClass(`<h3>Точка: ${index + 1}. Координаты: ${itemFromArray}.</h3>`)
    });
  }

  onClickCloseButton = (event) => {
    let arrayPointsCopy = [...this.state.arrayPoints];
    arrayPointsCopy.splice(event.target.getAttribute('keyimg'), 1);
    this.setState({arrayPoints: arrayPointsCopy});
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.arrayPoints[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 10, 10);
  };

  onDragOver = index => {
    const draggedOverItem = this.state.arrayPoints[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    let arrayPoints = this.state.arrayPoints.filter(item => item !== this.draggedItem);
    arrayPoints.splice(index, 0, this.draggedItem);
    this.setState({ arrayPoints });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };


  render() {
    return (
      <Fragment>

        <div className="FormWrapper">
          <form onSubmit={this.handleSubmit}>
            <h1>Пожалуйста введите координаты</h1>
            <label>
              <div className='Circle'></div> <br/>
              <input type="text" value={this.state.inputValue} onChange={this.handleChange} autoFocus />
            </label>
          </form>
        </div>

        <div className="WrapperListAndMap">
          <ListPlacemarks
          onDragStart={this.onDragStart}
          onDragOver={this.onDragOver}
          onDragEnd={this.onDragEnd}
          arrayPoints={this.state.arrayPoints}
          onClickCloseButton={this.onClickCloseButton} />
          <YMaps>
            <Map className="Map"
            modules={['templateLayoutFactory']}
            onLoad={this.createTemplateLayoutFactory}
            state={{
              center: this.state.arrayPoints.length > 0 ?
              this.state.arrayPoints[this.state.arrayPoints.length - 1].split(',') :
              this.state.mapCenterDefault,
              zoom: 14}}>
              <Placemarks
                onBalloonOpenPlacemark={this.onBalloonOpenPlacemark}
                template={this.state.template}
                onDragEndPlacemark={this.onDragEndPlacemark}
                arrayPoints={this.state.arrayPoints} />
              <Polylines arrayPoints={this.state.arrayPoints} />
            </Map>
          </YMaps>

        </div>

      </Fragment>
    );
  }
}

export default App;
