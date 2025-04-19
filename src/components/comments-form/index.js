import { memo } from 'react';
import PropTypes from 'prop-types';
import Form from '../form';
import Textarea from '../textarea';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CommentsForm({
  onSubmit = () => {},
  submitTitle,
  title,
  cancelTitle,
  style,
  option,
  onClick = () => {},
  onChange = () => {},
  value,
  success,
  error,
}) {
  const cn = bem('CommentsForm');

  return (
    <div className={cn()}>
      <Form
        onSubmit={onSubmit}
        submitTitle={submitTitle}
        title={title}
        cancelTitle={cancelTitle}
        style={style}
        option={option}
        onClick={onClick}
      >
        <Textarea value={value} onChange={onChange} />
        {!success && <span className={cn('error')}>{error}</span>}
      </Form>
    </div>
  );
}

CommentsForm.propTypes = {
  submitTitle: PropTypes.string,
  title: PropTypes.string,
  cancelTitle: PropTypes.string,
  style: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default memo(CommentsForm);
