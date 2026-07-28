"use client";
import React, {
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useEffect,
} from "react";
import {
  Menu,
  FileText,
  X,
  Contact,
  LogOut,
  Bell,
  HelpCircle,
  ChevronRight,
  Shield,
  Mail,
  Briefcase,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import TeamAdmin from "../adminTeams/Teamadmin";

// Lazy load components for better performance
const AdminBlogForm = lazy(() => import("../adminBlog/AdminBlogForm"));
const AdminContactsPage = lazy(
  () => import("../adminContacts/AdminContactsPage"),
);
const AdminSubscribersPage = lazy(
  () => import("../adminNewsletter/NewsletterAdmin"),
);
const AdminCareersPage = lazy(() => import("../adminCareers/AdminCareersPage"));
const ClientsAdmin = lazy(() => import("../adminClients/ClientsAdmin"));

// Loading component for lazy loading
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-emerald-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-gray-600">Loading module...</p>
    </div>
  </div>
);

// Navigation items configuration
const NAV_ITEMS = [
  { id: "blogs", label: "Blogs", icon: FileText, color: "emerald" },
  { id: "contacts", label: "Contacts", icon: Contact, color: "blue" },
  { id: "subscribers", label: "Subscribers", icon: Mail, color: "purple" },
  { id: "careers", label: "Careers", icon: Briefcase, color: "orange" },
  { id: "teams", label: "Teams", icon: Briefcase, color: "red" },
  { id: "clients", label: "Clients", icon: Handshake, color: "emerald" },
];

