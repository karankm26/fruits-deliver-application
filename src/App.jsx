import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import Wrapper from "./components/Wrapper/wrapper";
import ErrorBoundary from "./Hoc/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Wrapper />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
