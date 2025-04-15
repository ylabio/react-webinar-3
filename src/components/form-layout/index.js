import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import FieldInput from '../field-input';
import Button from '../button';

function FormLayout({fields, control, error, onSubmit, disable }) {

  const cn = bem('FormLayout');

  return (
    <form className={cn()} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className={cn('fieldset', { error: Boolean(error) })}>
        {fields.map(field => (
          <FieldInput key={field.name}
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      theme={'small'}/>
        ))}
        {error && <span className={cn('error')}>{error}</span>}
      </div>
      <Button type="submit" style={'primary'} title={control} disabled={disable}/>

    </form>
  );
}

export default memo(FormLayout);
