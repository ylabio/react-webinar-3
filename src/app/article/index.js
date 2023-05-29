import {memo, useEffect, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleItem from "../../components/article-item";
import {useParams} from "react-router-dom";

function Article(props) {

  const store = useStore();
  const params = useParams()
  const prodId = params.id

  const preloadSkip = props.order - 1
  // console.log(preloadSkip)
  useLayoutEffect(()=>{
    store.actions.articles.load(`${prodId}`);


  },[])

  useEffect(() => {
    setTimeout(()=>{
      store.actions.catalog.load(select.limit, preloadSkip);
    },2000)
  }, [prodId]);


  const select = useSelector(state => ({
    item: state.articles,
    limit: state.catalog.limit,
  }));

  return (
    <ArticleItem item={select.item}
                 onAdd={props.onAdd}
    />
  );
}

Article.propTypes = {
  onAdd: PropTypes.func,
  order: PropTypes.number,
};

Article.defaultProps = {
  // onAdd: () => {},
}

export default memo(Article);
