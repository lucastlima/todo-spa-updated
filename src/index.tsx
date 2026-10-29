import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import GlobalStyle from './utils/global';
import store from './store';

if (!('popover' in HTMLElement.prototype)) {
  import('@oddbird/popover-polyfill');
}

if (
  !Object.prototype.hasOwnProperty.call(
    HTMLButtonElement.prototype,
    'interestForElement'
  )
) {
  import('interestfor');
}

const root = document.getElementById('root')!;

createRoot(root).render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>
);
