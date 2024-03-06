import React from "react";
import Head from "../head";
import List from "../list";
import itemBucket from "../item-bucket";
import { formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Bucket({ data, onBucketRemove, onModalClose }) {
  const cn = bem("Bucket");
  const btn = bem("Btn");

  return (
    <>
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
        itemType={itemBucket}
        data={data.itemsList}
        onBucketRemove={onBucketRemove}
      />
      <div
        className={cn("footer", {
          empty: data.uniqueItems === 0 ? true : false,
        })}
      >
        <div className={cn("text", { weight: "700" })}>
          Итого
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {`${formatPrice(data.totalPrice)} \u20BD`}
        </div>
      </div>
    </>
  );
}

export default Bucket;
