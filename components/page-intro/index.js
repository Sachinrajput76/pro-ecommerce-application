import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, A11y } from 'swiper';

SwiperCore.use([EffectFade, Navigation, A11y]);

const PageIntro = () => {

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/wall/download.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>New Furniture Collection Trends in 2021</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                <a href="#" className="btn-shop">Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/wall/download2.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Make your house into a home</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                <a href="#" className="btn-shop">Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* start - div with headings - display none */}
      {/* <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      {/* end div with headings - display none */}

    </section>
  )
};

export default PageIntro