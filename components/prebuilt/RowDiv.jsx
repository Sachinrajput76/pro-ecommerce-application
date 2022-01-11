import styled from "@emotion/styled";

const RowDiv = styled.div`
    width:100%;
    @media (min-width: 420px) {
        width: 600px;
      }
    margin: 10px auto;
    border-radius: 4px;
    position: relative;
    color: #000;
    height:  ${props => props.height ? props.height : ""};
    background:  ${props => props.background ? props.background : "white"};
    box-shadow:  ${props => props.shadow ? "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;" : "none"};
`;

export default RowDiv;
