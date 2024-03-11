import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Outlet, useParams } from "react-router-dom";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useCallback } from "react";

function PageLayout({ footer }) {
  const cn = bem("PageLayout");
  const { id } = useParams();
  const store = useStore();
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    list: state.catalog.list,
  }));

  const openModalBasket = useCallback(
    () => store.actions.modals.open("basket"),
    [store]
  );

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <Head
          title={
            id && select.list.length === 1 ? select.list[0].title : "Магазин"
          }
        />
        <BasketTool
          onOpen={openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </div>
      <div className={cn("center")}>
        <Outlet />
      </div>
      <div className={cn("footer")}></div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(PageLayout);
