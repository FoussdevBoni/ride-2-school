import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import  UserSlice  from "./userSlice";
import  SideBarSlice  from "./sideBarsSlice";
import  ChildSlice  from "./childSlice";
import schoolsSlice from "./schoolsSlice";


const routerRedurcer = combineReducers({
    currentUser: UserSlice,
    sideBard: SideBarSlice,
    myChild: ChildSlice, 
    schools: schoolsSlice
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    // whitelist: ["currentUser"]
}

const persistedReducer = persistReducer(persistConfig, routerRedurcer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware(({
        serializableCheck:{
            ignoredActions: [FLUSH,REHYDRATE,PAUSE, PERSIST,REGISTER, PURGE]
        }
    }))
})

export const persistor = persistStore(store)