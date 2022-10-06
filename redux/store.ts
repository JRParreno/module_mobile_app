import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scoreReducer } from './reducers/scoreReducers';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
}

const rootReducer = combineReducers({
    score: scoreReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export type AppStateStore = ReturnType<typeof rootReducer>


export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor }
};