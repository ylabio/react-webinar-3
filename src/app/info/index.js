import React, { memo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemInfo from '../../components/item-info';
import useSelector from '../../store/use-selector';
import { useLang } from '../../lang/LangContext';

function Info() {
  const { id } = useParams();
  const store = useStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { translate } = useLang();

  const select = useSelector(state => {
    return {
      data: state.info.data,
      amount: state.basket.amount,
      sum: state.basket.sum,
    };
  });

  const callbacks = {
    AddToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await store.actions.info.getInfo(id);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении инфо:", error);
        setError("Не удалось загрузить инфо.");
        setLoading(false);
      }
    };
    fetchInfo();
  }, [id, store.actions.info]);

  if (error) {
    return <PageLayout>Error: {error}</PageLayout>;
  }

  return (
    <PageLayout>
      <Head title={data?.result?.title} />
      <BasketTool 
        amount={select.amount} 
        sum={select.sum} 
        onOpen={callbacks.openModalBasket} 
        pageLinkText={translate('page')}
        emptyBasketText={translate('emptyBasket')}
        pluralForms={{
          one: translate('товар'),
          few: translate('товара'),
          many: translate('товаров')
        }}
      />
      {data && <ItemInfo 
        data={data} 
        onAdd={callbacks.AddToBasket} 
        countryText={translate('country')}
        categoryText={translate('category')}
        editionText={translate('edition')}
        priceText={translate('price')}
        addToBasketText={translate('addToBasket')}
      />}
    </PageLayout>
  );
};

export default memo(Info);