import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import useStore from '../../store/use-store.js';
import useSelector from '../../store/use-selector.js';
import PageLayout from '../page-layout/index.js';
import Head from '../head/index.js';
import BasketTool from '../basket-tool/index.js';
import ItemDetail from '../item-detail/item-detail.js';
import Button from '../button/index.js';
import { Link } from 'react-router-dom';
import './style.css';

function Article() {
  let { id } = useParams();
  const store = useStore();

  useEffect(() => {
    if (id) {
      store.actions.catalog.loadItem(id);
    }
  }, [store, id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item?.title} />
      <div className="container">
        <div className="header">
          <Link to="/" className="homeLink">
            Главная
          </Link>
          <BasketTool 
            onOpen={callbacks.openModalBasket} 
            amount={select.amount} 
            sum={select.sum} 
          />
        </div>

        <ItemDetail item={select.item} />

        <div className="buttonContainer">
          <Button
            style="primary"
            onClick={() => callbacks.addToBasket(select.item._id)}
            title="Добавить"
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default memo(Article);