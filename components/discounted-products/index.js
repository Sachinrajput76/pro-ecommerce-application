import React, { useState } from 'react';
import DiscountedProducts from './discounted-products'

const index = () => {
    const [state, setState] = useState('1')
    return (
        <>
            <div>
                <div className="tab-plls">
                    <button className="p-4 font-bold" onClick={() => { setState('1') }}>Wood chair</button>
                    <button className="p-4 font-bold" onClick={() => { setState('2') }}>Plastic Chair</button>
                    <button className="p-4 font-bold" onClick={() => { setState('3') }}>Sofa Collection</button>
                </div>
            </div>
            <div>
                {state === '1'
                    ? <DiscountedProducts />
                    : state === '2'
                        ? "two"
                        : state === '3'
                            ? "three"
                            : ""
                }
            </div>
        </>
    )
}

export default index
