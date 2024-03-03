import React,{useState}from 'react'
import "./modal.css"


function Modal({ active, setActive }) {

  const data = [
    { code: 1, title: " ", price: 0, count: 0 },
    { code: 2, title: " ", price: 0, count: 0 },
    { code: 3, title: " ", price: 0, count: 0 }
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
      <div className='Head'>
      <h1>Корзина</h1>
      <button className="btn" onClick={() => setActive(false)}>
          Закрыть
        </button>
    </div>

        
      </div>
    </div>
  )
}

export default Modal
