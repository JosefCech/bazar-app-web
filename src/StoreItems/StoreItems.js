import React, {Component} from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import StoreItemsTable from "./StoreItemsTable"
import StoreItemsForm from "./StoreItemsForm"
import StoreItemsSlide2 from "./StoreItemsSlide2"
import URL_BASE from "../constants/base"


const  fetchStoreItemsData  = async () => {

    const response = await fetch(URL_BASE + "store-items?limit=100", {
        mode:'cors',
        method: "GET",
        headers: {

          "Content-Type": "application/json",
       },

         });
  const jsonData = await response.json();
   return jsonData;
  };



class StoreItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      detail : false,
      items: []
    };
    this.tableRef = React.createRef();
    this.refreshItem = this.refreshItem.bind(this)
    this.retrieveItems = this.retrieveItems.bind(this)
    this.display_form = this.display_form.bind(this)


  }

  componentDidMount() {
      this.retrieveItems();

  }

  refreshItem( rowData1){
    const filtered = this.state.items.filter(u => u.id!=rowData1.id)

    this.setState({items: [...filtered, rowData1], detail: false, storeItem: []})


    }


  retrieveItems() {
    fetchStoreItemsData().then(data => {
         this.setState({items: data.items})
    })
    return this.state.items
  }



  display_form( rowData) {
   this.setState({items: [...this.state.items], detail: true, storeItem: rowData})
  }

  reloadData() {
  if (this.store) {
    return this.store.items
   }
   else {
    return []
   }
  }
  render() {
        console.log("render")
        console.log(this.state.items)
         let shown_component;
        if (this.state.detail)
         {
         console.log(this)
         console.log('detail')
          shown_component  =  <StoreItemsForm {...{fetchOnSave : this.refreshItem, rowItem : this.state.storeItem, photos: this.state.photos}} />;
         }
        else
         shown_component =  <StoreItemsTable items={this.state.items}  display_form={this.display_form} />;

       return (
       <div>
             {shown_component}
       </div>
       )

  }
}

export default StoreItems