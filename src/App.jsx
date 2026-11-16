import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/home";
import CategoriesPage from "./pages/categories";
import CategoryProductsPage from "./pages/categoryProducts";
import AllProducts from "./pages/allProducts";
import AllSales from "./pages/allSales";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import ErrorPage from "./pages/error";

// Root of every page. ScrollRestoration opens each new page at the top
// and restores the previous position on browser Back/Forward.
function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

// createBrowserRouter (a "data router") is required for ScrollRestoration
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "categories/:id", element: <CategoryProductsPage /> },
          { path: "products", element: <AllProducts /> },
          { path: "products/:id", element: <ProductPage /> },
          { path: "sales", element: <AllSales /> },
          { path: "cart", element: <CartPage /> },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
