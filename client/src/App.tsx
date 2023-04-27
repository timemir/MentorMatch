import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import api from "./api/api";
import Footer from "./components/Footer/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Verify from "./pages/Auth/Verify/Verify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import MenteeSetup from "./pages/Onboarding/Mentee/MenteeSetup";
import MentorSetup from "./pages/Onboarding/Mentor/MentorSetup";
import Onboarding from "./pages/Onboarding/Onboarding";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import useAuthStore from "./store/authStore";

export function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // Check if user is logged in on page load
  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("csrf_access_token");
      if (authToken) {
        try {
          const user = await api.users.getUser();
          setUser(user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error getting user data:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    fetchData();
  }, [setIsLoggedIn, setUser]);

  return (
    <div className="container mx-auto font-opensans">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Search Screen */}
        <Route path="/search" element={<Search />} />
        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        {/* Onboarding */}
        <Route path="/user-type" element={<Onboarding />} />
        <Route path="/setup/mentee/step/:stepId" element={<MenteeSetup />} />
        <Route path="/setup/mentor/step/:stepId" element={<MentorSetup />} />
        {/* Profiles */}
        <Route path="/profile/:userId" element={<Profile />} />

        {/* Dashboard */}
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
