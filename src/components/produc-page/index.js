import { memo } from 'react';
import Product from '../../product';
import useSelector from '../../store/use-selector';
import { STRINGS } from '../../const';
import { useParams } from "react-router";
import product from '../../product';

function ProductPage({ id }) {
  const { _id } = useParams();
  const language = useSelector(state => state.catalog.language);

  let checkId = id;
  if (checkId === undefined) {
    checkId = _id;
  }

  const texts = {
    addButtonText: STRINGS.ADD[language],
    switchLanguage: STRINGS.SWITCH_LANGUAGE[language],
    home: STRINGS.HOME[language],
    empty: STRINGS.EMPTY[language],
    products: STRINGS.PRODUCTS[language],
    descriptionTitle: STRINGS.DESCRIPTION_TITLE,
    price: STRINGS.PRICE[language]
  };

  return <Product _id={checkId} language={language} texts={texts}/>;
}

export default memo(ProductPage);