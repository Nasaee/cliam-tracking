import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { createLogger } from 'redux-logger';

const loggerMiddleware =
  import.meta.env.NODE_ENV !== 'production' && createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware ? [loggerMiddleware] : []),
});

export default store;
