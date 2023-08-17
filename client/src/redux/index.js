import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

//thunk middleware is used to intercept actions so as to make API call before dispatching result to reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;