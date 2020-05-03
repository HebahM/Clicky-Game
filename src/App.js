import React from 'react';
import { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import images from "./images.json";

class App extends Component {

  // state = {
  //   images,
  //   score: 0,
  //   topScore: 0,
  //   imageClicked: []
  // }

  constructor() {
    super();
    this.state = {
      images,
      score: 0,
      topScore: 0,
      imageClicked: [],
      message: "Click an image"
    }
    this.playGame = this.playGame.bind(this);
    console.log(this)
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
    this.setState({ imageClicked: this.state.imageClicked.concat(event.target.id) })
    console.log("imageclicked array: " + this.state.imageClicked)

    if (this.state.imageClicked.indexOf(event.target.id) === -1) {
      console.log("new click")
      var currentScore = this.state.score
      currentScore++;
      var currentTopScore = this.state.topScore
      if (currentScore > currentTopScore) {
        currentTopScore++;
      }
      this.setState({ score: currentScore, topScore: currentTopScore, message: "You guessed correctly" })
      console.log(this.state)
    }
    else {
      console.log("already clicked")
      console.log(this.state.imageClicked, event.target.id)
      this.resetGame();
    }
    this.shuffle(images);
  }

  shuffle = (array) => {
    var randomIndex, tempItem, i;
    for (i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      tempItem = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = tempItem;
    }
    return array;
  }

  resetGame = () => {
    this.setState({ score: 0, imageClicked: [], message: "You already guessed that one" })

    // alert("you alredy clicked that picture")
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <p
        className={this.state.message === "You already guessed that one" ? "animated flash wrong": ""}
        >{this.state.message}</p>
        <p>Score: {this.state.score}</p>
        <p>Top Score: {this.state.topScore}</p>
        <div id="images" className={this.state.message === "You already guessed that one" ? "animated shake": ""}>
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
    )
  }
}

export default App;
