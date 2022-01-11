import React from 'react';
import useSwr from 'swr';
import ProductsCarousel from '../carousel';
import Loading from '../../components/loading'

const index = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    let { data } = useSwr('/api/products', fetcher);
    data = data?.products;
    return (
        <>
            {!data ? <Loading />
                :
                <ProductsCarousel products={data} />
            }
        </>
    )
}

export default index
