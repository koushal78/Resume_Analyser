import { useState, useRef, useEffect } from "react";
import { IoReorderThreeSharp, IoClose } from "react-icons/io5";
import { FaUser, FaHistory, FaCog } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";

interface User {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
}

const Navbar = () => {
  const { user } = useAuthContext();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const getUserInitial = (): string => {
    if (user?.userName) {
      return user.userName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleMenuClose = (): void => {
    setShowProfileMenu(false);
    setShowMobileMenu(false);
  };

  return (
    <nav className="w-full max-w-7xl mx-auto">
      <div className="text-white py-4">
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 flex justify-between items-center px-6 rounded-2xl py-3 shadow-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <HiSparkles className="text-xl" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Analyser
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/upload"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Upload
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                      {getUserInitial()}
                    </div>
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user?.userName}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-black/50 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-800">
                        <p className="text-sm font-semibold text-white">
                          {user.userName || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email || "user@example.com"}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          to="/Profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          <MdDashboard className="text-lg" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <Link
                          to="/upload"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          <FaHistory className="text-lg" />
                          <span className="text-sm">Resume History</span>
                        </Link>
                     
                      </div>

                      <div className="border-t border-gray-800 pt-2">
                        {/* Use your Logout component here */}
                        <div className="px-4 py-2">
                          <button
                            onClick={handleMenuClose}
                            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <MdLogout className="text-lg" />
                            <span className="text-sm font-medium"><Logout/></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-3xl text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showMobileMenu ? <IoClose /> : <IoReorderThreeSharp />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 mt-2 shadow-2xl">
            {user ? (
              <div className="space-y-4">
                {/* Mobile User Profile */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {getUserInitial()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {user?.userName || "User"}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {user.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                {/* Mobile Menu Links */}
                <Link
                  to="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MdDashboard className="text-xl" />
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  to="/upload"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FaHistory className="text-xl" />
                  <span className="font-medium">Resume History</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                  <FaCog className="text-xl" />
                  <span className="font-medium">Settings</span>
                </button>

                {/* Mobile Logout - Replace with your Logout component */}
                <div className="border-t border-gray-800 pt-4 mt-2">
                  <button
                    onClick={handleMenuClose}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <MdLogout className="text-xl" />
                    <span className="font-medium">
                      <Logout/>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-6 py-3 text-center text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-6 py-3 text-center border-2 border-blue-500/30 hover:border-blue-500 rounded-lg font-semibold text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-6 py-3 text-center bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;