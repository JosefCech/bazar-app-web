import React, {Component} from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import StoreItemsForm from "./StoreItemsForm"
import StoreItemsSlide2 from "./StoreItemsSlide2"
import FileCopyIcon from '@material-ui/icons/FileCopy';



class StoreItemsTable extends Component {
  constructor(props) {
    super(props);
    console.log('construct')
    console.log(props)
    this.state = {
    items:  props.items,
    display_form : props.display_form,
    reloadItems : props.reloadItems
    }

    console.log(this.state)

  }

   componentDidMount() {
    // Update the document title using the browser API
   // this.setState({items: this.state.reloadItems()})
  };


  render() {
   console.log('render table')
   console.log(this.props.items)
    console.log(this)
       return (
    <MaterialTable
      tableRef={this.tableRef}
      title="Store Items "
      columns={[
        { title: 'Name', field: 'name', defaultSort:'asc' },
           { title: 'Brand', field: 'brand' },

              { title: 'Advertised', field: 'advertised',  render: rowData => rowData.advertisedInfo ? 'Advertised' : 'X' },
                 { title: 'Sold', field: 'sold' ,
                   render: rowData => rowData.soldInfo ? 'Sold' : 'X' },
                  { title: 'Purchase price', field: 'purchasePrice' },
                  { title: 'Given price', field: 'givenPrice' },

      ]}
       data={this.props.items}
        actions={[
        {
            icon: 'edit',
          tooltip: 'Show Name',
          onClick: (event, rowData) => this.state.display_form(rowData)
        }
      ]}
        detailPanel={[
        {

          icon: 'euro',
          tooltip: 'Show for data',
          render: rowData => {

            let  template_text = rowData.advertisement_info && rowData.advertisement_info.description ? rowData.advertisement_info.description : ""
            console.log(rowData)
            template_text = template_text + "Velikost " + ( parseInt(rowData.size.min) === parseInt(rowData.size.max) ? rowData.size.min : (rowData.size.min + "-" + rowData.size.max))
            if  (rowData.size.typeSize == 'by_height') {
               template_text = template_text + " cm \n"
            }
            else if  (rowData.size.typeSize == "by_weight") {
             template_text = template_text + " kg \n"
            }
            else {
             template_text += "\n"
            }

            template_text += " Cena : " +  (rowData.advertisement_info && rowData.advertisement_info.advertisedPrice ? rowData.advertisedPrice : " Kc")

            return (
                    <div style={{ padding:"20px"}}>
                    <div>
                       <label style={{ padding:"10px" }} >Title : </label>
                       <label style={{ padding:"10px" }} id="title_text">{rowData.name}</label><FileCopyIcon onClick={() => {navigator.clipboard.writeText(rowData.name)}}/>
                    </div>
                     <div>
                       <label style={{ padding:"10px" }} >Description : </label>
                       <input type="textarea" rows="100" columns="100" style={{width : "300px", height : "100px"}} value={template_text} /><FileCopyIcon onClick={() => {navigator.clipboard.writeText(template_text)}}/>
                    </div>
                    </div>
            )
          },
        },
           {
          icon: 'euro',
          tooltip: 'Update sold info',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#E53935',
                }}
              >

                {rowData.sold}
              </div>
            )
          },
        },
         {
          icon: 'add_to_photos',
          tooltip: 'Update sold info',
          render: rowData => {
            return (
                <div  style={{
                   heigh: "500px", right: "200px"
                }} >
               <StoreItemsSlide2 {...rowData}  style={{
                   heigh: "500px"
                }} />
               </div>

            )
          },
        },
        ]}

options={{
          search: true,
          exportButton: false,
         // pageSize:30,
           filtering: true
        }}
      />
    )
  }
}

export default StoreItemsTable