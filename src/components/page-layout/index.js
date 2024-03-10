import { memo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { Outlet, useLocation } from "react-router";
import Head from "../head";
import useStore from "../../store/use-store";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import './style.css';

function PageLayout() {

  const cn = bem('PageLayout');

  const location = useLocation();

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.product.clear();
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.product.title,
    locale: state.i18n.locale
  }));

  let title = '';
  if (location.pathname === '/' || location.pathname === '/items') {
    title = select.locale.Shop;
  } else if (location.pathname.startsWith('/items/')) {
    title = select.title;
  }

  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <Head title={title} />
        <BasketTool onOpen={openModalBasket} amount={select.amount}
          sum={select.sum} />
      </div>
      <div className={cn('center')}>
        <Outlet />
      </div>
      <div className={cn('footer')}></div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
