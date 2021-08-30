import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/component/component-redux/redux-store/Store';
import Routes from './src/view/Routes';

function App(){
  return (
    <Provider store={Store}>
       <Routes/>
    </Provider>
   
  );
};

export default App;
