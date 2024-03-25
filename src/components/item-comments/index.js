import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import FormattedDate from '../../utils/formatted-date';
import './style.css';
import LinkSignIn from '../link-sign-in';
import CommentForm from '../comment-form';


function ItemComments(props) {

  const cn = bem('ItemComments');

  const callbacks = {
    openForm: (id) => props.openForm(props.item._id),
  }

  const classActive = props.item.author?._id === props.userId ? 'active' : '';
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <div className={cn('user', classActive)}>{props.item.author?.profile?.name} {props.user}</div>
        <div className={cn('date')}>{FormattedDate(props.item.dateCreate)}</div>
      </div>
      <div className={cn('text')}>
         {props.item.text}
      </div>
      <button className={cn('btn')} onClick={callbacks.openForm}>{props.reply}</button>
      {props.idComment == props.item._id 
        ? (
          (!props.exists && <LinkSignIn signIn={props.signIn} textSignIn={props.textSignIn} link={props.link}/>) 
            || (
                props.exists 
                && <CommentForm 
                  closeForm={props.closeForm} onSubmit={props.onSubmit} label={props.label} showNow={props.showNow} btnSend={props.btnSend}
                  btnCancel={props.btnCancel} placeholder={props.placeholder}
                />
                )
          ) 
        : ''
      }
    </div>
    
  );
}

ItemComments.propTypes = {
  reply: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.object,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  exists: PropTypes.bool, 
  idComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ItemComments.defaultProps = {
  openForm: () => {
  },
}

export default memo(ItemComments);
