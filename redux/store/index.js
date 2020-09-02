import { createStore, applyMiddleware, compose } from 'redux'
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reuducers'
import ReduxThunk from 'redux-thunk'
import { reactotron } from './ReactotronConfig';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['CandidatesReducer'],
  // blacklist: ['CandidatesReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(ReduxThunk),
    reactotron.createEnhancer(),
  )
);
export default store;