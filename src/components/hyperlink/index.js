import { memo } from "react";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import "./style.css";

function Hyperlink({caption, to}) {
    return <Link to={to} className="Hyperlink">{caption}</Link>
}

Hyperlink.propTypes = {
    caption: PropTypes.string,
    to: PropTypes.string,
};

export default memo(Hyperlink);
