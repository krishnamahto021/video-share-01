import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" expand={false} richColors closeButton />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};

export default App;
