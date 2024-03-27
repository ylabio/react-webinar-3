import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import dateFormat from '../../utils/date-format';
import TreeList from '../tree-list';
import './style.css';

function ItemComment(props) {

  const cn = bem('ItemComment');
  
  const callbacks = {
    onAnswer: (e) => {
      e.preventDefault();
      props.onAnswer({_id: props.item._id, _type: 'comment'});
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('meta')}>
        <div className={cn('author', {self: props.isSelf})}>{props.item.author.profile.name}</div>
        <div className={cn('date')}>{ dateFormat(props.item.dateCreate, props.lang, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replace(' г.', '') }</div>
      </div>
      <div className={cn('text')}>
        {props.item.text}
      </div>
      <a href='#' className={cn('link')} onClick={callbacks.onAnswer}>{props.labelAnswer}</a>
      <TreeList list={props.item.children} level={props.level} maxLevel={props.maxLevel} renderItem={props.renderItem}/>
    </div>
  )
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({name: PropTypes.string})
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool
  }).isRequired,
  level: PropTypes.number,
  maxLevel: PropTypes.number,
  lang: PropTypes.string,
  isSelf: PropTypes.bool,
  labelAnswer: PropTypes.string,
  onAnswer: PropTypes.func,
  renderItem: PropTypes.func.isRequired
}

ItemComment.defaultProps = {
  level: 0,
  maxLevel: 0,
  lang: 'ru',
  isSelf: false,
  labelAnswer: 'Ответить',
  onAnswer: () => {}
}

export default memo(ItemComment);
