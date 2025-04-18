import { memo } from "react";
import CommentsForm from "../comments-form";
import Button from "../button";
import dataFormate from "../../utils/date-format";
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsList({ t = text => text, value, count, user, list = [], onChange = () => {}, onClick }) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('title')}>{`${t('article.comments')} (${count})`}</div>
        {list.map((item) =>(
          <div
            key={`comment-${item._id || item.dateCreate}`}
            className={cn('comments-container')}
            style={{ paddingLeft: `${item.depth * 40}px` }}
          >
            <div className={cn('comments-container-name')}>
              <div className={cn('name')}>{item.author}</div>
              <div className={cn('date')}>{dataFormate(item.dateCreate)}</div>
            </div>
            <div className={cn('text')}>{item.text}</div>
            <Button style={'text_comments'} title={t('article.answer')}></Button>
          </div>
        ))}
        {Object.keys(user).length === 0 ?
          <div className={cn('link')}>
            <Link to={'/login'}>{t('article.login.part1')}</Link>
            {t('article.login.part2')}
          </div>
          :
          <CommentsForm
            title={t('article.new-comment')}
            titleButton={t('article.send')}
            onChange={onChange}
            onClick={onClick}
            value={value}
          />
        }
      </div>
    </div>
  )
}

export default memo(CommentsList);
