import useSwr from 'swr';
import ProductItem from './../../product-item';
import ProductsLoading from './loading';

const ProductsContent = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  let { data, error } = useSwr('/api/products', fetcher);
  data = data?.products;
  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data &&
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data.map(item => (
            <ProductItem
              discount={item.discount}
              key={item._id}
              id={item._id}
              price={item.price}
              currentPrice={item.currentPrice}
              productImage={item.images.length !== 0 && item.images[0].url}
              name={item.name}
            />
          ))}
        </section>
      }
    </>
  );
};

export default ProductsContent