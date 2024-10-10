import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import Routes from './src/routes';
import {StatusBar} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import SocketContext from './src/context/context/socketContext';
import {SOCKET_BASE_URL} from './src/network/Environment';
import io from 'socket.io-client';

const persistor = persistStore(store);

if (__DEV__) {
  const ignoreWarns = ['VirtualizedLists should never be nested inside plain ScrollViews'];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

const socket = io(SOCKET_BASE_URL);

const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey=""
        urlScheme="" // required for 3D Secure and bank redirects
        merchantIdentifier="" // required for Apple Pay
      >
        <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <PersistGate loading={null} persistor={persistor}>
          <SocketContext.Provider value={socket}>
            <Routes />
          </SocketContext.Provider>
        </PersistGate>
      </StripeProvider>
    </Provider>
  );
};

export default App;
