import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function Head({ title, children }) {
  const store = useStore();

  // Получаем данные из хранилища
  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const getCategoryTitle = () => {
    if (!select.category) return null;
    const category = select.categories.find(c => c._id === select.category);
    return category ? category.title : null;
  };

  const categoryTitle = getCategoryTitle();
  const pageTitle = categoryTitle ? `${title} / ${categoryTitle}` : title;

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle, select.category]);

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{pageTitle}</h1>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
