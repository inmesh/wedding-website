import styled from "styled-components";

const CoverImage = styled.img`
  background-size: cover;
  filter: brightness(80%);
  object-fit: cover;
  height: 300px;
  width: 100vw;
  opacity: 0.5;

  @media only screen and (min-width: 600px) {
    height: 600px;
  }
`;

const CoverContainer = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const CenterOverImage = styled.img`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  left: 0;
  right: 0;
`;

const DateImage = styled(CenterOverImage)`
  top: 230px;
  width: 300px;

  @media only screen and (min-width: 600px) {
    top: 500px;
    width: 500px;
  }
`;

const Title = styled(CenterOverImage)`
  width: 300px;
  top: 25px;

  @media only screen and (min-width: 600px) {
    width: 500px;
    top: 50px;
  }
`;

const ComingTitle = styled.h3`
  top: 313px;
  direction: rtl;
  font-size: 26px;

  @media only screen and (min-width: 600px) {
    top: 610px;
    font-size: 40px;
  }
`;

export { CoverImage, CoverContainer, DateImage, Title, ComingTitle };

// .down-arrow {
//   position: absolute;
//   top: 345px;
//   width: 0;
//   animation: jumpInfinite 1.5s infinite;
// }

// .down-arrow:after {
//   content: " ";
//   position: absolute;
//   left: -10px;
//   width: 16px;
//   height: 16px;
//   border-bottom: 4px solid;
//   border-right: 4px solid;
//   border-radius: 4px;
//   transform: rotateZ(45deg);
// }

// @media only screen and (min-width: 600px) {

//   .down-arrow {
//     top: 650px;
//   }
// }

// @keyframes jumpInfinite {
//   0% {
//     margin-top: 0;
//   }
//   50% {
//     margin-top: 20px;
//   }
//   100% {
//     margin-top: 0;
//   }
// }
