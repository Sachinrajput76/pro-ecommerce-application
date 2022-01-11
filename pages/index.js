import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import FeaturedProducts from '../components/featured-products';
import LatestProducts from '../components/latest-products';
import DiscountedProducts from '../components/discounted-products';
import ProductsFeatured from '../components/products-featured';
import WhySection from '../components/why-section'
import Subscribe from '../components/subscribe';


const IndexPage = () => {

  return (
    <>
      <Layout>
        <PageIntro />
        <div className="Products">
          <div className="container">
            <header className="section__intro">
              <h4>Featured Products</h4>
            </header>
            <FeaturedProducts />
          </div>
        </div>

        <div className="LatestProducts">
          <div className="container">
            <header className="section__intro">
              <h4>Latest Products</h4>
            </header>
            <LatestProducts />
          </div>
        </div>
        <div className="Products">
          <div className="container">
            <header className="section__intro">
              <h4>Why Ecommerce Website!</h4>
            </header>
            <WhySection />
          </div>
        </div>
        <Subscribe />
        <div className="Products">
          <div className="container">
            <header className="section__intro">
              <h4>Trending Products</h4>
            </header>
            <FeaturedProducts />
          </div>
        </div>
        <div className="LatestProducts">
          <div className="container">
            <header className="section__intro">
              <h4>Discounted Products</h4>
            </header>
            <DiscountedProducts />
          </div>
        </div>
      </Layout >

    </>
  )
}


export default IndexPage