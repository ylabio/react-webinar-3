import { memo } from "react";
import './style.css';
import PropTypes from "prop-types";

function CrumbsContainer( { children }) {
    return (
        <div className={'CrumbsContainer'}>
            {children.map((item, i) => {
                return (
                    <div key={i}>{item}</div>
                )
            })}
        </div>
    )
}

CrumbsContainer.propTypes = {
  children: PropTypes.node
}

export default memo(CrumbsContainer);