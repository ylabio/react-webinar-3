import React from "react";
import PropTypes from "prop-types";
import styles from "./Head.module.scss";

function Head({ title }) {
  return (
    <div className={styles.head}>
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);