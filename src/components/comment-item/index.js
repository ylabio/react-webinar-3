import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import {Link} from 'react-router-dom';
import SideLayout from '../side-layout';
import convertDate from '../../utils/convert-date';

function CommentItem(props) {

  const cn = bem('CommentItem');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  }

  return (
    <div style={{marginLeft: (30 * props.item.level) + 'px'}} className={cn()}>
      <SideLayout side={'start'} itemType='commentHeader'>
        <span className={cn('username')}>{props.item.author.profile.name}</span>
        <p className={cn('date')}>{convertDate({locale: 'ru-RU', date: new Date(props.item.dateCreate), dateStyle: 'long', timeStyle: 'short'})}</p>
      </SideLayout>
      <p className={cn('text')}>{props.item.text}</p>
      <Link className={cn('link')} to={props.link}>{props.t('comment.answer')}</Link> {/* todo: осознать зачем тут линк и не забыть прикрутить функционал */}
    </div>
  );
}

CommentItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string
};

CommentItem.defaultProps = {
  onAdd: () => {
  },
  labelCurr: '₽',
  labelAdd: 'Добавить'
}

export default memo(CommentItem);
