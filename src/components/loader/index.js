import './style.css';

function Loader({ isLoading, children }) {

  return (
    isLoading === true ?
    <div className='Loader'>
      <h2 className='Loader-title'>Loading...</h2>
    </div>
    :
    children
  )
}

export default Loader;
