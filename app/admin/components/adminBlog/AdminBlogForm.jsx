import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Bold, Italic, Underline, List, ListOrdered, Link2, Calendar, Clock, Tag, Image as ImageIcon, FileText, MoreVertical } from 'lucide-react';

export default function AdminBlogPanel() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const contentEditorRef = useRef(null);
  
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

  // const API_BASE_URL = "http://localhost/gr8/api/blogs";
  const API_BASE_URL = "https://api.gr8.com.np/gr8/api/blogs";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/get_blog.php`);
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && Array.isArray(data.blogs)) {
        const sanitizedBlogs = data.blogs
          .filter(blog => blog != null)
          .map(blog => ({
            id: blog.id || '',
            title: blog.title || 'Untitled',
            slug: blog.slug || '',
            description: blog.description || '',
            content: blog.content || '',
            image: blog.image || '',
            tags: blog.tags || '',
            date: blog.date || '',
            read_time: blog.read_time || ''
          }));
        
        setBlogs(sanitizedBlogs);
      } else {
        console.error('Invalid API response:', data);
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
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

  const applyFormatting = (command, value = null) => {
    contentEditorRef.current?.focus();
    document.execCommand(command, false, value);
    handleContentChange();
  };

  const applyHeading = (level) => {
    contentEditorRef.current?.focus();
    document.execCommand('formatBlock', false, `h${level}`);
    handleContentChange();
  };

  const handleContentChange = () => {
    if (contentEditorRef.current) {
      setFormData(prev => ({
        ...prev,
        content: contentEditorRef.current.innerHTML
      }));
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      applyFormatting('createLink', url);
    }
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
      
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('read_time', formData.read_time);
      
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
      id: blog.id || '',
      title: blog.title || '',
      slug: blog.slug || '',
      description: blog.description || '',
      content: blog.content || '',
      imageFile: null,
      tags: blog.tags || '',
      date: blog.date ? formatDateForInput(blog.date) : new Date().toISOString().split('T')[0],
      read_time: blog.read_time || ''
    });
    setEditMode(true);
    setShowModal(true);
    setTimeout(() => {
      if (contentEditorRef.current) {
        contentEditorRef.current.innerHTML = blog.content || '';
      }
    }, 100);
  };

  const formatDateForInput = (dateStr) => {
    try {
      if (!dateStr) return new Date().toISOString().split('T')[0];
      
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      
      const parts = dateStr.replace(/\d+(st|nd|rd|th)/, '').trim().split(' ');
      const dayMatch = dateStr.match(/\d+/);
      const day = dayMatch ? dayMatch[0].padStart(2, '0') : '01';
      const month = months[parts[0]?.replace(',', '')] || '01';
      const year = parts[1]?.replace(',', '') || new Date().getFullYear().toString();
      
      return `${year}-${month}-${day}`;
    } catch (e) {
      return new Date().toISOString().split('T')[0];
    }
  };

  const handleDelete = async (id) => {
    if (!id || !confirm('Are you sure you want to delete this blog?')) return;

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
    
    if (contentEditorRef.current) {
      contentEditorRef.current.innerHTML = '';
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (!blog) return false;
    
    const title = blog.title || '';
    const tags = blog.tags || '';
    const search = searchTerm.toLowerCase();
    
    return title.toLowerCase().includes(search) || 
           tags.toLowerCase().includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your blog content</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-white border border-gray-300 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              <div className="flex-1">{message.text}</div>
              <button onClick={() => setMessage({ type: '', text: '' })}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{blogs.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-semibold text-gray-900">{blogs.length}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading blogs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No blog posts found</div>
            <p className="text-gray-500 text-sm mb-4">Get started by creating your first blog post</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 justify-center"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </button>
          </div>
        )}

        {/* Blogs Table */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => {
                    if (!blog) return null;
                    
                    const safeBlog = {
                      id: blog.id || '',
                      title: blog.title || 'Untitled',
                      image: blog.image || '',
                      read_time: blog.read_time || '',
                      tags: blog.tags || '',
                      date: blog.date || '',
                      status: blog.status || 'published'
                    };
                    
                    return (
                      <tr key={safeBlog.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {safeBlog.image ? (
                              <img 
                                src={safeBlog.image} 
                                alt={safeBlog.title}
                                className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900 text-sm line-clamp-1">
                                {safeBlog.title}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />
                                {safeBlog.read_time || 'No time specified'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Published
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-50">
                            {safeBlog.tags ? (
                              <>
                                {safeBlog.tags.split(',').slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                    {tag.trim()}
                                  </span>
                                ))}
                                {safeBlog.tags.split(',').length > 2 && (
                                  <span className="px-2 py-1 text-gray-500 text-xs">
                                    +{safeBlog.tags.split(',').length - 2}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="px-2 py-1 text-gray-400 text-xs italic">No tags</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {safeBlog.date || 'No date'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(safeBlog.id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Search Results Empty State */}
        {!loading && blogs.length > 0 && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No matching blog posts found</div>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editMode ? 'Edit Blog Post' : 'New Blog Post'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {editMode ? 'Update your blog post details' : 'Fill in the details for your new blog post'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title and Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="blog-url-slug"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description for the blog card"
                    />
                  </div>

                  {/* Content Editor */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <div className="text-xs text-gray-500">Rich Text Editor</div>
                    </div>
                    
                    {/* Toolbar */}
                    <div className="bg-gray-50 border border-gray-300 rounded-t-lg px-2 py-1.5 flex flex-wrap gap-1">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => applyHeading(1)}
                          className="px-2 py-1 hover:bg-gray-200 rounded text-gray-700 text-xs font-semibold transition-colors"
                          title="Heading 1"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => applyHeading(2)}
                          className="px-2 py-1 hover:bg-gray-200 rounded text-gray-700 text-xs font-semibold transition-colors"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => applyHeading(3)}
                          className="px-2 py-1 hover:bg-gray-200 rounded text-gray-700 text-xs font-semibold transition-colors"
                          title="Heading 3"
                        >
                          H3
                        </button>
                      </div>

                      <div className="w-px bg-gray-300 mx-1"></div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => applyFormatting('bold')}
                          className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                          title="Bold"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormatting('italic')}
                          className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                          title="Italic"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormatting('underline')}
                          className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                          title="Underline"
                        >
                          <Underline className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-px bg-gray-300 mx-1"></div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => applyFormatting('insertUnorderedList')}
                          className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormatting('insertOrderedList')}
                          className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                          title="Numbered List"
                        >
                          <ListOrdered className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-px bg-gray-300 mx-1"></div>

                      <button
                        type="button"
                        onClick={insertLink}
                        className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                        title="Insert Link"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Editor */}
                    <div
                      ref={contentEditorRef}
                      contentEditable
                      onInput={handleContentChange}
                      className="w-full min-h-50 bg-white border border-t-0 border-gray-300 rounded-b-lg px-3 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
                      style={{ maxHeight: '300px' }}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Select text and use the toolbar to format. Press Enter for new paragraphs.
                    </p>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Featured Image <span className="text-red-500">*</span>
                    </label>
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
                        className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <ImageIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {formData.imageFile ? formData.imageFile.name : 'Click to upload image'}
                          </div>
                          <div className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</div>
                        </div>
                        <div className="text-blue-600 text-sm font-medium">Browse</div>
                      </label>
                    </div>
                    {editMode && !formData.imageFile && (
                      <p className="text-xs text-gray-500 mt-1.5">Leave empty to keep current image</p>
                    )}
                  </div>

                  {/* Tags, Date, Read Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Tag className="inline w-3.5 h-3.5 mr-1" />
                        Tags <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digital Growth, Featured"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Calendar className="inline w-3.5 h-3.5 mr-1" />
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Clock className="inline w-3.5 h-3.5 mr-1" />
                        Read Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="read_time"
                        value={formData.read_time}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : editMode ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom styles for content editor */}
      <style>{`
        [contenteditable] h1 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.67em 0;
          color: #111827;
        }
        [contenteditable] h2 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 0.75em 0;
          color: #111827;
        }
        [contenteditable] h3 {
          font-size: 1.125em;
          font-weight: 600;
          margin: 0.83em 0;
          color: #111827;
        }
        [contenteditable] p {
          margin: 0.75em 0;
          line-height: 1.6;
          color: #374151;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.75em 0;
          padding-left: 1.5em;
        }
        [contenteditable] li {
          margin: 0.25em 0;
        }
        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }
        [contenteditable]:focus {
          outline: none;
        }
        [contenteditable] strong {
          font-weight: 600;
        }
        [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </div>
  );
}