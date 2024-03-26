import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../utils/formatted-date'
import './style.css';
import LoginAlert from '../login-alert'
import TextArea from '../textarea'

function CommentItem(props) {
  const [value, setValue] = useState('')
  const cn = bem('CommentItem');

  const sendReply = (id) => {
    value && props.sendReply({
      text: value,
      parent: {
        _id: id,
        _type: 'comment'
      }
    })
    props.setClose(id)
    setValue('')
  }

  const setReply = (value) => {
    setValue(value)
  }

  const setFormClose = (id) => {
    props.setClose(id)
  }

  const setFormOpn = (id) => {
    props.setOpen(id)
  }

  return (
    <div className={cn()} style={{marginLeft: `${(props.item.parent._tree.length - 1) * 30}px`}} id={props.item._id}>
      <div className={cn('block')}>
        <div className={cn('title')}>
          <b>{props.item.author?.profile?.name}</b>
          <span>{formatDate(props.item?.dateCreate)}</span>
        </div>
        <div className={cn('content')}>
          <p>{props.item?.text}</p>
        </div>
        <button className={cn('link')} onClick={() => setFormOpn(props.item._id)}>Ответить</button>

        {props.isFormOpen === `textarea_${props.item._id}` && props.exists && (
          <div className={cn('reply')}>
            <TextArea label={'Новый ответ'} value={value} placeholder={'Напишите свой ответ'} onChange={setReply}>
              <div className={cn('reply__btns')}>
                <button onClick={() => sendReply(props.item._id)}>Отправить</button>
                <button onClick={() => setFormClose(props.item._id)}>Отмена</button>
              </div>
            </TextArea>
          </div>
        )}
        {props.isFormOpen === `textarea_${props.item._id}` && !props.exists &&(
          <LoginAlert text={'ответить.'}>
            <button className={cn('link__cancel')} onClick={() => setFormClose(props.item._id)}>Отмена</button>
          </LoginAlert>
        )}

      </div>
      {props.item.replies?.map(reply => (
          <CommentItem
            key={reply._id}
            item={reply}
            exists={props.exists}
            isFormOpen={props.isFormOpen}
            setOpen={props.setOpen}
            setClose={props.setClose}
            sendReply={props.sendReply}/>
        ))}
    </div>
  );
}

CommentItem.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      }),
    }),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    isDeleted: PropTypes.bool,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string,
      _tree: PropTypes.array
    }),
    text: PropTypes.string,
  }).isRequired,
};

CommentItem.defaultProps = {
}

export default memo(CommentItem);
