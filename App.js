import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import RootStackScreen from './navigation'
import store from './redux/store'
const persistStore1 = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore1} loading={null}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App