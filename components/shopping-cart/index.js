import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import { useRouter } from 'next/router'
import Item from './item';
import axios from 'axios';

const ShoppingCart = () => {
  const router = useRouter()
  const { cartItems } = useSelector(state => state.cart);

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }
    return totalPrice;
  })
  const createCheckOutSession = async () => {
    router.push('/checkout')
  };
  console.log("cartItemscartItemscartItems", cartItems)
  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: 'left' }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb.url}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table>
          }

          {cartItems.length === 0 &&
            <p>Nothing in the cart</p>
          }
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i>Continue Shopping</a>
          <input type="text" placeholder="Promo Code" className="cart__promo-code" />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>${priceTotal.toFixed(2)}</strong></p>
            {/* <a href="api/checkout_sessions" method="POST" type='submit' className="btn btn--rounded btn--yellow">Checkout</a> */}
            {/* <button onClick={() => { redirectToCheckout() }} type='submit' className="btn btn--rounded btn--yellow">Checkout</button> */}
            {console.log("cart itmes", cartItems)}
            <button
              onClick={createCheckOutSession}
              className='btn btn--rounded btn--yellow'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
};



export default ShoppingCart