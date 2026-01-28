"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  Loader2, 
  Search, 
  MessageSquare,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Archive,
  RotateCcw,
  X,
  Trash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook for managing deleted IDs with localStorage
const useDeletedIds = () => {
  const [deletedIds, setDeletedIds] = useState(() => {
    // Initialize from localStorage only once
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('deletedContactIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Persist to localStorage whenever deletedIds changes
  useEffect(() => {
    if (deletedIds.size > 0) {
      localStorage.setItem('deletedContactIds', JSON.stringify([...deletedIds]));
    } else {
      localStorage.removeItem('deletedContactIds');
    }
  }, [deletedIds]);

  const addDeletedId = useCallback((id) => {
    setDeletedIds(prev => new Set([...prev, id]));
  }, []);

  const removeDeletedId = useCallback((id) => {
    setDeletedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const clearAllDeleted = useCallback(() => {
    setDeletedIds(new Set());
  }, []);

  return { deletedIds, addDeletedId, removeDeletedId, clearAllDeleted };
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedId, setExpandedId] = useState(null);
  const [showUndo, setShowUndo] = useState(null);
  const { deletedIds, addDeletedId, removeDeletedId, clearAllDeleted } = useDeletedIds();
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showHiddenSidebar, setShowHiddenSidebar] = useState(false);
  const [hiddenSearchTerm, setHiddenSearchTerm] = useState("");
  const [expandedHiddenId, setExpandedHiddenId] = useState(null);

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter and sort contacts whenever dependencies change
  useEffect(() => {
    filterAndSortContacts();
  }, [contacts, searchTerm, sortOrder, deletedIds]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      // const response = await fetch("http://localhost/gr8/api/contact/get_contacts.php");
      const response = await fetch("https://gr8.com.np/gr8/api/contact/get_contacts.php");
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortContacts = () => {
    let filtered = [...contacts];

    // Filter out deleted messages
    filtered = filtered.filter(contact => !deletedIds.has(contact.id));

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredContacts(filtered);
  };

  // Get hidden contacts
  const getHiddenContacts = useCallback(() => {
    return contacts
      .filter(contact => deletedIds.has(contact.id))
      .filter(contact =>
        hiddenSearchTerm === "" ||
        contact.name?.toLowerCase().includes(hiddenSearchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(hiddenSearchTerm.toLowerCase()) ||
        contact.subject?.toLowerCase().includes(hiddenSearchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // Show newest hidden first
      });
  }, [contacts, deletedIds, hiddenSearchTerm]);

  const hiddenContacts = getHiddenContacts();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleHiddenExpand = (id) => {
    setExpandedHiddenId(expandedHiddenId === id ? null : id);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handleDeleteContact = (id) => {
     if (window.confirm("Are you sure you want to Delete this Message ?")) {
      clearAllDeleted();
      setShowHiddenSidebar(false);
    }
    
    // Store the deleted contact temporarily for undo
    const deletedContact = contacts.find(contact => contact.id === id);
    setLastDeleted({ id, contact: deletedContact });
    
    // Add to deleted IDs
    addDeletedId(id);
    setShowUndo(id);
    
    // Hide undo notification after 5 seconds
    const timer = setTimeout(() => {
      setShowUndo(null);
      setLastDeleted(null);
    }, 5000);

    return () => clearTimeout(timer);
  };

  const handleUndoDelete = (id) => {
    removeDeletedId(id);
    setShowUndo(null);
    setLastDeleted(null);
  };

  const handleClearAllDeleted = () => {
    if (window.confirm("Are you sure you want to permanently clear all Deleted Messages ? This action cannot be undone.")) {
      clearAllDeleted();
      setShowHiddenSidebar(false);
    }
  };

  const handleRestoreAllDeleted = () => {
    if (window.confirm("Restore all Deleted Messages?")) {
      clearAllDeleted();
      setShowHiddenSidebar(false);
    }
  };

  const restoreContact = (id) => {
    removeDeletedId(id);
  };

  // Calculate statistics
  const totalMessages = contacts.length;
  const visibleMessages = totalMessages - deletedIds.size;
  const messagesWithPhone = contacts.filter(c => c.phone && !deletedIds.has(c.id)).length;
  
  const thisMonthMessages = contacts.filter(c => {
    if (deletedIds.has(c.id)) return false;
    const contactDate = new Date(c.created_at);
    const now = new Date();
    return contactDate.getMonth() === now.getMonth() && 
           contactDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Undo Notification */}
      <AnimatePresence>
        {showUndo !== null && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-gray-700">Message hidden</span>
              <button
                onClick={() => handleUndoDelete(showUndo)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={() => setShowUndo(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <XCircle size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Items Sidebar */}
      <AnimatePresence>
        {showHiddenSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHiddenSidebar(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Archive className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Deleted Messages</h2>
                      <p className="text-gray-600 text-sm">
                        {hiddenContacts.length} message{hiddenContacts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowHiddenSidebar(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Search in Deleted Messages */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search Deleted Messages..."
                    value={hiddenSearchTerm}
                    onChange={(e) => setHiddenSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleRestoreAllDeleted}
                    className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    Show All
                  </button>
                  <button
                    onClick={handleClearAllDeleted}
                    className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                </div>
              </div>

              {/* Deleted Messages List */}
              <div className="flex-1 overflow-y-auto p-4">
                {hiddenContacts.length === 0 ? (
                  <div className="text-center py-12">
                    <Archive className="mx-auto text-gray-300" size={48} />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No Deleted Messages</h3>
                    <p className="mt-2 text-gray-600 text-sm">
                      {hiddenSearchTerm ? 'No Deleted Messages match your search' : 'All messages are visible'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hiddenContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 truncate">{contact.name}</h4>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {contact.subject}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm truncate">{contact.email}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              {contact.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone size={12} />
                                  {contact.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {getTimeAgo(contact.created_at)}
                              </span>
                            </div>
                            
                            {/* Message preview */}
                            {expandedHiddenId === contact.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3 pt-3 border-t border-gray-200"
                              >
                                <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-3">
                                  {contact.message}
                                </p>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 ml-2">
                            <button
                              onClick={() => toggleHiddenExpand(contact.id)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title={expandedHiddenId === contact.id ? "Collapse" : "Expand"}
                            >
                              {expandedHiddenId === contact.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            <button
                              onClick={() => restoreContact(contact.id)}
                              className="p-1 text-green-600 hover:text-green-800"
                              title="Restore message"
                            >
                              <RotateCcw size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Deleted Messages are stored locally</span>
                  <button
                    onClick={() => setShowHiddenSidebar(false)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
            </div>
            <div className="flex items-center gap-3">
              {deletedIds.size > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHiddenSidebar(true)}
                    className="px-4 py-2 text-red-600  text-sm font-medium rounded-lg cursor-pointer hover:text-red-800 transition-colors flex items-center gap-2"
                  >
                    <Trash size={16} />
                    Trash  ({deletedIds.size})
                  </button>
                </div>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {visibleMessages} {visibleMessages === 1 ? 'Message' : 'Messages'} visible
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search messages by name, email, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <button 
                onClick={fetchContacts}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <MessageSquare className="mx-auto text-gray-300" size={64} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {deletedIds.size > 0 && totalMessages > 0 ? 'No message found' : 'cant see any messages here'}
            </h3>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {filteredContacts.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Message Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <User className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                              {item.subject}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{item.email}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            {item.phone && (
                              <span className="flex items-center gap-1">
                                <Phone size={14} />
                                {item.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {getTimeAgo(item.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Message Content */}
                  {expandedId === item.id && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                        <p className="text-gray-800 whitespace-pre-line bg-white p-4 rounded-lg">
                          {item.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          Received: {new Date(item.created_at).toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.location.href = `mailto:${item.email}?subject=Re: ${item.subject}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Mail size={16} />
                            Reply
                          </button>
                          <button 
                            onClick={() => handleDeleteContact(item.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Stats Summary */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {visibleMessages} visible • {deletedIds.size} deleted
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">With Phone Number</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {messagesWithPhone}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {thisMonthMessages}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <EyeOff className="text-amber-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deleted Messages</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deletedIds.size}
                  </p>
                  {deletedIds.size > 0 && (
                    <button
                      onClick={() => setShowHiddenSidebar(true)}
                      className="text-xs text-amber-600 hover:text-amber-800 mt-1 font-medium flex items-center gap-1"
                    >
                      <EyeOff size={12} />
                      View all
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}