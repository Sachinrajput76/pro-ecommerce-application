import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from 'react-redux';
import styled from "@emotion/styled";
import axios from "axios";
import RowDiv from '../prebuilt/RowDiv'
import BillingDetailsFields from "../prebuilt/BillingDetailsFields";
import SubmitButton from "../prebuilt/SubmitButton";
import CheckoutError from "../prebuilt/CheckoutError";
import Item from '../shopping-cart/item';
import { emptyCart } from './../../store/actions/cartActions';
import { notify, isMatches, focusById, isEmail, uploadFile } from '../../utils/utility'


const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background-color:#7084fc;
  border-radius: 4px;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;
const MainDiv = styled.div`
  display: flex;
  @media (max-width: 720px) {
    flex-direction:column;
  }
`;
const SecondDiv = styled.div`
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
  @media (min-width: 420px) {
    flex-direction:column;
      margin: 10px auto;
      margin-left:20px;
  }
`;
const ThirdDiv = styled.div`
padding:20px;
`;
const Fourth = styled.div`
padding:0px 10px;
`;
const Title = styled.div`
  display: flex;
  justify-content:center;
  padding:20px;
  color: #000;
  background: #f5f5f5;
  border: 1px solid #bbb;
`;


const CheckoutForm = ({ priceTotal, onSuccessfulCheckout, cartItems }) => {
    const Dispatch = useDispatch()
    const [isProcessing, setProcessingTo] = useState();
    const [checkoutError, setCheckoutError] = useState();
    const stripe = useStripe();
    const elements = useElements();

    // TIP
    // use the cardElements onChange prop to add a handler
    // for setting any errors:
    const emptyCartFunction = e => {
        console.log("working empty cart function")
        Dispatch(emptyCart())
    }

    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    console.log("cart items in main", cartItems)

    const handleFormSubmit = async ev => {
        ev.preventDefault();
        const billingDetails = {
            name: ev.target.name.value,
            email: ev.target.email.value,
            address: {
                line1: ev.target.line1.value,
                country: ev.target.country.value,
                state: ev.target.state.value,
                city: ev.target.city.value,
                postal_code: ev.target.postal_code.value
            }
        };
        const cardElement = elements.getElement("card");
        try {
            setProcessingTo(true);
            const { data: clientSecret } = await axios.post("/api/payment_intents", {
                amount: parseInt(priceTotal) * 100
            });
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });
            if (error) {
                setCheckoutError(error.message);
                setProcessingTo(false);
                return;
            }
            console.log("cart items in try", cartItems)
            emptyCartFunction();
            onSuccessfulCheckout();
        } catch (err) {
            setCheckoutError(err.message);
            setProcessingTo(false);
        }
    };

    // Learning
    // A common ask/bug that users run into is:
    // How do you change the color of the card element input text?
    // How do you change the font-size of the card element input text?
    // How do you change the placeholder color?
    // The answer to all of the above is to use the `style` option.
    // It's common to hear users confused why the card element appears impervious
    // to all their styles. No matter what classes they add to the parent element
    // nothing within the card element seems to change. The reason for this is that
    // the card element is housed within an iframe and:
    // > styles do not cascade from a parent window down into its iframes

    const iframeStyles = {
        base: {
            color: "#fff",
            fontSize: "16px",
            iconColor: "#fff",
            "::placeholder": {
                color: "#bbb"
            }
        },
        invalid: {
            iconColor: "#FFC7EE",
            color: "#FFC7EE"
        },
        complete: {
            iconColor: "#cbf4c9"
        }
    };

    const cardElementOpts = {
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };


    return (
        <>
            <form className='w-100' onSubmit={handleFormSubmit}>
                <MainDiv>
                    <RowDiv shadow height={"fit-content"}>
                        <Title>SHIPPING INFORMATION</Title>
                        <ThirdDiv> <BillingDetailsFields /> </ThirdDiv>
                    </RowDiv>

                    <SecondDiv>
                        <Title>PAYMENT INFORMATION</Title>
                        <ThirdDiv>
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
                        </ThirdDiv>
                        <Fourth>
                            <RowDiv>
                                <CardElementContainer>
                                    <CardElement
                                        options={cardElementOpts}
                                        onChange={handleCardDetailsChange}
                                    />
                                </CardElementContainer>
                            </RowDiv>
                            {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
                            <RowDiv>
                                {/* TIP always disable your submit button while processing payments */}
                                <SubmitButton disabled={isProcessing || !stripe}>
                                    {isProcessing ? "Processing..." : `Pay $${priceTotal}`}
                                </SubmitButton>
                            </RowDiv>
                        </Fourth>
                    </SecondDiv>
                </MainDiv>
            </form>
        </>
    );
};

export default CheckoutForm;
