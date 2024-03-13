import ReactDOM from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { BrowserRouter } from 'react-router-dom';

const store = new Store();

const rootElement = document.getElementById('root');

// Первый рендер приложения
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>,
  );
} else {
  console.error('Root element not found');
}
