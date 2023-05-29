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
    console.log(props.order)
    useLayoutEffect(() => {
        store.actions.articles.load(`${prodId}`);
    }, [])

    const actualSkip = props.order - 5

    useEffect(() => {
        store.actions.catalog.preloadSkip(actualSkip);
    }, [props.order]);


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
