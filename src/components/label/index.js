import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Label(props) {

  const cn = bem('Label');

  const onChange = (event) => {
    props.onChange(props.name, event.target.value);
  };

  return (
    <label id={props.name} className={cn()}>
      {props.title}
      <input className={cn('input')} name={props.name} type={props.type} value={props.value} onChange={onChange}/>
    </label>
  )
}

Label.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Label.defaultProps = {
  onChange: () => {
  },
}
export default Label;