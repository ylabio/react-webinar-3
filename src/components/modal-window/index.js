import React from "react";
import "./style.css";
import UniversalBtn from "../universal-btn";

function ModalWindow({ isActiveModal, setIsActiveModale, children }) {
  return (
    <div className={isActiveModal ? "Modal-Window" : ""}>
      <div className={isActiveModal ? "MyModal-Active" : "MyModal"}>
        <div className="Modal-Btn">
          <UniversalBtn
            btnText="Закрыть"
            onClick={() => setIsActiveModale(false)}
          />
        </div>
        <div className="Content">{children}</div>
      </div>
    </div>
  );
}
ModalWindow.defaultProps = {
  onSetModal: () => {},
};

export default ModalWindow;
