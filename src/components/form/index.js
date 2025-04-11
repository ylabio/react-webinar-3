import { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Form(props) {
  const { title, padding, params, buttonTitle, error, onClick = () => {} } = props;
  const cn = bem('Form');

  return (
    <div className={cn({padding})}>
      <div className={cn('container')}>
        <div className={cn('title')}>{title}</div>
        {params.map((param, index) => (
          <div  key={`div_form_${index}`}  className={cn('container-input')}>
            <label className={cn('container-input-label')}>{param.title}</label>
            <Input {...param}/>
          </div>  
        ))}
        <div className={cn('error')}>{error ? `${error}` : ''}</div>
        <Button title={buttonTitle} style={'primary'} type={'submit'} onClick={onClick} />
      </div>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  padding: PropTypes.oneOf(['small', 'medium']),
  params: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonTitle: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  onClick: PropTypes.func,
};

export default memo(Form);
