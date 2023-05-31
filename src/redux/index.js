import contactReducer from "./reducer";
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

export const store = createStore(
    contactReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)