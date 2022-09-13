import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { worker } from 'src/mocks/Setup';
import store from 'src/redux/Store';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// start mock service worker
// void worker.start();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const client = new QueryClient();
root.render(
  <React.StrictMode>
  <QueryClientProvider client={client}>
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
