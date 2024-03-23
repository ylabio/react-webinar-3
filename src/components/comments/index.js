import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import List from '../../components/list';
import './style.css';

function Comments(props) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h2>{props.title}</h2>
      <List list={props.items} renderItem={props.renderItem}/>
    </div>
  );
}

Comments.propTypes = {
  count: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({name: PropTypes.string})
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
  })),
  lang: PropTypes.string,
  title: PropTypes.string,
  renderItem: PropTypes.func.isRequired
};

Comments.defaultProps = {
  count: 0,
  items: [],
  lang: 'ru',
  title: 'Комментарии'
}

export default memo(Comments);