const Admin_Main_Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_active_section") || "contacts";
    }
    return "contacts";
  });

  const [notifications, setNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([]);

  // Fetch unread applications count and list
  const fetchNotifications = useCallback(async () => {
    try {
      // const res = await fetch('http://localhost/gr8/api/applications/get_applications.php');
      const res = await fetch("https://api.gr8.com.np/gr8/api/applications/get_applications.php",);
      const data = await res.json();
      if (data.success) {
        setNotifications(data.unread_count || 0);
        // Filter unread or just take the top 5 most recent
        setRecentAlerts(
          data.applications.filter((app) => app.is_read == 0).slice(0, 5),
        );
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      // const res = await fetch('http://localhost/gr8/api/applications/mark_read.php', {
      const res = await fetch("https://api.gr8.com.np/gr8/api/applications/mark_read.php",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mark_all: true }),
        },
      );
      if (res.ok) {
        fetchNotifications();
        setShowNotifications(false);
      }
    } catch (error) {
      console.error("Error marking all as read", error);
    }
  };

  const handleDeleteNotification = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this notification?")) return;
    try {
      // const res = await fetch('http://localhost/gr8/api/applications/delete_application.php', {
      const res = await fetch("https://api.gr8.com.np/gr8/api/applications/delete_application.php",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );
      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  const handleNotificationClick = () => {
    setActiveSection("careers");
    setShowNotifications(false);
  };

  // Memoized sidebar classes
  const sidebarClasses = useMemo(
    () =>
      `${sidebarOpen ? "w-64" : "w-20"} bg-gradient-to-b from-gray-900 to-gray-950 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-800/50 shadow-xl`,
    [sidebarOpen],
  );

  // Memoized content component
  const ActiveComponent = useMemo(() => {
    switch (activeSection) {
      case "blogs":
        return AdminBlogForm;
      case "contacts":
        return AdminContactsPage;
      case "subscribers":
        return AdminSubscribersPage;
      case "careers":
        return AdminCareersPage;
      case "teams":
        return TeamAdmin;
      case "clients":
        return ClientsAdmin;
      default:
        return AdminContactsPage;
    }
  }, [activeSection]);

  useEffect(() => {
    localStorage.setItem("admin_active_section", activeSection);
  }, [activeSection]);

  // Handle navigation with keyboard support
  const handleNavigation = useCallback((sectionId) => {
    setActiveSection(sectionId);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  // Toggle sidebar with animation
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Get color classes based on item
  const getColorClasses = (item, isActive) => {
    if (isActive) {
      return {
        bg: `bg-${item.color}-600`,
        hover: `hover:bg-${item.color}-700`,
        text: "text-white",
        icon: "text-white",
      };
    }
    return {
      bg: "",
      hover: `hover:bg-gray-800/50`,
      text: "text-gray-400 hover:text-white",
      icon: `text-${item.color}-400`,
    };
  };

  //   handle logout
  const router = useRouter();
  const handleLogout = async () => {
    confirm("are you sure you want to logout?");
    try {
      // const res = await fetch("http://localhost/gr8/api/auth/logout.php", {
      const res = await fetch("https://api.gr8.com.np/gr8/api/auth/logout.php",{
          method: "POST",
          credentials: "include", // important for sending session cookie
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/");
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      alert("Server not responding");
    }
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Sidebar Backdrop for Mobile */}
      <AnimatePresence>
        {!sidebarOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className={`fixed md:relative z-50 h-full ${sidebarClasses}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="expanded-header"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <Image
                    src="/mainlogo/GR8-Nepal-Private-Limited-Logo.webp"
                    width={40}
                    height={40}
                    alt="GR8 Nepal Private Limited"
                    className="rounded-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <h1 className="text-white text-lg font-bold">Admin Panel</h1>
                  <p className="text-gray-400 text-xs">GR8 Nepal Pvt. Ltd.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-header"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mx-auto"
              >
                <div className="relative">
                  <Image
                    // src="/mainlogo/GR8-Nepal-private-Limited-Logo.webp"
                    src="https://api.gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp"
                    width={40}
                    height={40}
                    alt="GR8"
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggleSidebar}
            className="text-gray-400 p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:scale-110 hover:text-white active:scale-95"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="space-y-1">
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-400 text-xs  mb-2 px-3 uppercase tracking-wider"
                >
                  Content Management
                </motion.div>
              )}
            </AnimatePresence>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const colorClasses = getColorClasses(item, isActive);

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-2 py-1 rounded-lg transition-all duration-200 ${colorClasses.bg} ${colorClasses.hover} ${colorClasses.text}`}
                  aria-label={item.label}
                >
                  <item.icon className={`w-4 h-4 ${colorClasses.icon}`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className=" whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {sidebarOpen && isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                  {sidebarOpen &&
                    item.id === "careers" &&
                    notifications > 0 && (
                      <span className="ml-auto px-2 py-1 bg-red-500 text-white text-xs rounded-full min-w-5 text-center">
                        {notifications}
                      </span>
                    )}
                </motion.button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-800/50"></div>

          {/* Quick Actions */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-gray-400 text-xs  mb-2 px-3 uppercase tracking-wider">
                  Quick Actions
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span className="">Help & Support</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800/50">
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="expanded-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 text-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <p className="font-semibold text-gray-400">Secure Session</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Admin Dashboard</p>
                    <p>v2.1.0 • Beta</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-gray-500 text-xs">v2.1</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {activeSection}
              </h2>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Dashboard</span>
            </div>

            <div className="flex items-center gap-4 relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                      {notifications > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-75 overflow-y-auto">
                      {recentAlerts.length > 0 ? (
                        recentAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            onClick={handleNotificationClick}
                            className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer group transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                  <Briefcase className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {alert.name}
                                  </p>
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    Applied for{" "}
                                    {alert.job_title || "Application"}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                      alert.created_at,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={(e) =>
                                  handleDeleteNotification(e, alert.id)
                                }
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                title="Delete"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p className="text-sm">No new notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-gray-50 text-center">
                      <button
                        onClick={handleNotificationClick}
                        className="text-xs text-gray-600 hover:text-gray-900 font-medium"
                      >
                        View All Applications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-8 h-8 bg-linear-to-r from-emerald-500 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Suspense fallback={<LoadingFallback />}>
            <ActiveComponent />
          </Suspense>
        </div>

        {/* Status Bar */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>System Status: Operational</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Last updated: Just now</span>
            </div>
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} GR8 Nepal Pvt. Ltd.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Admin_Main_Page;
