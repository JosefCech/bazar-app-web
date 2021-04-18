import React, {Component, useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import Image from 'material-ui-image'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        position: "relative",
        overflow: "hidden"
    },
    indicators: {
        width: "100px",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        cursor: "pointer",
        transition: "200ms",
        padding: 0,
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    indicatorIcon: {
        fontSize: "15px",
    },
    active: {
        color: "#494949"
    },
    }



const MultipleFileInput = () => {
  // state that will hold the Array of objects
  // initialized with empty array
  const [files, setFiles] = useState([]);
  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  function onFileUpload(event) {
    event.preventDefault();
    // Get the file Id
    let id = event.target.id;
    // Create an instance of FileReader API
    let file_reader = new FileReader();
    // Get the actual file itself
    let file = event.target.files[0];
    file_reader.onload = () => {
      // After uploading the file
      // appending the file to our state array
      // set the object keys and values accordingly
      setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
    };
    // reading the actual uploaded file
    file_reader.readAsDataURL(file);
  }
  // handle submit button for form
  function handleSubmit(e) {
    e.preventDefault();
    console.log(files);
  }
  // button state whether it's disabled or enabled
  const [enabled, setEnabled] = useState(false);
  // using useEffect we can detect if user uploaded any file,
  // so enable submit button
  useEffect(() => {
    if (files.length === 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [files]);

  return (
    <form onSubmit={handleSubmit} className="upload--container"  style={{width:'400px', position: 'relative'}}>
      <h1> Multiple File Inputs with Signle Submit Button </h1>
      <div className="upload--button" style={{width:'400px'}}>
        <input
          onChange={onFileUpload}
          id={1}
          accept=".jpeg, .pdf"
          type="file"
          multiple
        />
      </div>
      <div className="upload--button" style={{width:'400px'}}>
        <input
          onChange={onFileUpload}
          id={2}
          accept=".jpeg, .pdf"
          type="file"
        />
      </div>
      <div className="upload--button" style={{width:'400px'}}>
        <input
          onChange={onFileUpload}
          id={3}
          accept=".jpeg, .pdf"
          type="file"
        />
      </div>
      {enabled ? (
        <button type="submit">Submit</button>
      ) : (
        <button disabled type="submit">
          Submit
        </button>
      )}
    </form>
  );
};


class StoreItemsSlide2 extends Component {
  constructor(props) {
    super(props);


        this.state = {
            active: 0,
            prevActive: 0,
            displayed: 0,
        }

        this.timer = null;
}

 render() {

  const images = [
    '2.jpg',
    '3.jpg',
    '1.jpg'
  ];

  const zoomOutProperties = {
    indicators: true,
    scale: 0.1
  }
  return (
  <div>
    <div style={{width:'600px', position: 'relative'}}>
      <Carousel style={{width:'400px'}}>
        {images.map((each, index) => <Item key={index} item={each} />)}
      </Carousel>
    </div>,
    <div style={{width:'400px', position: 'relative'}}>
    <MultipleFileInput  />
    </div>
   </div>
  )

 }
}

function Item(props)
{
    return (
        <Paper style={{
                   height: "300px",
                   width: "600px",
                   textAlign:"center"

                }}>
            <h2>{props.item}</h2>
            <p>{props.item.description}</p>


             <Image
  src={"https://bazar-photos-test.s3-eu-west-1.amazonaws.com/887e85a8-0888-4325-bec9-4d6fee23b70b/" + props.item}  imageStyle= {{ height:'200px', width: '300px',  left: "200px"}}

/>

        </Paper>
    )
}

export default withStyles(styles)(StoreItemsSlide2)