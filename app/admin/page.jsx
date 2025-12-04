"use client";
import React, { useState } from "react";
import { Menu, FileText, X } from "lucide-react";
import AdminBlogManagement from "./components/AdminBlogManagement";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("blogs");

  return (
    <div className="flex h-screen bg-[#101820]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#0A1931] transition-all duration-300 flex flex-col border-r border-gray-800`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-white text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Admin Panel
            </h1>
          )}
          {!sidebarOpen && <span className="text-2xl mx-auto">⚡</span>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="text-gray-400 text-xs font-semibold mb-2 px-3 uppercase">
              {sidebarOpen ? "Content Management" : ""}
            </div>
            
            <button 
              onClick={() => setActiveSection("blogs")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                activeSection === "blogs" 
                  ? "bg-[#0E8A4D] text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <FileText className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Blogs</span>}
              {sidebarOpen && activeSection === "blogs" && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>

            {/* Add more navigation items here as needed */}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {sidebarOpen ? (
            <div className="text-gray-500 text-xs">
              <p className="font-semibold mb-1">Admin Dashboard</p>
              <p>Version 1.0.0</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-xs">v1.0</div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {activeSection === "blogs" && <AdminBlogManagement />}
        {/* Add more sections here as needed */}
      </div>
    </div>
  );
};

export default AdminPanel;