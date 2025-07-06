import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";

// Temporary fix: Suppress findDOMNode warnings from Semantic UI React
const originalError = console.error;
console.error = function (...args) {
  if (args[0] && args[0].includes && args[0].includes('findDOMNode')) {
    return;
  }
  originalError.apply(console, args);
};
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from "redux-promise";
import App from "./components/App.jsx";
import reducers from "./reducers/RootReducer";
let store;

try {
    store = createStore(reducers, applyMiddleware(ReduxPromise));
    const container = document.getElementById("app");
    if (!container) {
        throw new Error("Root element 'app' not found in the document.");
    }

    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App store={store} />
            </Provider>
        </React.StrictMode>
    );
} catch (error) {
    console.error("Error during ReactDOM.render:", error);
    const body = document.querySelector("body");

    if (body) {
        body.innerHTML = `<h1>Error: ${error.message}</h1>`;
    } else {
        alert(`Error: ${error.message}`);
    }
}
export default store;
