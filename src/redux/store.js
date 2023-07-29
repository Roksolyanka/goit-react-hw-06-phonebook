import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsDetailsReducer } from './contactsDetailsReducer';

const contactsDetailsPersistConfig = {
  key: 'contactsDetails',
  storage,
  whitelist: ['contacts'],
};

export const store = configureStore({
  reducer: {
    contactsDetails: persistReducer(
      contactsDetailsPersistConfig,
      contactsDetailsReducer
    ),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
