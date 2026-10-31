import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Recipie from "./pages/Recipie";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useTheme } from "./context/ThemeContext";

const AuthPageThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle auth-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
    </button>
  );
};

function App() {

  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/signup";

  return (
    <div className="App">

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {!hideLayout && <Navbar />}
      {hideLayout && <AuthPageThemeToggle />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/favorites" element={<Favorites />} />

        <Route
          path="/category/:id"
          element={<Category />}
        />

        <Route
          path="/recipie/:id"
          element={<Recipie />}
        />

        <Route
          path="/trending"
          element={<Trending />}
        />

      </Routes>

      {!hideLayout && <Footer />}

    </div>
  );
}

export default App;