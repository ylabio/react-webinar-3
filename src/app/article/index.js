import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import Comments from "../../containers/comments";
import TopHead from "../../containers/top-head";
import articleActions from "../../store-redux/article/actions";
import commentActions from "../../store-redux/comment/actions";

function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articleActions.load(id));
    dispatch(commentActions.loadComments(id));
  }, [dispatch, id]);

  const { article, waiting } = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting || state.comment.waiting,
  }));

  const addToBasket = (itemId) => {
    dispatch(articleActions.addToBasket(itemId));
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={article.title || ""}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {waiting ? (
        <Spinner active={true} />
      ) : (
        <>
          <ArticleCard article={article} onAdd={addToBasket} />
          <Comments />
        </>
      )}
    </PageLayout>
  );
}

export default Article;
