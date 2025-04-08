import { memo } from 'react';
import PropTypes from 'prop-types';
import ItemInfo from '../article-item';
import Button from '../button';
import { useTranslation } from '../../hooks/useTranslation';
import './style.css';

function ArticleContent({ item, onAddToBasket }) {
  const { t } = useTranslation();
  
  return (
    <div className="ArticleContent">
      <ItemInfo item={item} />
      <div className="ArticleContent-actions">
        <Button title="btn-add" style="primary" onClick={onAddToBasket} />
      </div>
    </div>
  );
}

ArticleContent.propTypes = {
  item: PropTypes.object.isRequired,
  onAddToBasket: PropTypes.func.isRequired
};

export default memo(ArticleContent);