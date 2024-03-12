import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ItemLink({ title, id, closeModal }) {
  const navigate = useNavigate();

  const onClickLink = useCallback((id) => {
    navigate(`/product/${id}`);
    closeModal();
  });

  return <a onClick={() => onClickLink(id)}>{title}</a>;
}
ItemLink.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default memo(ItemLink);
