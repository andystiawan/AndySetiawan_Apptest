import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Reducers from "../redux-reducer/Reducers";
const middleware = [thunk];

const Store = createStore(
  Reducers,
  applyMiddleware(...middleware)
); 

export default Store;

