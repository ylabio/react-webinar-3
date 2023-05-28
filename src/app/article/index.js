import {memo, useEffect} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleItem from "../../components/article-item";
import {useParams} from "react-router-dom";

function Article(props) {

  const store = useStore();
  const params = useParams()
  const prodId = params.id

  useEffect(() => {
    store.actions.articles.load(`${prodId}`);
  }, []);

  const select = useSelector(state => ({
    item: state.articles,
  }));

  return (
    <ArticleItem item={select.item}
                 onAdd={props.onAdd}
    />
  );
}

Article.propTypes = {
  onAdd: PropTypes.func,
};

Article.defaultProps = {
  // onAdd: () => {},
}

export default memo(Article);
