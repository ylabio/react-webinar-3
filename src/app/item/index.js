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
import Loader from "../../components/loader";

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
    isLoading: state.item.isLoading,
  }));

  const basketData = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { lang } = useSelector((state) => ({
    lang: state.language.language,
  }));

  const [getTranslation] = useTranslation(lang);

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
      (lang) => {
        store.actions.language.setLanguage(lang);
      },

      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head
          title={itemData.title}
          onChangeLang={callbacks.changeLanguage}
          lang={lang}
        />
        <Subhead>
          <Link to={`/`}>{getTranslation("home")}</Link>
          <BasketTool
            sum={basketData.sum}
            amount={basketData.amount}
            onOpen={callbacks.openModalBasket}
            getTranslation={getTranslation}
          />{" "}
        </Subhead>
        <Loader isShown={itemData.isLoading}>
          <ItemCard
            itemData={itemData}
            onAdd={callbacks.addToBasket}
            getTranslation={getTranslation}
          >
            {" "}
          </ItemCard>
        </Loader>
      </PageLayout>
      {activeModal === "basket" && <Basket getTranslation={getTranslation} />}
    </>
  );
}

export default memo(Item);
