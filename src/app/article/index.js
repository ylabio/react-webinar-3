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
    id: state.articles._id,
    description: state.articles.description,
    madeIn: state.articles.madeIn.title,
    codeCountry: state.articles.madeIn.code,
    category: state.articles.category.title,
    edition: state.articles.edition,
    price: state.articles.price,
  }));

  return (
    <ArticleItem id={select.id}
                 madeIn={select.madeIn}
                 codeCountry={select.codeCountry}
                 category={select.category}
                 edition={select.edition}
                 price={select.price}
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
