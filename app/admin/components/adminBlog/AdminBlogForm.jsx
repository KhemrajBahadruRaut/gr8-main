import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Bold, Italic, Underline, List, ListOrdered, Link2, Calendar, Clock, Tag, Image as ImageIcon, FileText, MoreVertical, AlertCircle, CheckCircle2 } from 'lucide-react';

// Toast
function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border min-w-70 max-w-sm
            transition-all duration-300 animate-toast-in
            ${t.type === 'success'
              ? 'bg-white border-green-200 text-gray-800'
              : 'bg-white border-red-200 text-gray-800'}`}
        >
          <div className={`mt-0.5 shrink-0 rounded-full p-1 ${t.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            {t.type === 'success'
              ? <CheckCircle2 className="w-4 h-4 text-green-600" />
              : <AlertCircle className="w-4 h-4 text-red-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight">
              {t.type === 'success' ? (t.editMode ? 'Post updated!' : 'Post published!') : 'Something went wrong'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{t.text}</p>
          </div>
          <button onClick={() => onDismiss(t.id)} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const VALIDATION_RULES = {
  title: { required: true, minLength: 3, maxLength: 150 },
  slug: { required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, patternMsg: 'Only lowercase letters, numbers, and hyphens' },
  description: { required: true, minLength: 10, maxLength: 300 },
  content: { required: true, minLength: 20 },
  tags: { required: true },
  date: { required: true },
  read_time: { required: true, pattern: /^\d+\s*(min|minute|minutes|hr|hour|hours)\s*(read)?$/i, patternMsg: 'e.g. "5 min read" or "2 hours"' },
};

function validateField(name, value) {
  const rule = VALIDATION_RULES[name];
  if (!rule) return null;
  if (rule.required && !value?.trim()) return 'This field is required';
  if (value && rule.minLength && value.trim().length < rule.minLength)
    return `Minimum ${rule.minLength} characters required`;
  if (value && rule.maxLength && value.trim().length > rule.maxLength)
    return `Maximum ${rule.maxLength} characters allowed`;
  if (value && rule.pattern && !rule.pattern.test(value.trim()))
    return rule.patternMsg || 'Invalid format';
  return null;
}

function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {error}
    </p>
  );
}

function FieldSuccess({ show }) {
  if (!show) return null;
  return <CheckCircle2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />;
}

function inputClass(error, touched, value) {
  const base = "w-full bg-white border rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 transition-colors pr-8";
  if (!touched) return `${base} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
  if (error) return `${base} border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50`;
  return `${base} border-green-400 focus:ring-green-400 focus:border-green-400`;
}

// Normalize tags from DB (handles JSON arrays or plain strings)
const normalizeTags = (raw) => {
  if (!raw) return '';
  
  // If it's already a string with commas, return as is
  if (typeof raw === 'string' && raw.includes(',')) {
    return raw;
  }
  
  // Try to parse JSON
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.join(', ');
    }
    // If parsed is a string, return it
    if (typeof parsed === 'string') {
      return parsed;
    }
  } catch(e) {
    // Not JSON, continue
  }
  
  // If it's a plain string without commas, return as is
  return raw;
};

export default function AdminBlogForm() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [toasts, setToasts] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const showToast = (type, text, editMode = false) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, text, editMode }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  const contentEditorRef = useRef(null);

  const [formData, setFormData] = useState({
    id: '', title: '', slug: '', description: '', content: '',
    imageFile: null, tags: '', date: new Date().toISOString().split('T')[0], read_time: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSizeWarning, setImageSizeWarning] = useState('');
  const [pendingEditorContent, setPendingEditorContent] = useState(null);

  // Auto-detect API URL by hostname
  const API_BASE_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost/gr8/api/blogs'
      : 'https://api.gr8.com.np/gr8/api/blogs';

  useEffect(() => { fetchBlogs(); }, []);

  // Poll until contenteditable ref is in DOM
  useEffect(() => {
    if (!showModal || pendingEditorContent === null) return;
    let tries = 0;
    const interval = setInterval(() => {
      if (contentEditorRef.current) {
        contentEditorRef.current.innerHTML = pendingEditorContent;
        setPendingEditorContent(null);
        clearInterval(interval);
      } else if (++tries > 30) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [showModal, pendingEditorContent]);

  useEffect(() => {
    const newErrors = {};
    Object.keys(VALIDATION_RULES).forEach(field => {
      const val = field === 'content' ? stripHtml(formData.content) : formData[field];
      const err = validateField(field, val);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
  }, [formData]);

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/get_blog.php`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs.filter(Boolean).map(blog => ({
          id: blog.id || '',
          title: blog.title || 'Untitled',
          slug: blog.slug || '',
          description: blog.description || '',
          content: blog.content || '',
          image: blog.image || '',
          tags: normalizeTags(blog.tags),
          date: blog.date || '',
          read_time: blog.read_time || ''
        })));
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !editMode ? { slug: generateSlug(value) } : {})
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'title' && !editMode) setTouched(prev => ({ ...prev, slug: true }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
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
      const html = contentEditorRef.current.innerHTML;
      setFormData(prev => ({ ...prev, content: html }));
      setTouched(prev => ({ ...prev, content: true }));
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) applyFormatting('createLink', url);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSizeWarning('');
    setImagePreview(null);
    if (!file) { setFormData(prev => ({ ...prev, imageFile: null })); return; }

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setImageSizeWarning(`Image is ${sizeMB} MB — exceeds the ${MAX_IMAGE_SIZE_MB} MB limit. Please choose a smaller file.`);
    }

    setFormData(prev => ({ ...prev, imageFile: file }));
    setTouched(prev => ({ ...prev, imageFile: true }));
  };

  const isFormValid = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const imageRequired = !editMode && !formData.imageFile;
    const imageTooLarge = formData.imageFile && formData.imageFile.size > MAX_IMAGE_SIZE_BYTES;
    return !hasErrors && !imageRequired && !imageTooLarge;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const allTouched = Object.keys(VALIDATION_RULES).reduce((acc, k) => ({ ...acc, [k]: true }), { imageFile: true });
    setTouched(allTouched);

    if (!isFormValid()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const fd = new FormData();
      ['id', 'title', 'slug', 'description', 'content', 'tags', 'date', 'read_time'].forEach(k => fd.append(k, formData[k]));
      if (formData.imageFile) fd.append('image_file', formData.imageFile);

      const endpoint = editMode ? 'update_blog.php' : 'add_blog.php';
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, { method: 'POST', body: fd });
      const data = await response.json();

      if (data.success) {
        showToast('success', data.message, editMode);
        fetchBlogs();
        setTimeout(() => { setShowModal(false); resetForm(); }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    // Reset any previous pending content
    setPendingEditorContent(null);
    
    // Normalize tags before setting form data
    const normalizedTags = normalizeTags(blog.tags);
    
    setFormData({
      id: blog.id || '',
      title: blog.title || '',
      slug: blog.slug || '',
      description: blog.description || '',
      content: blog.content || '',
      imageFile: null,
      tags: normalizedTags,
      date: blog.date ? formatDateForInput(blog.date) : new Date().toISOString().split('T')[0],
      read_time: blog.read_time || ''
    });
    
    setEditMode(true);
    setShowModal(true);
    setTouched({});
    setSubmitAttempted(false);
    setImagePreview(blog.image || null);
    setImageSizeWarning('');
    
    // Set the content after a short delay to ensure DOM is ready
    setTimeout(() => {
      setPendingEditorContent(blog.content || '');
    }, 100);
  };

  const formatDateForInput = (dateStr) => {
    try {
      if (!dateStr) return new Date().toISOString().split('T')[0];
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date.toISOString().split('T')[0];
      const months = { Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12' };
      const parts = dateStr.replace(/\d+(st|nd|rd|th)/, '').trim().split(' ');
      const dayMatch = dateStr.match(/\d+/);
      const day = dayMatch ? dayMatch[0].padStart(2, '0') : '01';
      const month = months[parts[0]?.replace(',', '')] || '01';
      const year = parts[1]?.replace(',', '') || new Date().getFullYear().toString();
      return `${year}-${month}-${day}`;
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };

  const handleDelete = async (id) => {
    if (!id || !confirm('Are you sure you want to delete this blog?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/delete_blog.php`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        showToast('success', 'Blog deleted successfully!');
        fetchBlogs();
      }
    } catch {
      setMessage({ type: 'error', text: 'Error deleting blog' });
    }
  };

  const resetForm = () => {
    setFormData({ 
      id: '', title: '', slug: '', description: '', content: '', 
      imageFile: null, tags: '', date: new Date().toISOString().split('T')[0], read_time: '' 
    });
    setEditMode(false);
    setTouched({});
    setErrors({});
    setSubmitAttempted(false);
    setMessage({ type: '', text: '' });
    setImagePreview(null);
    setImageSizeWarning('');
    setPendingEditorContent(null);
    if (contentEditorRef.current) contentEditorRef.current.innerHTML = '';
  };

  const filteredBlogs = blogs.filter(blog => {
    if (!blog) return false;
    const search = searchTerm.toLowerCase();
    return (blog.title || '').toLowerCase().includes(search) || (blog.tags || '').toLowerCase().includes(search);
  });

  const showError = (field) => (touched[field] || submitAttempted) && errors[field];
  const showSuccess = (field) => (touched[field] || submitAttempted) && !errors[field] && (formData[field] || '').trim();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
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
                onClick={() => { resetForm(); setShowModal(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
          </div>
        </div>

        {/* Page-level error */}
        {message.text && message.type === 'error' && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center">
              <div className="flex-1">{message.text}</div>
              <button onClick={() => setMessage({ type: '', text: '' })}><X className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Posts', value: blogs.length, icon: <FileText className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'This Month', value: 0, icon: <Calendar className="w-5 h-5 text-green-600" />, bg: 'bg-green-50' },
            { label: 'Drafts', value: 0, icon: <FileText className="w-5 h-5 text-yellow-600" />, bg: 'bg-yellow-50' },
            { label: 'Published', value: blogs.length, icon: <FileText className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
                <div className={`p-2 ${item.bg} rounded-lg`}>{item.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading blogs...</p>
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No blog posts found</div>
            <p className="text-gray-500 text-sm mb-4">Get started by creating your first blog post</p>
            <button onClick={() => { resetForm(); setShowModal(true); }} className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 justify-center">
              <Plus className="w-4 h-4" /> Create New Post
            </button>
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Post', 'Status', 'Tags', 'Date', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => {
                    if (!blog) return null;
                    const b = { id: blog.id || '', title: blog.title || 'Untitled', image: blog.image || '', read_time: blog.read_time || '', tags: blog.tags || '', date: blog.date || '' };
                    return (
                      <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {b.image ? (
                              <img src={b.image} alt={b.title} className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900 text-sm line-clamp-1">{b.title}</div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />{b.read_time || 'No time specified'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-50">
                            {b.tags ? (
                              <>
                                {b.tags.split(',').slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">{tag.trim()}</span>
                                ))}
                                {b.tags.split(',').length > 2 && (
                                  <span className="px-2 py-1 text-gray-500 text-xs">+{b.tags.split(',').length - 2}</span>
                                )}
                              </>
                            ) : <span className="px-2 py-1 text-gray-400 text-xs italic">No tags</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{b.date || 'No date'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleEdit(blog)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(b.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
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

        {!loading && blogs.length > 0 && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No matching blog posts found</div>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search terms</p>
            <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">Clear search</button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{editMode ? 'Edit Blog Post' : 'New Blog Post'}</h2>
                  <p className="text-sm text-gray-600 mt-0.5">{editMode ? 'Update your blog post details' : 'Fill in the details for your new blog post'}</p>
                </div>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Validation summary */}
              {submitAttempted && Object.keys(errors).length > 0 && (
                <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700">Please fix the errors below before submitting</p>
                    <p className="text-xs text-red-600 mt-0.5">{Object.keys(errors).length} field{Object.keys(errors).length > 1 ? 's need' : ' needs'} attention</p>
                  </div>
                </div>
              )}

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  {/* Title and Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type="text" name="title" value={formData.title}
                          onChange={handleInputChange} onBlur={handleBlur}
                          className={inputClass(showError('title'), touched.title, formData.title)}
                          placeholder="Enter blog title"
                        />
                        <FieldSuccess show={showSuccess('title')} />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <FieldError error={showError('title') ? errors.title : null} />
                        <span className={`text-xs ml-auto ${formData.title.length > 150 ? 'text-red-500' : 'text-gray-400'}`}>
                          {formData.title.length}/150
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type="text" name="slug" value={formData.slug}
                          onChange={handleInputChange} onBlur={handleBlur}
                          className={inputClass(showError('slug'), touched.slug, formData.slug)}
                          placeholder="blog-url-slug"
                        />
                        <FieldSuccess show={showSuccess('slug')} />
                      </div>
                      <FieldError error={showError('slug') ? errors.slug : null} />
                      {!showError('slug') && <p className="text-xs text-gray-400 mt-1">Lowercase letters, numbers, and hyphens only</p>}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <textarea
                        name="description" value={formData.description}
                        onChange={handleInputChange} onBlur={handleBlur}
                        rows={2}
                        className={`${inputClass(showError('description'), touched.description, formData.description)} resize-none pr-3`}
                        placeholder="Brief description for the blog card"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <FieldError error={showError('description') ? errors.description : null} />
                      <span className={`text-xs ml-auto ${formData.description.length > 300 ? 'text-red-500' : 'text-gray-400'}`}>
                        {formData.description.length}/300
                      </span>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium text-gray-700">Content <span className="text-red-500">*</span></label>
                      <div className="text-xs text-gray-500">Rich Text Editor</div>
                    </div>
                    <div className={`rounded-lg border ${(touched.content || submitAttempted) && errors.content ? 'border-red-400' : (touched.content && !errors.content) ? 'border-green-400' : 'border-gray-300'}`}>
                      {/* Toolbar */}
                      <div className="bg-gray-50 border-b border-inherit rounded-t-lg px-2 py-1.5 flex flex-wrap gap-1">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map(l => (
                            <button key={l} type="button" onClick={() => applyHeading(l)}
                              className="px-2 py-1 hover:bg-gray-200 rounded text-gray-700 text-xs font-semibold transition-colors">H{l}</button>
                          ))}
                        </div>
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => applyFormatting('bold')} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => applyFormatting('italic')} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => applyFormatting('underline')} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => applyFormatting('insertUnorderedList')} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bullet List"><List className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => applyFormatting('insertOrderedList')} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button type="button" onClick={insertLink} className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Insert Link"><Link2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <div
                        ref={contentEditorRef}
                        contentEditable
                        onInput={handleContentChange}
                        onPaste={handlePaste}
                        className="w-full min-h-30 bg-white rounded-b-lg px-3 py-3 text-gray-900 text-sm focus:outline-none overflow-y-auto"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    <FieldError error={(touched.content || submitAttempted) && errors.content ? errors.content : null} />
                    {!((touched.content || submitAttempted) && errors.content) && (
                      <p className="text-xs text-gray-500 mt-1.5">Select text and use the toolbar to format.</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Featured Image {!editMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                      <label
                        htmlFor="image-upload"
                        className={`flex items-center gap-2 p-3 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                          imageSizeWarning ? 'border-red-400 bg-red-50' :
                          (touched.imageFile || submitAttempted) && !editMode && !formData.imageFile ? 'border-red-400 bg-red-50' :
                          formData.imageFile && !imageSizeWarning ? 'border-green-400 bg-green-50' :
                          'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${imageSizeWarning ? 'bg-red-100' : 'bg-blue-50'}`}>
                          <ImageIcon className={`w-5 h-5 ${imageSizeWarning ? 'text-red-500' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {formData.imageFile ? formData.imageFile.name : 'Click to upload image'}
                          </div>
                          <div className="text-xs text-gray-500">PNG, JPG, GIF up to {MAX_IMAGE_SIZE_MB}MB</div>
                        </div>
                        <div className="text-blue-600 text-sm font-medium">Browse</div>
                      </label>
                    </div>

                    {(imagePreview || imageSizeWarning) && (
                      <div className="mt-3 space-y-2">
                        {imagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className={`h-32 w-auto rounded-lg object-cover border-2 ${imageSizeWarning ? 'border-red-400' : 'border-green-400'}`}
                            />
                            {imageSizeWarning && (
                              <div className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5">
                                <AlertCircle className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </div>
                        )}
                        {imageSizeWarning && (
                          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-700">Image too large</p>
                              <p className="text-xs text-red-600 mt-0.5">{imageSizeWarning}</p>
                              <label htmlFor="image-upload" className="inline-block mt-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer underline">
                                Choose a different image
                              </label>
                            </div>
                          </div>
                        )}
                        {!imageSizeWarning && formData.imageFile && (
                          <p className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Image looks good ({(formData.imageFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    )}

                    {(touched.imageFile || submitAttempted) && !editMode && !formData.imageFile && (
                      <FieldError error="Please upload a featured image" />
                    )}
                    {editMode && !formData.imageFile && (
                      <p className="text-xs text-gray-500 mt-1.5">Leave empty to keep current image</p>
                    )}
                  </div>

                  {/* Tags, Date, Read Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Tag className="inline w-3.5 h-3.5 mr-1" />Tags <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text" name="tags" value={formData.tags}
                          onChange={handleInputChange} onBlur={handleBlur}
                          className={inputClass(showError('tags'), touched.tags, formData.tags)}
                          placeholder="Digital Growth, Featured"
                        />
                        <FieldSuccess show={showSuccess('tags')} />
                      </div>
                      <FieldError error={showError('tags') ? errors.tags : null} />
                      {!showError('tags') && <p className="text-xs text-gray-400 mt-1">Comma-separated</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Calendar className="inline w-3.5 h-3.5 mr-1" />Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date" name="date" value={formData.date}
                          onChange={handleInputChange} onBlur={handleBlur}
                          className={inputClass(showError('date'), touched.date, formData.date)}
                        />
                      </div>
                      <FieldError error={showError('date') ? errors.date : null} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Clock className="inline w-3.5 h-3.5 mr-1" />Read Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text" name="read_time" value={formData.read_time}
                          onChange={handleInputChange} onBlur={handleBlur}
                          className={inputClass(showError('read_time'), touched.read_time, formData.read_time)}
                          placeholder="5 min read"
                        />
                        <FieldSuccess show={showSuccess('read_time')} />
                      </div>
                      <FieldError error={showError('read_time') ? errors.read_time : null} />
                      {!showError('read_time') && <p className="text-xs text-gray-400 mt-1">e.g. "5 min read"</p>}
                    </div>
                  </div>

                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3">
                <div className="text-xs text-gray-500">
                  {isFormValid()
                    ? <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5" />All fields valid</span>
                    : submitAttempted
                      ? <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-3.5 h-3.5" />{Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''} remaining</span>
                      : <span className="text-gray-400">Fill all required fields</span>
                  }
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors text-white ${
                      loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : editMode ? 'Update Post' : 'Publish Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        [contenteditable] h1 { font-size:1.5em; font-weight:600; margin:.67em 0; color:#111827; }
        [contenteditable] h2 { font-size:1.25em; font-weight:600; margin:.75em 0; color:#111827; }
        [contenteditable] h3 { font-size:1.125em; font-weight:600; margin:.83em 0; color:#111827; }
        [contenteditable] p { margin:.75em 0; line-height:1.6; color:#374151; }
        [contenteditable] ul, [contenteditable] ol { margin:.75em 0; padding-left:1.5em; }
        [contenteditable] li { margin:.25em 0; }
        [contenteditable] a { color:#2563eb; text-decoration:underline; }
        [contenteditable]:focus { outline:none; }
        [contenteditable] strong { font-weight:600; }
        [contenteditable] em { font-style:italic; }
        [contenteditable] u { text-decoration:underline; }
        .line-clamp-1 { overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; }
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(calc(100% + 1rem)); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-toast-in { animation: toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}