import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import ApplicationRoot from "./ApplicationRoot/ApplicationRoot";

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationRoot />
    </Provider>
  );
}
