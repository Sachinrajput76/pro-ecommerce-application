import Layout from '../layouts/Main';
import styled from "@emotion/styled";
// import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import SubmitButton from "../components/prebuilt/SubmitButton";


const Container = styled.div`
  @media (min-width: 420px) {
    width: 475px;
  }
  margin: 30px auto 0 auto;
  text-align: center;
  color: #000;
  min-height: calc(100vh - 460px);
  display:flex;
  justify-content:center;
  align-items: center;
`;
const Div = styled.div`
  padding:20px 20px;
`;
const Icon = styled.div`
font-size: 120px;
color: #FBB03B;
padding: 20px;
`;
const Title = styled.div`
  font-size: 28px;
`;

const Message = styled.div`
  margin-top: 20px;
`;

export default () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });
  const Router = useRouter()
  function ContinueShopping() {
    Router.push("/");
  }
  return (
    <Layout>
      <Container>
        <div>
          {/* <Confetti width={width} height={height} numberOfPieces={450} /> */}
          <Icon><i className="far fa-check-circle"></i></Icon>
          <Title>Transaction Completed Successfully!</Title>
          <Message>Thank you for your billing.</Message>
          <Div>
            <SubmitButton onClick={ContinueShopping}>{"Continue Shopping"}</SubmitButton>
          </Div>
        </div>
      </Container>
    </Layout>
  );
};
