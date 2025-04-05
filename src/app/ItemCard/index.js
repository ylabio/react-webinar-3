import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

const ItemCard = () => {
  const { id } = useParams();
  const store = useStore();

  const item = useSelector(state =>
    state.catalog.list.find(item => item._id === id)
  );

  useEffect(() => {
    if (!item) {
      // Опционально загружаем товар, если его нет в хранилище
      store.actions.catalog.loadItem(id);
    }
  }, [id, item, store]);

  if (!item) return <div>Загрузка...</div>;

  return (
    <div className="item-card">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Цена: {item.price}</p>
      {/* Добавляем другие детали товара по необходимости */}
    </div>
  );
};

export default ItemCard;
