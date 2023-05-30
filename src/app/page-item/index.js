import {memo, useCallback, useEffect, useState} from "react";
import {useParams, redirect} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from "../../components/item-detail";
import Loading from "../../components/Loading";
import {translation} from "../../translation";
import PropTypes from "prop-types";
function PageItem({onChangeHeadTitle, currentLang}) {
  const { currentItemId} = useParams();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    store.actions.item.load(currentItemId)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        redirect('/page404');
      });
  }, [currentItemId]);
  const select = useSelector(state => ({
    item: state.item.info,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    onChangeHeadTitle: useCallback((title) => { onChangeHeadTitle(title); }, [onChangeHeadTitle])
  }

  return (
    <>
      {isLoading ? <Loading/> : <ItemDetail onChangeHeadTitle={callbacks.onChangeHeadTitle} translation={translation.item[currentLang]} item={select.item} onAdd={callbacks.addToBasket}/>}
    </>
  );
}

PageItem.propTypes = {
  onChangeHeadTitle: PropTypes.func,
  currentLang: PropTypes.string
};
export default memo(PageItem);
