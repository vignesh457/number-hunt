import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import gameSlice from './gameSlice';
import userSlice from './userSlice';
import { alertReducer, popupReducer } from './uiSlice';
import leaderboardSlice from './leaderboardSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['game', 'user', 'leaderboard'], // Only persist these slices
};

const rootReducer = combineReducers({
  game: gameSlice,
  user: userSlice,
  alert: alertReducer,
  popup: popupReducer,
  leaderboard: leaderboardSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
