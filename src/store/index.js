import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from './app';
import place from './place';

const persistConfig = {
    key: 'root',
    timeout: null,
    storage,
};

const rootReducer = combineReducers({
    app: app.reducer,
    place: place.reducer,
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);