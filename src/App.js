import React, { Component } from "react";
import Movies from "./components/movies/movies";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Movies />
      </div>
    );
  }
}

export default App;
