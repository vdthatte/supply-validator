import React, { Component } from 'react';
import logo from './logo.svg';
import CSVReader from "react-csv-reader";
import './App.css';


class App extends Component {

  constructor(props){
    super(props);


    this.handleForce = this.handleForce.bind(this);
  
  }

  handleForce(data){
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV with secret Death Star statistics"
            onFileLoaded={this.handleForce}
          />
          <p>and then open the console</p>
        </div>
      </div>
    );
  }
}

export default App;
