import React, {Component} from 'react'
import { Zoom } from 'react-slideshow-image';




class StoreItemsSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
}

 render() {
   {
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
//       /* { images.length > 0 && <Carousel autoPlay={false}>
//        {images.map((each, index) => <Item key={index} item={each} />)}
//      </Carousel > }*/
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <div key={index} style={{width: "150px"}}>
            <img style={{ objectFit: "cover", width: "100px" }} src={"https://bazar-photos-test.s3-eu-west-1.amazonaws.com/887e85a8-0888-4325-bec9-4d6fee23b70b/" + each} />
          </div>
        ))}
      </Zoom>

  )
}
 }
}

export default StoreItemsSlide