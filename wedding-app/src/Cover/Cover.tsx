import React from "react";
import "./Cover.css";

const Cover = () => {
  return (
    <div>
      <div id="coverContainer">
        <img
          className="background"
          src={"/images/cover-image.jpg"}
          alt="cover"
        />
      </div>
      <img
        className="dateImg centerOverImage"
        src={"/images/date-bg.png"}
        alt="cover"
      />

      <img
        className="centerOverImage"
        id="title"
        src={"/images/title.png"}
        alt="title"
      />
      <h3 className="centerOverImage">{"אתם באים?"}</h3>
      <div className="centerOverImage down-arrow"></div>
    </div>
  );
};

export default Cover;
