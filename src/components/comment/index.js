import {cn as bem} from "@bem-react/classname";
import {memo} from "react";
import './style.css';
import dateFormat from "../../utils/date-format";
import CommentForm from "../comment-form";
import {Link} from "react-router-dom";

function Comment({item, isAuth, key, onCloseForm, onOpenForm, visibleForm, handleSubmit}) {
  const cn = bem('Comment');
  const date = dateFormat(item.dateCreate);

  return (
    <div className={cn()} key={key}>
      <span className={cn('name')}>{item.author.profile.name}</span>
      <span className={cn('date')}>{date}</span>
      <div className={cn('text')}>{item.text}</div>
      <button className={cn('button')} onClick={() => onOpenForm(item._id)}>Ответить</button>

      {visibleForm &&
        <div className={cn('form')}>
          {isAuth ?
            <CommentForm
              id={item._id}
              onOpenForm={onOpenForm}
              onCloseForm={onCloseForm}
              handleSubmit={handleSubmit}
              labelButton={'Новый ответ'}
            />
            : <div className={cn('auth-none')}>
              <Link to={'/login'}>Войдите</Link>
              <span>, чтобы иметь возможность комментировать</span>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default memo(Comment);