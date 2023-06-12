import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import {memo} from "react";
import './style.css';

function CommentCard({ level, data, dateCreate, onOpen, onReply, my }) {

  const callbacks = {
    onOpen: () => onOpen(data._id),
    onSubmit: (value) => onReply(data._id, value)
  }

  const cn = bem('CommentCard');
    return (
      <div className={cn({ level, 'deleted': data.isDeleted })}>
        <div className={cn('header')}>
          <span className={cn('author',{my})}>{data.author.profile.name}</span>
          <span className={cn('date')}>{dateCreate}</span>
        </div>
        <div className={cn('body')}>
          <p className={cn('text')}>
            {data.isDeleted ? 'Комментарий был удалён' : data.text}
          </p>
        </div>
        <div className={cn('actions')}>
          <button onClick={callbacks.onOpen} disabled={data.isDeleted} className={cn('reply')}>Ответить</button>
        </div>
      </div>
  );
}

CommentCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    isDeleted: PropTypes.bool,
    text: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    dateCreate: PropTypes.string,
  }),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  level: PropTypes.number,
  isAuth: PropTypes.bool,
}

export default memo(CommentCard);