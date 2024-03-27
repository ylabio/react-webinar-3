import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import CommentsSection from "../../components/comments-section";

function Comments() {
  const store = useStore();

  const dispatch = useDispatch();

  var id = useParams().id;

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(
    (state) => ({
      comments: state.comments.data,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    transformDate: useCallback((s) => store.actions.comments.transformDate(s), [
      store,
    ]),
    postComment: useCallback((text, parent) => dispatch(commentsActions.postComment(text, parent)), [
      store,
    ]),
  };

  return (
    <CommentsSection comments={select.comments} transformDate={callbacks.transformDate} postComment={callbacks.postComment}/>
  );
}

export default memo(Comments);
