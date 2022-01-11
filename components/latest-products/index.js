import React, { useState } from 'react';
import LatestProducts from './latest-products'

const index = () => {
    const [state, setState] = useState('1')
    return (
        <>
            <div>
                <div className="tab-plls">
                    <button className="p-4 font-bold" onClick={() => { setState('1') }}>New Arrival</button>
                    <button className="p-4 font-bold" onClick={() => { setState('2') }}>Best Seller</button>
                    <button className="p-4 font-bold" onClick={() => { setState('3') }}>Featured</button>
                    <button className="p-4 font-bold" onClick={() => { setState('4') }}>Special Offer</button>
                </div>
            </div>
            <div>
                {state === '1'
                    ? <LatestProducts />
                    : state === '2'
                        ? "two"
                        : state === '3'
                            ? "three"
                            : state === '4'
                                ? "four"
                                : ""
                }
            </div>
        </>
    )
}

export default index
