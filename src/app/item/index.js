import ItemCard from "../../components/item-card";
import { memo, useCallback, useEffect } from "react";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import PageLayout from "../../components/page-layout";
import { useParams } from "react-router-dom";
import Head from "../../components/head";
import { Link } from "react-router-dom";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import useTranslation from "../../hooks/useTranslation";
import Subhead from "../../components/subhead";

// export async function itemLoader({ params }) {
//   const response = await fetch(
//     `api/v1/articles/${params.id}?fields=*,madeIn(title,code),category(title)`
//   );
//   const itemData = await response.json();
//   return itemData;
// }

function Item() {
  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    const loadItemData = () => {
      store.actions.item.load(id);
    };
    loadItemData();
  }, [id]);

  const activeModal = useSelector((state) => state.modals.name);

  const itemData = useSelector((state) => ({
    _id: state.item._id,
    title: state.item.title,
    description: state.item.description,
    country: state.item.country,
    countryCode: state.item.countryCode,
    category: state.item.category,
    year: state.item.year,
    price: state.item.price,
  }));

  const basketData = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { lang } = useSelector((state) => ({
    lang: state.language.language,
  }));

  const callbacks = {
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    changeLanguage: useCallback(
      (lang) => store.actions.language.setLanguage(lang),
      [store]
    ),
  };
  const [getTranslation] = useTranslation();

  console.log("ITEM", lang);

  return (
    <>
      <PageLayout>
        <Head
          title={itemData.title}
          onChangeLang={callbacks.changeLanguage}
          lang={lang}
        />
        <Subhead>
          <Link to={"/"}>{getTranslation("home")}</Link>
          <BasketTool
            sum={basketData.sum}
            amount={basketData.amount}
            onOpen={callbacks.openModalBasket}
          />{" "}
        </Subhead>
        <ItemCard itemData={itemData} onAdd={callbacks.addToBasket}></ItemCard>
      </PageLayout>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Item);
