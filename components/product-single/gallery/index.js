import { useState, useEffect } from 'react';

const Gallery = ({ images, picColor }) => {
  // console.log("images", images)
  // function groupBy(images, property) {
  //   return images.reduce(function (acc, obj) {
  //     let key = obj[property]
  //     if (!acc[key]) {
  //       acc[key] = []
  //     }
  //     acc[key].push(obj)
  //     return acc
  //   }, {})
  // }
  // let myImages = groupBy(images, 'url')
  console.log("images", images)

  const urlArray = images.map((items, i) => {
    return (items.url)
  })



  console.log("urlArray", urlArray)
  const [picThumbImage, setPicThumbImage] = useState(0)

  // console.log("pic thumb img", picThumbImage)
  useEffect(() => {
    setPicThumbImage(0)
  }, [picColor])
  const featImage = urlArray[picThumbImage];
  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {urlArray.map((image, i) => (
          <div key={i + 1} className="product-gallery__thumb" onClick={() => setPicThumbImage(i)}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={featImage} alt="" />
      </div>
    </section >
  );
};

export default Gallery;
