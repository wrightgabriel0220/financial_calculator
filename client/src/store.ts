import { createStore } from 'redux';
import rootReducer from './reducer.js';

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
