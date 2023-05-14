import {legacy_createStore, applyMiddleware, combineReducers} from "redux";
import { reducer as authReducer} from "./Authentication/reducer";
import thunk from "redux-thunk";

export const store = legacy_createStore(authReducer, applyMiddleware(thunk));