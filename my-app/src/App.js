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
      isDownloadTapped: false,
      index: 0,
      approvedItems: 0,


      image: "",
      description: "",
      store_id: "",
      store_name: "",
      item_id: "",
      listing_name: "",
      brand: "",
      size: "",
      sku: "",
      price: "",
      approved: false,

      csvData : []
    

    }

    this.buttonClick = this.buttonClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.nextTapped = this.nextTapped.bind(this);
    this.prevTapped = this.prevTapped.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.download = this.download.bind(this);

  }

  handleFiles(files){
    var that = this;
    var items = []
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
        var data = reader.result;
        var json = JSON.parse(data);

        for(var i=0; i<json.length; i++){
          var new_json = json[i];
          new_json["approved"] = false
          new_json["price"] = ""
          items.push(new_json);
        }

        that.setState({
          isDataPresent: true,
          items: items,

          image: items[0].image,
          description: items[0].description,
          store_id: items[0].store_id,
          store_name: items[0].store_name,
          item_id: items[0].item_id,
          listing_name: items[0].listing_name,
          brand: items[0].brand,
          size: items[0].size,
          approved: items[0].approved

        })

    });
    reader.readAsText(files[0]);
  }

  handleClick(e){

  }

  buttonClick(e){
    if(e.target.name == "remove"){
      var new_items = this.state.items
      new_items.splice(e.target.value, 1) 
      this.setState({
        items: new_items
      })
    } else if(e.target.name == "approve"){

      var new_items = this.state.items
      new_items[this.state.index]["image"] = this.state.image
      new_items[this.state.index]["description"] = this.state.description
      new_items[this.state.index]["store_id"] = this.state.store_id
      new_items[this.state.index]["store_name"] = this.state.store_name
      new_items[this.state.index]["item_id"] = this.state.item_id
      new_items[this.state.index]["listing_name"] = this.state.listing_name
      new_items[this.state.index]["brand"] = this.state.brand
      new_items[this.state.index]["size"] = this.state.size
      new_items[this.state.index]["approved"] = true
      new_items[this.state.index]["price"] = this.state.price

      this.setState({
        items: new_items,
        approvedItems: this.state.approvedItems + 1,
        approved: true
      })

      this.nextTapped()

    }
  }

  download(){
    var csv = []
    var head_line = ["store_id", "store_name", "item_id", "listing_name", "brand", "description", "size", "sku", "image", "price"]
    csv.push(head_line)
    for(var i=0; i<this.state.items.length; i++){
      if(this.state.items[i]["approved"]){
        var line = [this.state.items[i]["store_id"], this.state.items[i]["store_name"], this.state.items[i]["item_id"], this.state.items[i]["listing_name"], this.state.items[i]["brand"], this.state.items[i]["description"], this.state.items[i]["size"], this.state.items[i]["sku"], this.state.items[i]["image"], this.state.items[i]["price"]]
        csv.push(line)
      }
    }
    this.setState({
      csvData: csv,
      isDownloadTapped: true
    })
  }

  prevTapped(){
    if(this.state.index > 0){
      var newIndex = this.state.index - 1
      this.setState({
        index : newIndex,
        image: this.state.items[newIndex].image,
        description: this.state.items[newIndex].description,
        store_id: this.state.items[newIndex].store_id,
        store_name: this.state.items[newIndex].store_name,
        item_id: this.state.items[newIndex].item_id,
        listing_name: this.state.items[newIndex].listing_name,
        brand: this.state.items[newIndex].brand,
        size: this.state.items[newIndex].size,
        price: this.state.items[newIndex].price,
        approved: this.state.items[newIndex].approved
      })
    }
  }

  nextTapped(){
    if(this.state.index < this.state.items.length){
      var newIndex = this.state.index + 1
      this.setState({
        index : newIndex,
        image: this.state.items[newIndex].image,
        description: this.state.items[newIndex].description,
        store_id: this.state.items[newIndex].store_id,
        store_name: this.state.items[newIndex].store_name,
        item_id: this.state.items[newIndex].item_id,
        listing_name: this.state.items[newIndex].listing_name,
        brand: this.state.items[newIndex].brand,
        size: this.state.items[newIndex].size,
        price: this.state.items[newIndex].price,
        approved: this.state.items[newIndex].approved
      })
    }
  }

  handleInputChange(e){
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.isDataPresent ? (
            <div className="uploadBtn">
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={[".json"]}>
                <button className='btn'>Upload JSON file</button>
              </ReactFileReader>
            </div>
          ) : (
            <div>
                <div className="item">
                <div className="row">
                  <div className="col">
                    Image: <input className="item_image_url" value={this.state.image} name="image" onChange={this.handleInputChange}/> 
                    <img className="item_image" src={this.state.image} name="image" width="250" height="250" onChange={this.handleInputChange}/> <br/>
                    Description:
                    <p> <textarea className="item_description" name="description" value={this.state.description} rows="5" onChange={this.handleInputChange}/></p>
                  </div>
                  <div className="col">
                    <br/>
                    <p>Store Id: <input className="item_store_id" name="store_id" value={this.state.store_id} onChange={this.handleInputChange}/></p> 
                    <p>Store Name: <input className="item_store_name" name="store_name" value={this.state.store_name} onChange={this.handleInputChange}/></p> 
                    <p>ID: <input className="item_id" name="item_id" value={this.state.item_id} onChange={this.handleInputChange}/></p> 
                    <p>Name: <input className="item_name" name="listing_name" value={this.state.listing_name} onChange={this.handleInputChange}/> </p>
                    <p>Brand: <input className="item_brand" name="brand" value={this.state.brand} onChange={this.handleInputChange}/> </p>
                    <p>Size: <input className="item_size" name="size" value={this.state.size} onChange={this.handleInputChange}/></p> 
                    <p>Price: <input className="item_size" name="price" value={this.state.price} onChange={this.handleInputChange}/></p> 
                  </div>
                </div>

                <div className="downloadSection">
                  <button className="deleteButton" onClick={this.buttonClick} value="remove" name="remove">Delete</button>
                  <button className="downloadButton" onClick={this.download}>Download {this.state.approvedItems} items</button>
                  {
                    (!this.state.approved) ? (
                      <button className="approveButton" onClick={this.buttonClick} value="approve" name="approve">Approve</button>
                    ) : (
                      <button className="approveButton" value="approve" name="approve">Approved</button>
                    )
                  }
                  
                </div>

                </div>
                
                <button className="prevbutton" onClick={this.prevTapped}><img width="10" height="20" src={process.env.PUBLIC_URL + '/left.png'} /></button>{this.state.index} of {this.state.items.length} items
                <button className="nextbutton" onClick={this.nextTapped}><img width="10" height="20" src={process.env.PUBLIC_URL + '/right.png'} /></button>
                
                <br/>
                {
                  (this.state.isDownloadTapped)?(<CSVDownload data={this.state.csvData} target="_blank" />):(null)
                }
            </div>

          )
        }
      </div>
    );
  }
}

export default App;
