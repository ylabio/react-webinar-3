import { memo } from "react";
import PropTypes from "prop-types";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import "./style.css";

function Head({ title }) {
  return (
    <header className="Head">
      <h1>{title}</h1>
      <section>
        <DropdownMenu />
      </section>
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
