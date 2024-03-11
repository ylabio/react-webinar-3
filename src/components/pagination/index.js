import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({}) {
  const cn = bem("Pagination");

  return <div className={cn()}></div>;
}

Pagination.propTypes = {};

export default memo(Pagination);
