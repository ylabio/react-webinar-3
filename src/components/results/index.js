import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatNumbers, countAllPrices } from "../../utils";
import "./style.css";

function Results({ basketAmount }) {
  const cn = bem("Results");

  return (
    <div className={cn()}>
      <p>Итого</p>
      <p>{basketAmount}</p>
    </div>
  );
}

Results.propTypes = {
  basketAmount: PropTypes.string.isRequired,
};

export default React.memo(Results);
