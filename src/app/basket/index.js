import { memo, useCallback, useEffect } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslation from '../../store/lang/use-translat';
import { useNavigate } from 'react-router';
import { useLang } from '../../store/lang/language-context';

function Basket() {
  const store = useStore();
  const navigate = useNavigate();
  const { lang } = useLang();
  const { t } = useTranslation();
  const langHeader = t('header').basketTitle;

  const langItemBasket = {
    Button: t('button').delete,
    Pices: t('pieces'),
  };
  const langBasketTotal = {
    Amount: t('basketTool').amount,
  };
  useEffect(() => {
    callbacks.updateLangItem(lang);
  }, [lang]);

  const select = useSelector(state => ({
    list: state.basket.list,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    updateLangItem: useCallback(lang => store.actions.basket.updateLangItem(lang), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onNavigate: useCallback(
      event => {
        if (event.target.closest('li') && event.target.localName !== 'button') {
          navigate(`/article/${event.target.closest('li').dataset.id}`);
        }
      },
      [navigate],
    ),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onNavigate={callbacks.onNavigate}
            langContent={langItemBasket}
          />
        );
      },
      [callbacks.removeFromBasket, langItemBasket, callbacks.onNavigate],
    ),
  };

  return (
    <ModalLayout title={langHeader} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} langContent={langBasketTotal} />
    </ModalLayout>
  );
}

export default memo(Basket);
