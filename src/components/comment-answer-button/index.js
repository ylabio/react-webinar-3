import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentAnswerButton({onClick}) {

  const cn = bem('CommentAnswerButton');

  return (
    <div className={cn()}>
      <button onClick={onClick} className={`${cn('btn')} ${cn('singInBtn')}` }>Ответить</button>
    </div>
  );
}

CommentAnswerButton.propTypes = {
  onClick: PropTypes.func.isRequired,

};


export default memo(CommentAnswerButton);
