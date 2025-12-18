import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Upload } from 'lucide-react';

export default function AdminBlogPanel() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    description: '',
    content: '',
    imageFile: null,
    tags: '',
    date: new Date().toISOString().split('T')[0],
    read_time: ''
  });
  useEffect(() => {
  const savedState = localStorage.getItem("admin_blog_state");
  if (savedState) {
    const parsed = JSON.parse(savedState);
    setSearchTerm(parsed.searchTerm || "");
    setShowModal(parsed.showModal || false);
    setEditMode(parsed.editMode || false);
    setFormData(parsed.formData || formData);
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "admin_blog_state",
    JSON.stringify({
      searchTerm,
      showModal,
      editMode,
      formData
    })
  );
}, [searchTerm, showModal, editMode, formData]);


  const API_BASE_URL = "http://localhost/gr8/api/blogs";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_blog.php`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !editMode ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('read_time', formData.read_time);
      
      // Append image file if provided
      if (formData.imageFile) {
        formDataToSend.append('image_file', formData.imageFile);
      }

      const endpoint = editMode ? 'update_blog.php' : 'add_blog.php';
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        fetchBlogs();
        setTimeout(() => {
          setShowModal(false);
          resetForm();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      content: blog.content,
      imageFile: null,
      tags: blog.tags,
      date: blog.date ? formatDateForInput(blog.date) : new Date().toISOString().split('T')[0],
      read_time: blog.read_time
    });
    setEditMode(true);
    setShowModal(true);
  };

  const formatDateForInput = (dateStr) => {
    // Convert "21st May, 2025" to "2025-05-21"
    try {
      const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      
      const parts = dateStr.replace(/\d+(st|nd|rd|th)/, '').trim().split(' ');
      const day = dateStr.match(/\d+/)[0].padStart(2, '0');
      const month = months[parts[0].replace(',', '')];
      const year = parts[1].replace(',', '');
      
      return `${year}-${month}-${day}`;
    } catch (e) {
      return new Date().toISOString().split('T')[0];
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/delete_blog.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Blog deleted successfully!' });
        fetchBlogs();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting blog' });
    }
  };

 const resetForm = () => {
  const emptyForm = {
    id: '',
    title: '',
    slug: '',
    description: '',
    content: '',
    imageFile: null,
    tags: '',
    date: new Date().toISOString().split('T')[0],
    read_time: ''
  };

  setFormData(emptyForm);
  setEditMode(false);
  setMessage({ type: '', text: '' });

  localStorage.removeItem("admin_blog_state");
};


  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Blog Management</h1>
          <p className="text-gray-400">Create, edit, and manage your blog posts</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' 
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Blog
          </button>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tags</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{blog.title}</div>
                      <div className="text-gray-400 text-sm">{blog.read_time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.split(',').slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{blog.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBlogs.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No blogs found. Create your first blog post!
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editMode ? 'Edit Blog' : 'Add New Blog'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="blog-url-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Brief description for the blog card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={10}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Full blog content (HTML supported)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image *</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-gray-400 cursor-pointer hover:border-emerald-500 transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      {formData.imageFile ? formData.imageFile.name : 'Choose image file'}
                    </label>
                  </div>
                  {editMode && !formData.imageFile && (
                    <p className="text-sm text-gray-400 mt-2">Leave empty to keep current image</p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags * (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Digital Growth, Featured"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Read Time *</label>
                    <input
                      type="text"
                      name="read_time"
                      value={formData.read_time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="5 min read"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : editMode ? 'Update Blog' : 'Create Blog'}
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}