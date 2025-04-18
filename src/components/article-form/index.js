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
        <Button style="primary" type="submit" title={'Отправить'} isDisabled={props.isDisabledBtn} />
        {isOpenInComments && (
          <Button style="outline" type="button" title={'Отмена'} onClick={onCloseForm} />
        )}
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  title: PropTypes.string,
  onCloseForm: PropTypes.func,
  onSubmit: PropTypes.func,
  isOpenInComments: PropTypes.bool,
  isDisabledBtn: PropTypes.bool,
};

export default ArticleForm;
