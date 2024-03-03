import React from "react";
import Head from "../head";
import List from "../list";
import { formatPrice } from "../../utils";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ data, onModalClose, onBucketAction }) {
  const cn = bem("Modal");
  const btn = bem("Btn");

  return (
    <div id="Modal" className={cn()} onClick={onModalClose}>
      <div className={cn("content")}>
        <Head title="Корзина" style={{ marginBottom: "71px" }}>
          <div className="Head-actions">
            <button
              className={btn("modal", { close: true })}
              onClick={onModalClose}
            >
              Закрыть
            </button>
          </div>
        </Head>
        <List
          theme="bucket"
          list={data.itemsList}
          onBucketAction={onBucketAction}
        />
        <div className={cn("footer")}>
          <div className={cn("text", { weight: "700" })}>
            Итого
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {`${formatPrice(data.totalPrice)} \u20BD`}
          </div>
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  data: PropTypes.any,
  onModalClose: PropTypes.func,
};

List.defaultProps = {
  onModalClose: () => {},
};

export default React.memo(Modal);
