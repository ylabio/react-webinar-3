import {memo, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {useLanguage} from '../../localization/language-context'
import ItemInfo from '../../components/item-info';
import texts from '../../localization/texts';

function Info() {

  let {itemId} = useParams();

  const store = useStore();
  const {language, toggleLanguage} = useLanguage();

  useEffect(() => {
    store.actions.info.load(itemId);
  }, [itemId]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemInfo: state.info.itemInfo
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.itemInfo.title} language={texts[language]} toggleLanguage={toggleLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} language={texts[language]}
                  link={<Link to='/'>{texts[language].main}</Link>}/>
      <ItemInfo itemId={itemId} itemInfo={select.itemInfo} onAdd={callbacks.addToBasket} language={texts[language]}/>
    </PageLayout>

  );
}

export default memo(Info);
