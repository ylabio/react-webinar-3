import React from 'react';
import PropTypes from "prop-types";

const PageModal = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

PageModal.propTypes = {
    children: PropTypes.node
}
 
export default PageModal;