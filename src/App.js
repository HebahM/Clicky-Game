import React from 'react';
import {Component} from 'react'
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import images from "./images.json";

class App extends Component {

  state = {
    images,
    score: 0,
    topScore: 0,
    imageClicked: []
  }
  shuffle = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  playGame = (event) => {
    console.log("button clicked")
    console.log(event.target.id)
    this.setState({imageClicked: this.state.imageClicked.concat(event.target.id)})
    console.log("imageclicked array: " + this.state.imageClicked)

    if (this.state.imageClicked.indexOf(event.target.id) === -1) {
      console.log("new click")
      this.setState({score: this.state.score+1})
    }
    else {
      console.log("already clicked")
      console.log(this.state.imageClicked, event.target.id)
      this.resetGame();
    }
    // for (var i = 0; i < this.state.imageClicked.length-1; i++) {
    //   if (event.target.id === this.state.imageClicked[i]) {
    //     console.log("already clicked")
    //     console.log(this.state.imageClicked[i], event.target.id)
    //     this.resetGame();
    //   } else {
    //     console.log("new click")
    //     this.setState({score: this.state.score+1})
    //   }
    // }

    if (this.state.score > this.state.topScore) {
      this.setState({topScore: this.state.score})
    }

    this.shuffle(images);
    console.log(this.state.imageClicked);
  }

  shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
  resetGame = () => {
    this.setState({score: 0})
    this.setState({imageClicked: []})
    alert("you alredy clicked that picture")
  }

  render() {
    return (
      <div className="App">
        <Navbar />
    <p>Score: {this.state.score}</p>
    <p>Top Score: {this.state.topScore}</p>
        <div id="images">
          {images.map(image => (
            <img
              src={image.url}
              id={image.id}
              alt={image.name}
              key={image.id}
              width="175px"
              height="175px"
              onClick={this.playGame}
            />

          ))}
        </div>
      </div>
    )}
}

export default App;
