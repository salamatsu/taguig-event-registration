import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./slices/rootReducer";

//SAGA
import createSagaMiddleware from "redux-saga";
//ROOT SAGA
import adminSagas from "./sagas/rootSaga/adminSagas";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(saga),
});

saga.run(adminSagas);

export const persistor = persistStore(store);
export default store;
