import styled from "styled-components";

const FormAndInvite = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  gap: 10px;

  @media only screen and (min-width: 600px) {
    flex-direction: row-reverse;
    justify-content: space-evenly;
    margin: 40px 20px;
    gap: 40px;
  }
`;

const Invitation = styled.img`
  object-fit: cover;
  width: 90vw;
  min-width: 230px;
  margin: 0 auto;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  @media only screen and (min-width: 600px) {
    width: 30vw;
    margin: 0;
  }
`;

const Footer = styled.footer`
  background-color: #edede9;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 10px;
`;

export { FormAndInvite, Invitation, Footer };
