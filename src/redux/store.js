import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MainReducer from "./MainReducer";

const rootReducer = combineReducers(MainReducer);
const store = configureStore({
  reducer: rootReducer,
});

export default store;
