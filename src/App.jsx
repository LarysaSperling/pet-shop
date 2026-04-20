import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/home";
import CategoriesPage from "./pages/categories";
import CategoryProductsPage from "./pages/categoryProducts";
import AllProducts from "./pages/allProducts";
import AllSales from "./pages/allSales";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import ErrorPage from "./pages/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:id" element={<CategoryProductsPage />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="sales" element={<AllSales />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

