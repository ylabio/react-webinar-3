import {memo, useCallback, useLayoutEffect,useEffect,useRef} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css";
import PropTypes from 'prop-types';

function Basket(props) {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    heightFrame: state.modals.heightFrame,
    heightList: state.modals.heightList,
    vFlag1: state.modals.vFlag1,
    vFlag2: state.modals.vFlag2,
    vFlag3: state.modals.vFlag3,
    scrollHeight: state.modals.scrollHeight,
    heightListToList: state.modals.heightListToList,
    vLang: state.lingua.vLang,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback((_id) => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      document.body.style.overflow = "scroll";
      store.actions.modals.close();
    }, [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item}
                         onRemove={callbacks.removeFromBasket}
                         onClose={callbacks.closeModal}
                         buttonDeleteProduct={select.vLang.variablesLanguage.buttonDeleteProduct}
                         ItemQ={select.vLang.variablesLanguage.Basket.ItemQ}
                         refreshDataProduct={props.refreshDataProduct}
                         path={'/product/'}/>
    }, [callbacks.removeFromBasket,callbacks.closeModal,select,props.refreshDataProduct]),
  };

  const refList = useRef(null);
  const refScroll = useRef(null);

  useLayoutEffect(() => {
    store.actions.modals.setheightList(refList.current.clientHeight);
    if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
      store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
    }
  }, [store,select]);

  useEffect(() => {
    function handleWindowClick() {
      store.actions.modals.setheightList(refList.current.clientHeight);
      if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
        store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
      }
      store.actions.modals.setscrollHeight(refScroll.current.scrollHeight);
    }

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [store]);

  return (
    <ModalLayout title={select.vLang.variablesLanguage.Basket.title}
                 onClose={callbacks.closeModal}
                 buttonClose={select.vLang.variablesLanguage.Basket.buttonClose}>
        <div ref={refList}>
        <div ref={refScroll}
             style={(store.actions.modals.fScrollBarBasket(select.vFlag2) &&
                     select.heightListToList > 0 &&
                     store.actions.modals.fScrollBarBasket(select.vFlag1) ?
             {height: select.heightListToList}
             : {})}
             className={`scroll-container ${store.actions.modals.fScrollBarBasket(select.vFlag3) ? "show" : ""} `}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      </div>
      </div>
      <BasketTotal sum={select.sum}
                   label={select.vLang.variablesLanguage.Total.label}/>
    </ModalLayout>
  );
}

Basket.propTypes = {
  refreshDataProduct: PropTypes.func,
};

Basket.defaultProps = {
  refreshDataProduct: () => {},
}

export default memo(Basket);
