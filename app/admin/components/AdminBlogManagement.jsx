"use client";
import React, { useEffect, useState, useCallback } from "react";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Calendar, 
  Clock, 
  Tag, 
  Link,
  Eye,
  Save,
  Loader2
} from "lucide-react";

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    date: new Date().toISOString().split('T')[0],
    read_time: "",
    url: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = "http://localhost/gr8_backend/blogs";

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/get_blogs.php`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showNotification("Error loading blogs. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.url.trim()) errors.url = "URL slug is required";
    if (!editingBlog && !formData.image) errors.image = "Image is required";
    
    // URL validation
    if (formData.url && !/^[a-z0-9-]+$/.test(formData.url)) {
      errors.url = "URL slug can only contain lowercase letters, numbers, and hyphens";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    if (files && files[0]) {
      // Validate file type and size
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setFormErrors(prev => ({ ...prev, image: "Please upload a valid image (JPEG, PNG, WebP)" }));
        return;
      }
      
      if (file.size > maxSize) {
        setFormErrors(prev => ({ ...prev, image: "Image size must be less than 5MB" }));
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file,
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Generate URL slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Auto-generate URL when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title: title,
      url: generateSlug(title)
    });
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setSuccessMessage({ message, type });
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // Add or update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification("Please fix the form errors before submitting.", "error");
      return;
    }
    
    setLoading(true);
    
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      });
      
      if (editingBlog) form.append("id", editingBlog.id);

      const endpoint = editingBlog ? "update_blog.php" : "add_blog.php";
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to save blog");
      }

      const result = await response.json();
      
      if (result.success) {
        resetForm();
        fetchBlogs();
        showNotification(
          editingBlog ? "Blog updated successfully!" : "Blog published successfully!"
        );
      } else {
        throw new Error(result.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      showNotification(error.message || "Error saving blog. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/delete_blog.php?id=${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      
      fetchBlogs();
      showNotification("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      showNotification("Error deleting blog. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      tags: blog.tags || "",
      date: blog.date || new Date().toISOString().split('T')[0],
      read_time: blog.read_time || "",
      url: blog.url || "",
      image: null,
    });
    setImagePreview(blog.image ? `${API_URL.replace('/blogs', '')}/uploads/${blog.image}` : null);
    setFormErrors({});
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form
  const resetForm = () => {
    setEditingBlog(null);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      tags: "",
      date: new Date().toISOString().split('T')[0],
      read_time: "",
      url: "",
      image: null,
    });
    setImagePreview(null);
    setFormErrors({});
  };

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Success/Error Notification */}
      {successMessage && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${
          successMessage.type === "error" 
            ? "bg-red-50 border-red-500 text-red-700" 
            : "bg-green-50 border-green-500 text-green-700"
        }`}>
          <div className="flex items-center gap-2">
            {successMessage.type === "error" ? "❌" : "✅"}
            <span className="font-medium">{successMessage.message}</span>
            <button 
              onClick={() => setSuccessMessage("")}
              className="ml-4 hover:opacity-70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                📝 Blog Management
              </h1>
              <p className="text-gray-600 mt-1">Create, edit, and manage your blog posts</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[#0E8A4D] hover:bg-[#10B981] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? "Cancel" : "New Blog Post"}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border p-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              {editingBlog ? <Edit2 className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-green-600" />}
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative mb-6">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({...formData, image: null});
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <span className="text-lg">📰</span> Blog Title *
                    </label>
                    <input
                      name="title"
                      placeholder="Enter an engaging blog title"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition ${
                        formErrors.title ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        ❌ {formErrors.title}
                      </p>
                    )}
                  </div>
                  
                  {/* URL Slug */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Link className="w-4 h-4" /> URL Slug *
                    </label>
                    <input
                      name="url"
                      placeholder="blog-url-slug"
                      value={formData.url}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition ${
                        formErrors.url ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.url ? (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        ❌ {formErrors.url}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4" /> Tags
                    </label>
                    <input
                      name="tags"
                      placeholder="Digital Growth, Featured, SEO"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                  </div>
                  
                  {/* Date */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" /> Publish Date *
                    </label>
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition ${
                        formErrors.date ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        ❌ {formErrors.date}
                      </p>
                    )}
                  </div>
                  
                  {/* Read Time */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4" /> Read Time
                    </label>
                    <input
                      name="read_time"
                      placeholder="5 min read"
                      value={formData.read_time}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition"
                    />
                  </div>
                  
                  {/* Featured Image */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      🖼️ Featured Image {!editingBlog && "*"}
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition ${
                        formErrors.image ? "border-red-500" : "border-gray-300"
                      }`}
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                    />
                    {formErrors.image && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        ❌ {formErrors.image}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPEG, PNG, WebP. Max size: 5MB
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">📝</span> Blog Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Write a compelling description that summarizes your blog post..."
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition ${
                      formErrors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    rows="5"
                    required
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ❌ {formErrors.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/500 characters • This will appear in blog previews
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#0E8A4D] hover:bg-[#10B981] disabled:bg-gray-400 px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingBlog ? (
                      <>
                        <Save className="w-4 h-4" />
                        Update Blog
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Publish Blog
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title, tags, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E8A4D] focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              📚 All Blog Posts
              <span className="bg-[#0E8A4D] text-white text-sm px-3 py-1 rounded-full">
                {filteredBlogs.length}
              </span>
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{blogs.length} total blogs</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[#0E8A4D] hover:text-[#10B981] flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear search
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 animate-spin text-[#0E8A4D] mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg mb-2">
                {searchTerm ? "No blogs found matching your search." : "No blogs yet. Create your first blog post!"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[#0E8A4D] hover:text-[#10B981] font-medium"
                >
                  Clear search and show all blogs
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white group"
                >
                  <div className="relative group">
                    <img 
                      src={`http://localhost/gr8_backend/uploads/${blog.image}`} 
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.read_time}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#0E8A4D] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {blog.date}
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <h3 className="font-bold text-lg line-clamp-2 text-gray-800 group-hover:text-[#0E8A4D] transition">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.split(',').slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                      {blog.tags?.split(',').length > 3 && (
                        <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                          +{blog.tags.split(',').length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <button 
                        className="text-gray-500 hover:text-[#0E8A4D] transition flex items-center gap-1 text-sm"
                        title="View blog"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(blog)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          title="Edit blog"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          title="Delete blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminBlogManagement;