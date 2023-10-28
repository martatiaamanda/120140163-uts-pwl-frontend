import { Route } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CreateProductPage from "./pages/CreateProductPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="create-product" element={<CreateProductPage />} />
          <Route path="detail-product/:id" element={<DetailPage />} />
          <Route path="edit-product/:id" element={<EditPage />} />
          <Route path="checkout" element={<CheckoutPage />} /> */
        </Route>
      </>
    )
  );

  return <RouterProvider router={routes} />;
};

export default App;
