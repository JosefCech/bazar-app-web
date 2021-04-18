import React, {Component,  useState, useEffect} from 'react'
import { Paper } from '@material-ui/core'
import Image from 'material-ui-image'
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import URL_BASE from "../constants/base"
import axios from 'axios';

import {Button as CoreButton} from '@material-ui/core';

import { RMIUploader } from "react-multiple-image-uploader";
import ImageUploading from 'react-images-uploading';
import DatePicker from "react-datepicker"

  const CategorySex = [
     {  key : "BOY",
        value: "boy"
     },
        {  key : "GIRL",
        value: "girl"
     },
        {  key : "BOTH",
        value: "unisex"
     },
        {  key : "WOMEN",
        value: "women"
     },
        {  key : "NA",
        value: "not-applicable"

     },
     {  key : "UNDEFINED",
        value: "undefined"
     },
     ]


  const CategoryType = [
     {  key : "CLOTHES",
        value: "clothes"
     },
     {  key : "SHOES",
        value: "shoes"
     },
     {  key : "OTHER",
        value: "other"
     },
     {  key : "UNDEFINED",
        value: "undefined"
     },
     ]


  const SeasonEnum = [
     {  key : "WINTER",
        value: "winter"
     },
     {  key : "SUMMER",
        value: "summer"
     },
     {  key : "ALL",
        value: "whole-yea"
     },
     {  key : "UNDEFINED",
        value: "undefined"
     },
     ]


  const ClothesSizeEnum = [
     {  key : "BY_HEIGHT",
        value: "by_height"
     },
      {  key : "BY_AGE",
        value: "by_age"
     },
      {  key : "BY_WEIGHT",
        value: "by_weight"
     },
    {
        key : "UNDEFINED",
        value: "undefined"
     },
     ]


const  fetchImageStoreItemsData  = async (store_item_id) => {
   console.log(store_item_id)
   const response = await fetch(URL_BASE + "store-items/" + store_item_id+"/photo", {
        mode:'cors',
        method: "GET",
        headers: {

          "Content-Type": "application/json",
       },

         });
  const jsonData = await response.json();
   console.log(jsonData)
   let i = 0
   const mapped_photos = jsonData.items.map( photo => {
     i++;
     return {
       id : photo,
       dataURL :  'https://bazar-photos-test.s3-eu-west-1.amazonaws.com/'+photo,
       'data_url' : 'https://bazar-photos-test.s3-eu-west-1.amazonaws.com/'+photo

     }
   });
   console.log(mapped_photos)
   return mapped_photos
  };



const MultipleFileInput2 = (uploaded_data) => {
 const [visible, setVisible] = useState(false);
 const [storeItemId,setStoreItemId] = useState(uploaded_data.store_item_id)
 const [photos, setPhotos] = useState( uploaded_data.photos || [])

  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
    const form_data = new FormData()
       for(var x = 0; x< data.length; x++) {

       form_data.append(data[x].file.name, data[x].dataURL)
   }
    //const store_item_id = "887e85a8-0888-4325-bec9-4d6fee23b70b";
     const headers = {
        'Content-Type': 'image/jpeg'
      };
     console.log(storeItemId);
     axios.post(URL_BASE + "file/"+storeItemId , form_data, { headers  })
     uploaded_data.reload_images()
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);

      const headers = {
        'Content-Type': ' application/json'
      };
    axios.delete(URL_BASE + "file/"+id ,{}, { headers  })
     uploaded_data.reload_images()
  };
 console.log(uploaded_data.photos)


  return (

      <RMIUploader
        isOpen={true}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={uploaded_data.photos}
      />

  );
}


class StoreItemsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      advertisementInfoChecked : props.rowItem.advertisementInfo != null,
      soldInfoBoxChecked : props.rowItem.soldInfo != null,
      photos : []
    };

    this.onFetchOnSave = props.fetchOnSave
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSoldCheckbox = this.handleChangeSoldCheckbox.bind(this)
    this.handleChangeAdvertisementtCheckbox = this.handleChangeAdvertisementtCheckbox.bind(this)
    this.mainDescription= this.mainDescription.bind(this)
    this.mainProperties= this.mainProperties.bind(this)
    this.mainPrices= this.mainPrices.bind(this)
    this.advertisementInfo = this.advertisementInfo.bind(this)
    this.soldInfo =  this.soldInfo.bind(this)
    this.loadImages = this.loadImages.bind(this)
    this.multiUploadArea = this.multiUploadArea.bind(this)
  }
  // Images //
  loadImages() {
  console.log('images')
    fetchImageStoreItemsData(this.state.rowItem.id).then(data => {
         this.setState({photos: data})
    })
    console.log(this.state.rowItem.id)
    return this.state.photos
  }


   componentDidMount() {
      console.log("mount images")
      this.loadImages();

  }


  handleSubmit(event) {
   event.preventDefault();
  if  (!this.state.advertisementInfoChecked) {
     this.state.rowItem.advertisementInfo = null
     }

     if  (!this.state.soldInfoBoxChecked) {
     this.state.rowItem.soldInfo = null
     }


    fetch("https://jgfnvpor2j.execute-api.eu-west-1.amazonaws.com/v0/store-items/"+ this.state.rowItem.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...this.state.rowItem})

        }).then((response) =>
      {
         console.log( response.json()) // << This is the problem
      });
     console.log(this.state.rowItem)
     this.onFetchOnSave({...this.state.rowItem})
  }


  handleInputChange(event) {
    const target = event.target;
    console.log(event)
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const item = this.state.rowItem

    if (name.includes("size."))
    {
        const innerName = name.replace("size.","")
        const   updated_size = item.size
        updated_size[innerName] = value
        item["size"] = updated_size
         this.setState({
      "size": { ...updated_size }
    });
    }
    else if (name.includes("advertisement_info.")) {
        const innerName = name.replace("advertisement_info.","")
        const   updated_object = item.advertisementInfo ? item.advertisementInfo : {}
        updated_object[innerName] = value
        item["advertisementInfo"] = updated_object

    }
     else if (name.includes("sold_info.")) {
        const innerName = name.replace("sold_info.","")
        const   updated_object = item.advertisementInfo ? item.advertisementInfo : {}
        updated_object[innerName] = value
       item["soldInfo"] = updated_object
    }
    else {

     item[name] = value

    }
    console.log(item)
    this.setState({
      ...this.state,
      rowItem: item

    });
    }



  handleChangeSoldCheckbox(event) {
     this.setState({
      soldInfoBoxChecked : !this.state.soldInfoBoxChecked
    });
  }

  handleChangeAdvertisementtCheckbox(event) {
    this.setState({
      advertisementInfoChecked : !this.state.advertisementInfoChecked
    });
  }


  mainDescription() {
   const item = this.state.rowItem
   return (
      <FormGroup>
        <Row form>
              <Col md="2" className="form-group">
                <label htmlFor="name">Name</label>
                <FormInput
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={item.name ? item.name : ""}
                   onChange={this.handleInputChange}
                />
              </Col>
               <Col md="2" className="form-group">
                <label htmlFor="brand">Name</label>
                <FormInput
                  id="brand"
                  name="brand"
                  placeholder="Brand"
                  value={item.brand ? item.brand : ""}
                   onChange={this.handleInputChange}
                />
              </Col>
              <Col md="3">
                <label htmlFor="longName">Detailed name</label>
                <FormTextarea
                  id="longName"
                  name="longName"
                  placeholder="Detailed name"
                  value={item.longName  ? item.longName : ""}
                   onChange={this.handleInputChange}
                />
              </Col>
                <Col md="5">
                <label htmlFor="description">Description</label>
                <FormTextarea
                  id="description"
                  placeholder="Description"
                  value={item.description  ? item.description : ""}
                   onChange={this.handleInputChange}
                />
              </Col>
            </Row>
              </FormGroup>
   )

  }

  mainProperties() {
    const item = this.state.rowItem
    return (

              <FormGroup>
               <Row form>
              <Col md="1" className="form-group">
              <label htmlFor="categorySex">Category</label>
                <FormSelect id="categorySex" name="categorySex" defaultValue={item.categorySex ? item.categorySex : "not_applicable"} onChange={this.handleInputChange}>
                     {
                      CategorySex.map((option, index) => {

                       return  <option key={option.key} value={option.value} >{option.value}</option>
                      })
                     }

                    </FormSelect>
                        </Col>
                     <Col md="2" className="form-group">
                 <label htmlFor="season">Season  category</label>
                <FormSelect id="season" name="season" defaultValue={item.season ?item.season : "undefined" } onChange={this.handleInputChange}>
                     {
                      SeasonEnum.map((option, index) => {

                       return  <option key={option.key} value={option.value} >{option.value}</option>
                      })
                     }

                    </FormSelect>
                   </Col>
                    <Col md="1" className="form-group">
                 <label htmlFor="categoryType">Category</label>
                <FormSelect id="categoryType" name="categoryType" defaultValue={item.categoryType ?item.categoryType : "other" } onChange={this.handleInputChange}>
                     {
                      CategoryType.map((option, index) => {

                       return  <option key={option.key} value={option.value} >{option.value}</option>
                      })
                     }

                    </FormSelect>
                   </Col>
                         <Col md="2" className="form-group">
                 <label htmlFor="subcategory">Category subtype</label>
                <FormInput
                  id="categorySubtype"
                  name="categorySubtype"
                  placeholder="categorySubtype"
                  value={item.categorySubtype ? item.categorySubtype : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
              <Col md="1" className="form-group">
                 <label htmlFor="clothesSize">Size  category</label>
                <FormSelect id="clothesSize" name="size.typeSize" defaultValue={item.size.typeSize ? item.size.typeSize : "undefined"} onChange={this.handleInputChange}>
                     {
                      ClothesSizeEnum.map((option, index) => {

                       return  <option key={option.key} value={option.value} >{option.value}</option>
                      })
                     }

                    </FormSelect>
                   </Col>

                       <Col md="1" className="form-group">
                 <label htmlFor="min_size">Min</label>
                 <FormInput
                  id="min_size"
                   name="size.min"
                  placeholder="Minimal size"
                  value={item.size.min ? item.size.min : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
                       <Col md="1" className="form-group">
                 <label htmlFor="max_size">Max</label>
                <FormInput
                  id="max_size"
                  name="size.max"
                  placeholder="Maximal size"
                  value={item.size.max ? item.size.max : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
                    </Row>
            </FormGroup>

    )
  }
  mainPrices() {
    const item = this.state.rowItem
   return (
        <FormGroup>
             <Row>
              <Col md="1" className="form-group">
                 <label htmlFor="original_price">Original price</label>
                <FormInput
                  id="original_price"
                  name="originalPrice"
                  placeholder="Original price"
                  value={item.originalPrice ? item.originalPrice : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
                <Col md="2" className="form-group">
                 <label htmlFor="purchase_price">Purchase price</label>
                 <FormInput
                  id="purchase_price"
                  name="purchasePrice"
                  placeholder="Purchase  price"
                  value={item.purchasePrice ? item.purchasePrice : ""}
                   onChange={this.handleInputChange}
                />
                  </Col>
                    </Row>
                    </FormGroup>
   )

  }
  advertisementInfo() {
    const item = this.state.rowItem
   return (
         <FormGroup>
        <Row form>
                <Col md="5">
                <label htmlFor="advertisement_info.description">Description</label>
                <FormTextarea
                  id="advertisement_info.description"
                  name="advertisement_info.description"
                  placeholder="Description"
                  value={item.advertisementInfo && item.advertisementInfo.description  ? item.advertisementInfo.description : ""}
                   onChange={this.handleInputChange}
                />
              </Col>
               <Col  md="2" className="form-group">
                 <label htmlFor="advertisement_info.advertisedPrice">Advertised price</label>
                <FormInput
                  id="advertisement_info.advertisedPrice"
                  name="advertisement_info.advertisedPrice"
                  placeholder="Advertised price"
                  value={item.advertisementInfo && item.advertisementInfo.advertisedPrice ?  item.advertisementInfo.advertisedPrice : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
                <Col md="2" className="form-group">
                 <label htmlFor="advertisement_info.requestedPrice">Requested price</label>
                 <FormInput
                  id="advertisement_info.requestedPrice"
                  name="advertisement_info.requestedPrice"
                  placeholder="Requested  price"
                  value={item.advertisementInfo && item.advertisementInfo.requestedPrice ?  item.advertisementInfo.requestedPrice : ""}
                   onChange={this.handleInputChange}
                />
                  </Col>

            </Row>
              </FormGroup>
   )

  }
   soldInfo() {
     const item = this.state.rowItem
      console.log(item)
   return (
         <FormGroup>
        <Row form>
                 <Col  md="2" className="form-group">
                 <label htmlFor="sold_info.givenPrice">Original price</label>
                <FormInput
                  id="sold_info.givenPrice"
                  name="sold_info.givenPrice"
                  placeholder="Given price"
                   value={item.soldInfo && item.soldInfo.givenPrice ?  item.soldInfo.givenPrice : ""}
                   onChange={this.handleInputChange}
                />
                   </Col>
                <Col md="2" className="form-group">
                 <label htmlFor="sold_info.postage">Postage</label>
                 <FormInput
                  id="sold_info.postage"
                  name="sold_info.postage"
                  placeholder="0"
                 value={item.soldInfo && item.soldInfo.postage ?  item.soldInfo.postage : ""}
                   onChange={this.handleInputChange}
                />

                  </Col>
                   <Col md="2" className="form-group">
                   <label htmlFor="sold_info.soldDate">Sold date</label>
                    <div>
                    <DatePicker
                    id="sold_info.soldDate"
                  name="sold_info.soldDate"
                    placeholderText="Unknown"
                   className="form-control"
      closeOnScroll={true}
      selected={item.soldInfo && item.soldInfo.soldDate ?  new Date(item.soldInfo.soldDate) : new Date()}
      isClearable
      onChange={(date) => this.handleInputChange({target: { type : "dateinput", value: date, name : "sold_info.soldDate"}})}
    /></div>
                  </Col>
            </Row>
              </FormGroup>
   )

  }

  multiUploadArea(){

         const maxNumber = 69;
        const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({photos: imageList});
  };


  const onImageRemove2 = (index: number | Array<number>): void => {
    const updatedList = [...this.state.photos];
    if (Array.isArray(index)) {
      index.forEach((i) => {
        updatedList.splice(i, 1);
      });
    } else {
      updatedList.splice(index, 1);
    }
    onChange?.(updatedList, index);
  };

   return (    <ImageUploading
        multiple
        value={this.state.photos}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {

        ({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove2,
          isDragging,
          dragProps,
        }) => (

          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove2(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading> )
  }

 render() {
    console.log("multiupload");
       console.log(this.state.photos)
    return (
    <div>
     <Form onSubmit={this.handleSubmit}>
           { this.mainDescription() }
            { this.mainProperties() }
            {this.mainPrices()}

                    <Row>
                    <Col md="1" className="form-group">
                    <FormCheckbox
        toggle
        checked={this.state.advertisementInfoChecked}
        onChange={this.handleChangeAdvertisementtCheckbox}>
         Advertisement
      </FormCheckbox>
      </Col>
      </Row>
      { this.state.advertisementInfoChecked && this.advertisementInfo() }
      <Row>
      <Col>
       <FormCheckbox
        toggle
        checked={this.state.soldInfoBoxChecked}
        onChange={this.handleChangeSoldCheckbox}>
         Sold
      </FormCheckbox>
                    </Col>
                    </Row>
                { this.state.soldInfoBoxChecked && this.soldInfo() }
            <Button type="submit" onSubmit={this.handleSubmit}>Update data</Button>


          </Form>

     { this.multiUploadArea() }
</div>
    )
}

}

function Item(props)
{
    return (
        <Paper style={{
                   height: "300px",

                   textAlign:"center"

                }}>
            <h2>{props.item}</h2>
            <p>{props.item.description}</p>
            <CoreButton  onClick={() => { alert('clicked ' + props.item) }} >
                Remove photo
            </CoreButton>

             <Image
  src={"https://bazar-photos-test.s3-eu-west-1.amazonaws.com/" + props.item}  imageStyle= {{ height:'200px', width: '300px',  left: "40%"}}

/>

        </Paper>
    )
}


export default StoreItemsForm