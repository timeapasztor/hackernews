import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import HackerStories from "./components/HackerStories";

const App = () => {
  return (
    <Provider store={store}>
      <HackerStories />
    </Provider>
  );
}

export default App;
