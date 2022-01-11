import Layout from '../layouts/Main';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from "@emotion/styled";
import Breadcrumb from '../components/breadcrumb';
import CheckoutStatus from '../components/checkout-status';


const stripePromise = loadStripe("pk_test_51K54opSBf7h97Z5vl4iK3BzHn98YyQy7KnMlyuZhcNomJExXXfBWBBHp2Mv5q2QgeJtu3yJ5JJpxrSAnDskiUSYS00HdhGqw8s");

const CheckoutPage = () => {
  const Router = useRouter()
  const Dispatch = useDispatch()
  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }
    return totalPrice;
  })
  const { cartItems } = useSelector(state => state.cart);
  const emptyCartFunction = e => {
    console.log("working empty cart function")
    Dispatch(emptyCart())
  }
  const Div = styled.div`

`;
  const Header = styled.div`
  width: 100%;
display: flex;
// background: #f0f7fd;
justify-content: space-between;
align-items: center;
`;
  return (
    <Layout>


      <div className="container">

        <Header>
          <div>
            <Breadcrumb />
          </div>
          <div>
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>
        </Header>

        <Div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              cartItems={cartItems}
              priceTotal={priceTotal}
              onSuccessfulCheckout={emptyCartFunction, () => Router.push("/success")}
            />
          </Elements>
        </Div>
      </div>
    </Layout >
  )
}
export default CheckoutPage;
