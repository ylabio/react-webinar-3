import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const store = useStore();
  const countPages = Math.ceil(props.number / 10);

  useEffect(() => {
    store.actions.pagination.generateButtons(countPages, props.currentSkipValue);
  }, [countPages, props.currentSkipValue]);

  const select = useSelector(state => ({
    showedPageButtons: state.pagination.showedPageButtons
  }));

  return (
    <div className={cn()}>
      <ul>
        {select.showedPageButtons.map(button => !button.key ?
          <li className={cn('page', (button.selected ? 'selected' : ''))} key={button.pageNumber} onClick={() => {
            props.setCurrentSkipValue(button.skipValue);
            button.selected = !button.selected;
          }}>
            {button.pageNumber}
          </li> :
          <li className={cn('page', ('ellipsis'))} key={button.key}>...</li>
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  number: PropTypes.number
};

Pagination.defaultProps = {
  number: 0
}

export default memo(Pagination);
