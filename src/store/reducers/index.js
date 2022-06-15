import { combineReducers } from "redux";
import alert from "./alert_reducer";
import auth from "./auth_reducer";
import { client_reducer } from "./client_reducer";

export default combineReducers({
  alert,
  auth,
  client: client_reducer,
});
