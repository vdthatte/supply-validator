import React, { Component } from 'react';
import logo from './logo.svg';
import CSVReader from "react-csv-reader";
import './App.css';
import { forStatement, file } from '@babel/types';
import { CSVLink, CSVDownload } from "react-csv";
import ReactFileReader from 'react-file-reader';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      items : [],
      approved: [],
      isDataPresent : false,
      isLoading: false,
      index: 0,


      image_url: "",
      description: "",
      store_id: "",
      store_name: "",
      item_id: "",
      item_name: "",
      item_brand: "",
      item_size: "",
    

    }

    this.handleClick = this.handleClick.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.nextTapped = this.nextTapped.bind(this);
    this.prevTapped = this.prevTapped.bind(this);

  }

  handleFiles(files){
    var that = this;
    var items = []
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
        var data = reader.result;
        var json = JSON.parse(data);
        for(var i=0; i<json.length; i++){
          items.push(json[i]);
        }

        that.setState({
          isDataPresent: true,
          items: items,

          image_url: items[0].image,
          description: items[0].description,
          store_id: items[0].store_id,
          store_name: items[0].store_name,
          item_id: items[0].item_id,
          item_name: items[0].listing_name,
          item_brand: items[0].brand,
          item_size: items[0].size,
        })

    });
    reader.readAsText(files[0]);
  }

  handleClick(e){
    if(e.target.name == "remove"){
      var new_items = this.state.items
      new_items.splice(e.target.value, 1) 
      this.setState({
        items: new_items
      })
    } else if(e.target.name == "approve"){
      var approvedItems = this.state.approved
      approvedItems.push(this.state.items[e.target.value]);
      this.setState({
        approved: approvedItems,
      })
    }
  }

  loadItems(){
    
  }

  prevTapped(){
    if(this.state.index > 0){
      var newIndex = this.state.index - 1
      this.setState({
        index : newIndex,
        image_url: this.state.items[newIndex].image,
        description: this.state.items[newIndex].description,
        store_id: this.state.items[newIndex].store_id,
        store_name: this.state.items[newIndex].store_name,
        item_id: this.state.items[newIndex].item_id,
        item_name: this.state.items[newIndex].listing_name,
        item_brand: this.state.items[newIndex].brand,
        item_size: this.state.items[newIndex].size
      })
    }
  }

  nextTapped(){
    if(this.state.index < this.state.items.length){
      var newIndex = this.state.index + 1
      this.setState({
        index : newIndex,
        image_url: this.state.items[newIndex].image,
        description: this.state.items[newIndex].description,
        store_id: this.state.items[newIndex].store_id,
        store_name: this.state.items[newIndex].store_name,
        item_id: this.state.items[newIndex].item_id,
        item_name: this.state.items[newIndex].listing_name,
        item_brand: this.state.items[newIndex].brand,
        item_size: this.state.items[newIndex].size
      })
    }
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.isDataPresent ? (
            <div className="uploadBtn">
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={[".json"]}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
            </div>
          ) : (
            <div>
                <div className="item">
                <div className="row">
                  <div className="col">
                    Image: <input className="item_image_url" value={this.state.items[this.state.index].image} /> 
                    <img className="item_image" src={this.state.items[this.state.index].image} width="250" height="250"/> <br/>
                    Description:
                    <p> <textarea className="item_description" value={this.state.items[this.state.index].description} rows="5"/></p>
                  </div>
                  <div className="col">
                    <br/>
                    <p>Store Id: <input className="item_store_id" value={this.state.items[this.state.index].store_id} /></p> 
                    <p>Store Name: <input className="item_store_name" value={this.state.items[this.state.index].store_name} /></p> 
                    <p>ID: <input className="item_id" value={this.state.items[this.state.index].item_id} /></p> 
                    <p>Name: <input className="item_name" value={this.state.items[this.state.index].listing_name} /> </p>
                    <p>Brand: <input className="item_brand" value={this.state.items[this.state.index].brand} /> </p>
                    <p>Size: <input className="item_size" value={this.state.items[this.state.index].size} /></p> 
                    <p>SKU: <input className="item_sku" value={this.state.items[this.state.index].sku} /> </p>
                    
                  </div>
                </div>
                <div className="downloadSection"><button>Download</button></div>
                </div>
                {/* <button key={this.state.index} value={this.state.index} name="remove" onClick={this.handleClick}>Remove</button><button value={this.state.index} key={this.state.index}  onClick={this.handleClick}>Approve</button> */}
                <button className="approveButton" onClick={this.handleClick} name="remove"><img className="approveButtonImg" src={process.env.PUBLIC_URL + '/close.png'} /></button><button className="nextbutton" onClick={this.prevTapped}><img width="10" height="20" src={process.env.PUBLIC_URL + '/left.png'} /></button>{this.state.index} of {this.state.items.length} items<button className="nextbutton" onClick={this.nextTapped}><img width="10" height="20" src={process.env.PUBLIC_URL + '/right.png'} /></button><button className="approveButton" onClick={this.handleClick} name="approve"><img className="approveButtonImg" src={process.env.PUBLIC_URL + '/check.png'} /></button>
                <br/>
                
  
                  
                  
                
            </div>


          )
        }
      </div>
    );
  }
}

export default App;
