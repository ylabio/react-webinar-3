import { memo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemFull from '../../components/item-full';
import useTranslation from '../../hooks/use-translation';
import { plural } from '../../utils';

function Product() {
  const store = useStore();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]);

  const select = useSelector(state => ({
    item: state.product.currentItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const menuItems = [
    { label: t('mainPage'), link: '/' }
  ];

  return (
    <PageLayout>
      <Head title={select.item ? select.item.title : t('loading')} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        label={t('inBasket')}
        itemsLabel={plural(select.amount, {
          one: t('item_one'),
          few: t('item_few'),
          many: t('item_many'),
          other: t('item_other'),
        })}
        goToCartText={t('goToCart')}
        emptyText={t('empty')}
        menuItems={menuItems}
      />
      {select.item ? (
        <ItemFull
          item={select.item}
          addToCartText={t('addToCart')}
          countryText={t('country')}
          categoryText={t('category')}
          yearText={t('year')}
          priceText={t('price')}
        />
      ) : (
        <p>{t('loading')}</p>
      )}
    </PageLayout>
  );
}

export default memo(Product);
