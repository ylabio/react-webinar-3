import React from "react";
import { Link } from "react-router-dom";

const UrlMessage = ({ text, urlText, url, children }) => {
  return (
    <p>
      <Link to={url}>{urlText}</Link>
      {", "}
      <span>{text}</span>
      {children}
    </p>
  );
};

export default UrlMessage;
