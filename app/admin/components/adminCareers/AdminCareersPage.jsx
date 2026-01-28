import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Briefcase, MapPin, Clock, DollarSign, Users, Mail, Eye, Download, CheckCircle, FileText } from 'lucide-react';

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState('positions');
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    is_active: 1
  });

  // const CAREERS_API = "http://localhost/gr8/api/careers";
  const CAREERS_API = "https://api.gr8.com.np/gr8/api/careers";
  // const APPLICATIONS_API = "http://localhost/gr8/api/applications";
  const APPLICATIONS_API = "https://api.gr8.com.np/gr8/api/applications";

  useEffect(() => {
    fetchCareers();
    fetchApplications();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch(`${CAREERS_API}/get_careers.php?all=1`);
      const data = await response.json();
      if (data.success) {
        setCareers(data.careers);
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${APPLICATIONS_API}/get_applications.php`);
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('salary', formData.salary);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('is_active', formData.is_active);
      
      const reqArray = formData.requirements.split('\n').filter(r => r.trim());
      const respArray = formData.responsibilities.split('\n').filter(r => r.trim());
      formDataToSend.append('requirements', JSON.stringify(reqArray));
      formDataToSend.append('responsibilities', JSON.stringify(respArray));

      const endpoint = editMode ? 'update_career.php' : 'add_career.php';
      const response = await fetch(`${CAREERS_API}/${endpoint}`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        fetchCareers();
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

  const handleEdit = (career) => {
    setFormData({
      id: career.id,
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      salary: career.salary || '',
      description: career.description,
      requirements: Array.isArray(career.requirements) ? career.requirements.join('\n') : '',
      responsibilities: Array.isArray(career.responsibilities) ? career.responsibilities.join('\n') : '',
      is_active: career.is_active
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteCareer = async (id) => {
    if (!confirm('Are you sure you want to delete this position?')) return;
    try {
      const response = await fetch(`${CAREERS_API}/delete_career.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Position deleted!' });
        fetchCareers();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting position' });
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const response = await fetch(`${APPLICATIONS_API}/delete_application.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Application deleted!' });
        fetchApplications();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting application' });
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`${APPLICATIONS_API}/mark_read.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (data.success) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch(`${APPLICATIONS_API}/mark_read.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mark_all: true })
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'All marked as read!' });
        fetchApplications();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error marking as read' });
    }
  };

  const resetForm = () => {
    setFormData({
      id: '', title: '', department: '', location: '', type: 'Full-time',
      salary: '', description: '', requirements: '', responsibilities: '', is_active: 1
    });
    setEditMode(false);
    setMessage({ type: '', text: '' });
  };

  const filteredCareers = careers.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.job_title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = applications.filter(a => a.is_read == 0).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Careers Management</h1>
              <p className="text-gray-600 text-sm mt-1">Manage positions and applications</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'positions'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Positions ({careers.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors relative ${
                activeTab === 'applications'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Applications ({applications.length})
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              <div className="flex-1">{message.text}</div>
              <button onClick={() => setMessage({ type: '', text: '' })}><X className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === 'positions' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-white border border-gray-300 rounded-lg py-2 pl-9 pr-4 text-sm"
                />
              </div>
              <button
                onClick={() => { resetForm(); setShowModal(true); }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> New Position
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                <div><p className="text-sm text-gray-600">Total</p><p className="text-2xl font-semibold">{careers.length}</p></div>
                <Briefcase className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                <div><p className="text-sm text-gray-600">Active</p><p className="text-2xl font-semibold">{careers.filter(c => c.is_active == 1).length}</p></div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                <div><p className="text-sm text-gray-600">Applications</p><p className="text-2xl font-semibold">{applications.length}</p></div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            {/* Positions Table */}
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCareers.map((career) => (
                    <tr key={career.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 text-sm">{career.title}</div>
                        <div className="text-xs text-gray-500">{career.salary || 'N/A'}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{career.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{career.location}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${career.is_active == 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {career.is_active == 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleEdit(career)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteCareer(career.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCareers.length === 0 && (
                <div className="text-center py-12 text-gray-400">No positions found</div>
              )}
            </div>
          </>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-white border border-gray-300 rounded-lg py-2 pl-9 pr-4 text-sm"
                />
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Mark All as Read
                </button>
              )}
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className={`hover:bg-gray-50 ${app.is_read == 0 ? 'bg-orange-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 text-sm">{app.name}</div>
                        {app.portfolio && <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">Portfolio</a>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{app.job_title || app.position_title || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700">{app.email}</div>
                        <div className="text-xs text-gray-500">{app.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${app.is_read == 0 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                          {app.is_read == 0 ? 'New' : 'Read'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => { setSelectedApplication(app); handleMarkAsRead(app.id); }} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        {app.resume_path && (
                          <a href={`http://localhost/gr8/${app.resume_path}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded inline-block" title="Download Resume">
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => handleDeleteApplication(app.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredApplications.length === 0 && (
                <div className="text-center py-12 text-gray-400">No applications yet</div>
              )}
            </div>
          </>
        )}

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Application Details</h2>
                <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selectedApplication.name}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedApplication.email}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedApplication.phone || 'N/A'}</p></div>
                  <div><p className="text-sm text-gray-500">Position</p><p className="font-medium">{selectedApplication.job_title || selectedApplication.position_title || 'N/A'}</p></div>
                  <div><p className="text-sm text-gray-500">Portfolio</p><p className="font-medium">{selectedApplication.portfolio ? <a href={selectedApplication.portfolio} target="_blank" className="text-blue-500 hover:underline">{selectedApplication.portfolio}</a> : 'N/A'}</p></div>
                  <div><p className="text-sm text-gray-500">Applied</p><p className="font-medium">{new Date(selectedApplication.created_at).toLocaleString()}</p></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Cover Letter</p>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-wrap">{selectedApplication.cover_letter || 'No cover letter provided'}</div>
                </div>
                {selectedApplication.resume_path && (
                  <a href={`http://localhost/gr8/${selectedApplication.resume_path}`} target="_blank" rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Position Form Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{editMode ? 'Edit Position' : 'New Position'}</h2>
                  <p className="text-sm text-gray-600">{editMode ? 'Update position details' : 'Fill in position details'}</p>
                </div>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Senior Developer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <input type="text" name="department" value={formData.department} onChange={handleInputChange} required className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Engineering" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Kathmandu, Nepal" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="NRP 50k - 70k" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Job description..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line) *</label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} required rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="5+ years experience&#10;React proficiency" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (one per line) *</label>
                    <textarea name="responsibilities" value={formData.responsibilities} onChange={handleInputChange} required rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Develop applications&#10;Code reviews" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="is_active" id="is_active" checked={formData.is_active == 1} onChange={handleInputChange} className="w-4 h-4" />
                    <label htmlFor="is_active" className="text-sm text-gray-700">Position is active</label>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <button onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50">
                  <Save className="w-4 h-4" />{loading ? 'Saving...' : editMode ? 'Update' : 'Add Position'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
