import "./style.css";

function Preloader({ size = 52, isLoading, children }) {
  return isLoading ? (
    <div className="preloader">
      <div className="preloader-wheel" style={{ width: size, height: size }} />
    </div>
  ) : (
    children
  );
}

export default Preloader;
