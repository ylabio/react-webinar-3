import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import dateFormat from '../../utils/date-format';

function ItemComment(props) {

  const cn = bem('ItemComment');
  
  const callbacks = {
    onAnswer: (e) => {
      e.preventDefault();
      props.onAnswer({_id: props.item._id, _type: 'comment'});
    }
  };

  return (
    <div className={cn()} style={{paddingLeft: props.item.paddingLeft + 'px'}}>
      <div className={cn('meta')}>
        <div className={cn('author')}>{props.item.author.profile.name}</div>
        <div className={cn('date')}>{ dateFormat(props.item.dateCreate, props.lang, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replace(' г.', '') }</div>
      </div>
      <div className={cn('text')}>
        {props.item.text}
      </div>
      <a href='#' className={cn('link')} onClick={callbacks.onAnswer}>Ответить</a>
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
    isDeleted: PropTypes.bool,
    paddingLeft: PropTypes.number,
  }).isRequired,
  lang: PropTypes.string,
  onAnswer: PropTypes.func
}

ItemComment.defaultProps = {
  lang: 'ru',
  onAnswer: () => {}
}

export default memo(ItemComment);
