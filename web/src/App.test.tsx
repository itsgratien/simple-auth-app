import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/Store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
      <App />
    </MemoryRouter>
    </Provider>,
  );
});
