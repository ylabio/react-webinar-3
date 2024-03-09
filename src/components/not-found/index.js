import PropTypes from "prop-types";
import './style.css';

function NotFound({message}) {
  return (
    <section className="NotFound">
      <h1 className="NotFound-message">{message}</h1>
    </section>
  )
}

NotFound.propTypes = {
  message: PropTypes.string
}

NotFound.defaultProps = {
  message: '404 - Not Found'
}



export default NotFound;