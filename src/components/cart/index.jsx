import React, { useCallback } from "react";
import "./style.css";
import PropTypes from "prop-types";
import Head from "../head";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import { formatter } from "../../utils";
import ItemCart from "../item-cart";

const Cart = ({ shopCart, onRemoveItem, setOpenPopup }) => {
  const cn = bem("Cart");

  const onRemove = (code) => {
    onRemoveItem(code);
  };

  const renderListItems = useCallback((item, onClickItem) => {
    return <ItemCart item={item} key={item.code} onRemoveItem={onClickItem} />;
  }, []);

  return (
    <>
      <Head title="Корзина">
        <button className={cn("btn")} onClick={() => setOpenPopup()}>
          Закрыть
        </button>
      </Head>
      <div className={cn("box")}>
        <div className={cn("list")}>
          <List
            list={shopCart.itemsList}
            onClickItem={onRemove}
            renderListItems={renderListItems}
          />
        </div>
        <div className={cn("price")}>
          <b className={cn("result")}>Итого </b>
          <b>{formatter(shopCart.itemsPrice)}</b>
        </div>
      </div>
    </>
  );
};

Cart.propTypes = {
  shopCart: PropTypes.shape({
    itemsPrice: PropTypes.number,
    itemsList: PropTypes.array,
  }),
  onRemoveItem: PropTypes.func,
  setOpenPopup: PropTypes.func,
};

export default React.memo(Cart);
