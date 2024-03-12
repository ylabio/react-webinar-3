import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import "style.css";

function MainMenu({ children }) {
    const cn = bem('BasketTool');

    return <div className="MainMenu">{children}</div>;
}

MainMenu.propTypes = {
  children: PropTypes.node,
};

export default memo(MainMenu);