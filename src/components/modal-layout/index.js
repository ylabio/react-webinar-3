import React from "react";
import "./style.css";

const ModalLayout = ({ children, active }) => {
  return (
    <>
      {active && (
        <article className="ModalLayout">
          <section className="ModalLayout-content">{children}</section>
        </article>
      )}
    </>
  );
};

// ModalLayout.propTypes = {
//   children: PropTypes.node,
// };

export default React.memo(ModalLayout);
