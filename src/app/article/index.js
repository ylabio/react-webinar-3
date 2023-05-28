import {memo, useEffect} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleItem from "../../components/article-item";

function Article(props) {

  const store = useStore();

  useEffect(() => {
    store.actions.articles.load(store.state.articles._id);
  }, [store.state.articles._id]);


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
