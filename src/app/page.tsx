"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import AppContent from "@/components/AppContent";

export default function Home() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
