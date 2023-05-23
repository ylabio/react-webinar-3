import React from "react";
import "./style.css";
import List from "../list";
import Head from "../head";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";

const Cart = ({ list, openCart, setOpenCart, deleteItemBasket , rootRef}) => {
    const totalCount = list.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );
    const cn = bem("Cart");

    return (
        <div className={openCart ? `${cn()} ${cn('opened')}` : cn()}>
            <div ref={rootRef} className={cn("content")}>
                <div className={cn("header")}>
                    <div className={cn("title")}>
                        <Head title="Корзина" />
                    </div>
                    <div className={cn("close-button")}>
                        <button onClick={() => setOpenCart(false)}>
                            Закрыть
                        </button>
                    </div>
                </div>
                <div className={cn("list")}>
                    {!list.length ? (
                        <div>
                            <h2>Корзина пуста</h2>
                        </div>
                    ) : (
                        <div>
                            <List
                                list={list}
                                clickButton={deleteItemBasket}
                                clickName="Удалить"
                            />
                            <div className={cn("footer")}>
                                <div className={cn("result")}>
                                    <div>Итого</div>
                                    <div>
                                        {Intl.NumberFormat("ru-RU").format(
                                            totalCount
                                        )}{" "}
                                        ₽
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ).isRequired,
    openCart: PropTypes.bool,
    setOpenCart: PropTypes.func,
    deleteItemBasket: PropTypes.func
  };

  Cart.defaultProps = {
    setOpenCart: () => {},
    deleteItemBasket: () => {}
  }

export default React.memo(Cart);
