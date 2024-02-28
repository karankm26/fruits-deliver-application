// import { configureStore } from "@reduxjs/toolkit";
// import apiReducer from "../features/apiSlice";

// const store = configureStore({
//   reducer: {
//     api: apiReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/apiSlice";
import loginReducer from "../features/loginSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const persistConfig = {
  type: "root",
  key: "root",
  storage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({
  api: apiReducer,
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
