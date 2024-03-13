import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../basket-tool";
import Basket from "../../app/basket";
import MainMenu from "../main-menu";
import SpaceBetween from "../space-between";
import SelectLang from "../select-lang";

function PageLayout({head, footer, children}) {
  const store = useStore()
  const locale = useSelector(state => state.locale)
  const cn = bem('PageLayout');

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  return (
    <>
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <SpaceBetween>
          <MainMenu locale = {locale.translations.mainMenu}/>
          <SelectLang locale = {locale.translations.mainMenu}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} locale={locale.translations.basketTool} lang = {locale.lang}/>
        </SpaceBetween>
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
    </div>
    {select.activeModal === 'basket' && <Basket/>}
  </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
