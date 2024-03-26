import {cn as bem} from "@bem-react/classname";
import {memo} from "react";
import './style.css';
import dateFormat from "../../utils/date-format";

function Comment({item}) {
  const cn = bem('Comment');
  const date = dateFormat(item.dateCreate);
  return (
    <div className={cn()} key={item._id}>
      <span className={cn('name')}>{item.author.profile.name}</span>
      <span className={cn('date')}>{date}</span>
      <div className={cn('text')}>{item.text}</div>
      <button className={cn('button')}>Ответить</button>
    </div>
  );
}

export default memo(Comment);