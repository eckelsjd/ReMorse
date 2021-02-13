import { createStore, combineReducers } from "redux";
import messages, { gotMessages, gotNewMessage } from "./messages";
import user, { gotUser } from "./user";
import formInput from "./form";

let navigate;
const reducers = combineReducers({ messages, user,formInput });
const store = createStore(reducers);
export default store;
export * from "./user";
export * from "./messages";
export * from "./form";
