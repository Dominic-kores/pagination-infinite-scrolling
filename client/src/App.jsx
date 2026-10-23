
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="header-content">
          <h2>Kenya Product Catalogue</h2>

          {/* Navigation between pagination and scroll. */}
          <nav>
            <NavLink to="/products">
              Pagination
            </NavLink>

            <NavLink to="/products/scroll">
              Infinite Scroll
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/products" replace />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/products/scroll"
            element={<InfiniteScrollPage />}
          />

          <Route
            path="*"
            element={<h2>Page not found</h2>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
