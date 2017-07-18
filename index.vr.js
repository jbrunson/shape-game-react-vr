import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import Shape, { shapes } from  './vr/components/Shape';

class Shapes extends Component {
  state = {
    gameShapes: [1, 1, 1, 1],
    score: 0,
    specialIndex: 0
  };

  componentDidMount() {
    this.newGameSet();
  }

  newGameSet() {
    let baseShapeId = Math.floor(Math.random() * shapes.length);
    let specialShapeId = baseShapeId;

    while (specialShapeId === baseShapeId) {
      specialShapeId = Math.floor(Math.random() * shapes.length);
    }

    let newGameShapes = [];

    this.state.gameShapes.map((shape, i) => {
      newGameShapes[i] = baseShapeId;
    });

    let specialIndex = Math.floor(Math.random() * newGameShapes.length);
    newGameShapes[specialIndex] = specialShapeId;

    this.setState({ gameShapes: newGameShapes, specialIndex });
  }

  pickShape(shapeIndex) {
    let { score, specialIndex } = this.state;
    specialIndex === shapeIndex ? this.setState({ score: score + 1 }) : this.setState({ score: score - 1 });
    this.newGameSet();
  }

  render() {
    return (
      <View style={styles.game}>
        <Text style={styles.text}>Find the Odd Shape!</Text>
        <Text style={styles.text}>{this.state.score}</Text>
        {
          this.state.gameShapes.map((shape, i) => {
            return (
              <View
                onEnter={() => this.pickShape(i)}
                key={i}>
                <Shape
                  shapeNum={shape}
                  colorNum={i}
                  transform={[{translate: [(i - 1.5)*1.5, 0, -5]}]} />
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    transform: [
      { translate: [-2.25, 0, 0] }
    ]
  },
  text: {
    fontSize: 0.5,
    textAlign: 'center',
    color: '#FFF',
    transform: [
      { translate: [0, 2, -5] }
    ]
  }
});


AppRegistry.registerComponent('Shapes', () => Shapes);
