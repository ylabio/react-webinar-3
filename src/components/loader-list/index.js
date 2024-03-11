import React from "react";
import "./style.css";
function LoaderList({ count }) {
  const list = [...Array(count)].map((item, index) => {
    return <div key={index} className="Loader-item"></div>;
  });

  return <div className="Loader">{list}</div>;
}

export default LoaderList;
