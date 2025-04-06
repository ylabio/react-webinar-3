import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import { useTranslation } from "../../store/language/use-translation";
import { endpoints } from "../../config/endpoints";

export default function BackLink({ titleKey, handleLinkClick }) {
    const t = useTranslation();

    return (
        <Link
            to={endpoints.home}
            className='Back-link'
            onClick={handleLinkClick}
        >
            {t(titleKey)}
        </Link>
    )
}

BackLink.propTypes = {
    handleLinkClick: PropTypes.func,
}