import ProductItem from '../product-item';

// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

const ProductsCarousel = ({ products }) => {
  console.log("productsssssssssss", products)
  if (!products) return 'Loading';

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop={false}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        className="swiper-wrapper">
        {products.map(item => (
          <SwiperSlide key={item._id}>
            <ProductItem
              discount={item.discount}
              price={item.price}
              currentPrice={item.currentPrice}
              key={item._id}
              id={item._id}
              productImage={item.images.length !== 0 && item.images[0].url}
              name={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductsCarousel