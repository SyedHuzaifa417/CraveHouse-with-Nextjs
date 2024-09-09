"use client";
import { persistor, store } from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
//could not directly use in layout because the persistGate was rendering on server side and giving error of | redux-persist failed to create sync storage. falling back to noop storage. ⨯ TypeError: Super expression must either be null or a function at webpack_require
//so we outsource the provider and persistGate to a client component
