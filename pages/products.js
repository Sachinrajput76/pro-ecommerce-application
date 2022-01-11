import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';

const Products = () => (
  <Layout>
    <div className='container'>
      <Breadcrumb />
    </div>
    <section className="products-page">
      <div className="container">
        <ProductsFilter />
        <ProductsContent />
      </div>
    </section>
  </Layout>
)

export default Products
