import {memo, useEffect} from "react";
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function ArticleInfo() {

  const cn = bem('ArticleInfo');
  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    console.log('called useEffect on components/article-info');
    store.actions.article.fetchArticle(id);
  }, []);

  const select = useSelector(state => ({
    item: state.article?.item,
  }));

  return (
    <div className={cn()}>
        {select.item._id}
    </div>
  );
}

ArticleInfo.propTypes = {
};

ArticleInfo.defaultProps = {
}

export default memo(ArticleInfo);
