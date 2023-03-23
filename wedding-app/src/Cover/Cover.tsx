import React from "react";
import "./Cover.styles.tsx";
import { CoverContainer, CoverImage, DateImage, Title } from "./Cover.styles";

const Cover = () => {
  return (
    <div>
      <CoverContainer>
        <CoverImage src={"/images/cover-image.jpg"} alt="cover" />
        {/* <img
          className="background"
          src=
        /> */}
      </CoverContainer>
      <DateImage src={"/images/date-bg.png"} alt="cover" />
      <Title src={"/images/title.png"} alt="title" />
      {/* <h3 className="centerOverImage">{"אתם באים?"}</h3>
      <div className="centerOverImage down-arrow"></div> */}
    </div>
  );
};

export default Cover;
