import {memo, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Menu from '../../components/menu';
import MenuNav from '../../components/menu-nav';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {useLanguage} from '../../localization/language-context'
import ItemInfo from '../../components/item-info';
import LoaderWrapper from '../../components/loader-wrapper';
import texts from '../../localization/texts';

function Info() {

  let {itemId} = useParams();

  const store = useStore();
  const {language, toggleLanguage} = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.actions.info.load(itemId)
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
      });
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
      <LoaderWrapper isLoading={isLoading} language={texts[language]}>
        <Head title={select.itemInfo.title} language={texts[language]} toggleLanguage={toggleLanguage} />
        <Menu>
          <MenuNav link={<Link to={`/?currentPage=0`}>{texts[language].main}</Link>} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
            sum={select.sum} language={texts[language]} />
        </Menu>
        <ItemInfo itemId={itemId} itemInfo={select.itemInfo} onAdd={callbacks.addToBasket} language={texts[language]} />
      </LoaderWrapper>
    </PageLayout>

  );
}

export default memo(Info);
