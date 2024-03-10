import { memo, useCallback, useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import ArticleItem from "../../components/article-item";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Basket from "../../app/basket";

function Article() {
  const store = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleItem, setArticleItem] = useState();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    async function getArticle() {
      try {
        const response = (await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`));
        const data = await response.json();
        setArticleItem(data.result);
      } catch {
        alert("Ошибка при поиске товара");
        navigate('/');
      }
    }
    getArticle()
  }, [id, navigate]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }))

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  if (!articleItem) {
    return <>Загрузка...</>
  }

  return (
    <>
      <PageLayout>
        <Head title={articleItem.title}/>
        <Navbar />
        <BasketTool onOpen={callbacks.openModalBasket} 
                    amount={select.amount} 
                    sum={select.sum}/>
        <ArticleItem onAdd={callbacks.addToBasket} item={articleItem}/>
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  )
}

export default memo(Article);