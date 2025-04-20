import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import { Link } from 'react-router-dom';

function CommentAction(props) {
  const {
    t = text => text,
    onAdd = () => {},
    setValue = () => {},
    cancel = () => {},
    value = '',
    isReply = false,
    auth = false,
    link = '/login',
    backLink = '',
  } = props;
  const cn = bem('CommentAction');

  const label = isReply ? t('comment.newReply') : t('comment.newComment');

  const onChangeHandler = event => {
    setValue(event.target.value);
  };

  if (!auth) {
    return (
      <div className={cn({type: 'alert'})}>
        <Link to={link} state={{back: backLink}}>{t('comment.authHint.link')}</Link>{t('comment.authHint.text')}
      </div>
    );
  }


  return (
    <div className={cn()}>
      <label htmlFor="story">{label}</label>
      <textarea id="story"
                name="story"
                onChange={onChangeHandler}
                value={value}/>
      <div className={cn('controls')}>
        <Button title={t('comment.send')} style={'primary'} onClick={() => {
          onAdd();
          cancel();
        }}/>
        {isReply && value !== '' && <Button title={t('comment.cancel')} style={'outline'} onClick={cancel}/>}
      </div>
    </div>
  );
}

CommentAction.propTypes = {
  onAdd: PropTypes.func,
  t: PropTypes.func,
  value: PropTypes.string,
  isReply: PropTypes.bool,
  auth: PropTypes.bool,
  link: PropTypes.string,
  backLink: PropTypes.string,
  cancel: PropTypes.func,
};

export default memo(CommentAction);
