
import { Home, Plane, Info, User, BookOpen } from "lucide-react";
import Index from "./pages/Index";
import TopDeals from "./pages/TopDeals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import BookingFlow from "./pages/BookingFlow";
import BookingConfirmation from "./pages/BookingConfirmation";
import OptimizedSearchResults from "./pages/OptimizedSearchResults";
import NotFound from "./pages/NotFound";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <Index />,
  },
  {
    title: "Top Deals",
    to: "/top-deals",
    icon: Plane,
    page: <TopDeals />,
  },
  {
    title: "Login",
    to: "/login",
    icon: User,
    page: <Login />,
  },
  {
    title: "Register",
    to: "/register",
    icon: User,
    page: <Register />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <Profile />,
  },
  {
    title: "Forgot Password",
    to: "/forgot-password",
    icon: User,
    page: <ForgotPassword />,
  },
  {
    title: "Booking Flow",
    to: "/booking/:id",
    icon: Plane,
    page: <BookingFlow />,
  },
  {
    title: "Booking Confirmation",
    to: "/booking-confirmation/:id",
    icon: Plane,
    page: <BookingConfirmation />,
  },
  {
    title: "Optimized Search Results",
    to: "/search-optimized",
    icon: Plane,
    page: <OptimizedSearchResults />,
  },
  {
    title: "Not Found",
    to: "*",
    icon: Info,
    page: <NotFound />,
  },
];
