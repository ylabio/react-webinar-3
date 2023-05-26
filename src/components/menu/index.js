import { memo } from "react";
import useTranslate from "../../hooks/use-translation";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';

function Menu(props) {
  const { t } = useTranslate();
  return (
    <ul className="Menu">
      {props.links.map((link) => (
        <li key={link.to} className="Menu-item">
          <Link to={link.to}>{t(link.title)}</Link>
        </li>
      ))}
    </ul>
  );
}

Menu.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      element: PropTypes.string,
    })).isRequired,
  }

  
export default memo(Menu);
