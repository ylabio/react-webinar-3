import React from "react";
import "./index.css"
import { totalCost } from "../../utils";

const total = ({title, totalCost}) => {
  return (
    <div className="Total">
      <span>
        <b>{title}</b>
      </span>
      <span>
        <b>{totalCost.toLocaleString("ru-RU") } &#8381;</b>
      </span>
    </div>
  );
};

export default total;
