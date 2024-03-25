import {cn as bem} from "@bem-react/classname";
import {memo} from "react";
import './style.css';

function Comment({item}) {
  const cn = bem('Comment');
  return (
    <div className={cn()} key={item._id}>
      <span>{item.author.profile.name}</span>
      <span>25 августа 2022 в 14:00</span>
      <div className={cn('text')}>{item.text}</div>
      <button>Ответить</button>
    </div>
  );
}

export default memo(Comment);