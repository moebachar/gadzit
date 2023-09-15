import React from "react";
import source from "../../assets/svg/pagenot.svg";

function ErrorPage(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <img src={source} />
      <h1>Page not found</h1>
    </div>
  );
}

export default ErrorPage;
