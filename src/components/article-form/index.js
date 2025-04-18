import PropTypes from 'prop-types';

import Button from '../button';

import './style.css';

function ArticleForm({
  children,
  title = '',
  isOpenInComments = false,
  onCloseForm = () => {},
  onSubmit = () => {},
  ...props
}) {
  return (
    <form className="ArticleForm" onSubmit={onSubmit} >
      <h4>{title}</h4>
      {children}
      <div className="ArticleForm-actions">
        <Button style="primary" type="submit" title={'Отправить'} isDisabled={!props.commentLen} />
        {isOpenInComments && (
          <Button style="outline" type="button" title={'Отмена'} onClick={onCloseForm} />
        )}
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  title: PropTypes.string,
  placeholderText: PropTypes.string,
  onCloseForm: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  commentLen: PropTypes.number,
  isOpenInComments: PropTypes.bool,
};

export default ArticleForm;
