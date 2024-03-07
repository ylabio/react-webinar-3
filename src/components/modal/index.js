import React, {useRef, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import HeadModal from './head-modal';

function Modal({ children, title, handleCloseModal }) {
  const [isModalOverflow, setIsModalOverflow] = useState(false)

  useEffect(() => {
    const node = modalRef.current
    if (!node) return

    if (window.innerHeight < node.offsetHeight) {
      setIsModalOverflow(true)
    } else {
      setIsModalOverflow(false)
    }

    const handleResize = () => {
      if (window.innerHeight < node.offsetHeight) {
        setIsModalOverflow(true)
      } else {
        setIsModalOverflow(false)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  });
  const modalRef = useRef(null);

  return (
    <div className="darkBG" style={isModalOverflow ? { justifyContent: 'flex-start' } : { justifyContent: 'center'}}>
      <div ref={modalRef} className="Modal">
        <HeadModal title={title} handleCloseModal={handleCloseModal}/>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  handleCloseModal: PropTypes.func,
  children: PropTypes.node,
}

export default React.memo(Modal);