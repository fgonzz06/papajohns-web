import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import UtilityBar from "./components/layout/UtilityBar";
import PromoStrip from "./components/layout/PromoStrip";
import Footer from "./components/layout/Footer";
import MenuPage from "./pages/MenuPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-40 shadow-sm">
        <Navbar />
        <UtilityBar />
      </div>
      <PromoStrip />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/seguimiento" element={<TrackOrderPage />} />
          <Route path="/seguimiento/:orderId" element={<TrackOrderPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
