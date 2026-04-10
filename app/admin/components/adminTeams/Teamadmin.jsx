"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, X, Save, Upload, User,
  ChevronUp, ChevronDown, Eye, EyeOff, Search,
  Linkedin, Twitter, Github, Mail, AlertTriangle,
  CheckCircle, Loader2, Users, Crown, Shield,
} from "lucide-react";

// ─── API helpers ────────────────────────────────────────────────────────────
const API = {
  // base: "http://localhost/gr8/api/team",         
  base: "https://api.gr8.com.np/gr8/api/team",         
  get:    (params = "") => fetch(`${API.base}/getTeam.php${params}`).then(r => r.json()),
  create: (body)        => fetch(`${API.base}/createTeam.php`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(r => r.json()),
  update: (id, body)    => fetch(`${API.base}/updateTeam.php?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(r => r.json()),
  delete: (id)          => fetch(`${API.base}/deleteTeam.php?id=${id}`, { method: "DELETE" }).then(r => r.json()),
  upload: (file)        => {
    const fd = new FormData();
    fd.append("avatar", file);
    return fetch(`${API.base}/uploadAvatar.php`, { method: "POST", body: fd }).then(r => r.json());
  },
};

// ─── Constants ───────────────────────────────────────────────────────────────
const LEVELS = [
  { value: 0, label: "Founder / Leadership", color: "text-orange-400",  badge: "bg-orange-500",  icon: Crown },
  { value: 1, label: "Director / Head",      color: "text-blue-400",    badge: "bg-blue-500",    icon: Shield },
  { value: 2, label: "Team Member",          color: "text-emerald-400", badge: "bg-emerald-500", icon: Users },
];

const ICONS = [
  "User","Shield","Rocket","Code","Palette","PenTool","Megaphone",
  "Users","Target","Zap","HeartHandshake","Building","Scale","Anchor","Leaf",
];

const EMPTY_FORM = {
  name: "", role: "", bio: "", level: 2, department: "",
  avatar_url: "", icon: "User",
  social_linkedin: "", social_twitter: "", social_github: "", social_email: "",
  sort_order: 0, is_active: 1,
};

// ─── Toast component ─────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border text-sm font-medium transition-all duration-300 ${
      type === "success" ? "bg-emerald-900/90 border-emerald-500/50 text-emerald-100" : "bg-red-900/90 border-red-500/50 text-red-100"
    }`}>
      {type === "success" ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-white font-semibold">Confirm Action</h3>
        </div>
        <p className="text-slate-300 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 text-sm font-medium transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Member Form Modal ────────────────────────────────────────────────────────
function MemberFormModal({ member, onSave, onClose, loading }) {
  const [form, setForm]         = useState(member ? { ...member } : { ...EMPTY_FORM });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(member?.avatar_url || "");
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
    let finalForm = { ...form };
    if (avatarFile) {
      setUploading(true);
      const res = await API.upload(avatarFile);
      setUploading(false);
      if (res.url) finalForm.avatar_url = res.url;
    }
    onSave(finalForm);
  };

  const levelInfo = LEVELS.find(l => l.value === parseInt(form.level));

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-start justify-center z-40 p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-white font-bold text-lg">{member ? "Edit Team Member" : "Add Team Member"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-slate-600 overflow-hidden bg-slate-800 flex items-center justify-center shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-slate-500" />
              )}
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium transition-colors border border-slate-600">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading…" : "Upload Photo"}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
              <p className="text-slate-500 text-xs mt-1.5">JPG, PNG, WebP — max 5 MB</p>
              <div className="mt-2">
                <input
                  type="text"
                  value={form.avatar_url}
                  onChange={e => { set("avatar_url", e.target.value); setAvatarPreview(e.target.value); }}
                  placeholder="Or paste image URL"
                  className="w-64 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Name <span className="text-red-400">*</span></label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                placeholder="Full name" />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Role / Title <span className="text-red-400">*</span></label>
              <input value={form.role} onChange={e => set("role", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                placeholder="e.g. Senior Developer" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5">Bio</label>
            <textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
              placeholder="Short bio…" />
          </div>

          {/* Level, Department, Icon, Sort, Active */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Level</label>
              <select value={form.level} onChange={e => set("level", parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:border-orange-500 text-sm">
                {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Department</label>
              <input value={form.department} onChange={e => set("department", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                placeholder="e.g. Technology" />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Icon</label>
              <select value={form.icon} onChange={e => set("icon", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:border-orange-500 text-sm">
                {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => set("sort_order", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:border-orange-500 text-sm" />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-slate-400 text-xs font-medium mb-3">Social Links <span className="text-slate-600">(optional)</span></p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "social_linkedin", icon: Linkedin, ph: "LinkedIn URL" },
                { key: "social_twitter",  icon: Twitter,  ph: "Twitter URL" },
                { key: "social_github",   icon: Github,   ph: "GitHub URL" },
                { key: "social_email",    icon: Mail,     ph: "Email address" },
              ].map(({ key, icon: Icon, ph }) => (
                <div key={key} className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input value={form[key]} onChange={e => set(key, e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                    placeholder={ph} />
                </div>
              ))}
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => set("is_active", form.is_active ? 0 : 1)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.is_active ? "bg-orange-500" : "bg-slate-600"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.is_active ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-slate-300 text-sm">Active {form.is_active ? <span className="text-emerald-400 text-xs">(visible on site)</span> : <span className="text-slate-500 text-xs">(hidden)</span>}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || uploading || !form.name.trim() || !form.role.trim()}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center gap-2">
            {(loading || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            {member ? "Save Changes" : "Create Member"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Member Row ───────────────────────────────────────────────────────────────
function MemberRow({ member, onEdit, onDelete, onToggleActive, onMove }) {
  const level = LEVELS.find(l => l.value === member.level) || LEVELS[2];
  const LevelIcon = level.icon;
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-all group">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full border-2 border-slate-600 overflow-hidden bg-slate-700 shrink-0">
        {member.avatar_url ? (
          <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-6 h-6 text-slate-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-medium text-sm truncate">{member.name}</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${level.badge} text-white`}>
            <LevelIcon className="w-3 h-3" />{level.label}
          </span>
          {!member.is_active && <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-400">Hidden</span>}
        </div>
        <p className={`text-xs mt-0.5 ${level.color} truncate`}>{member.role}</p>
        {member.department && <p className="text-xs text-slate-500 truncate">{member.department}</p>}
      </div>

      {/* Sort controls */}
      <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onMove(member.id, "up")} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-500 hover:text-slate-200 transition-colors">
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onMove(member.id, "down")} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700 text-slate-500 hover:text-slate-200 transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onToggleActive(member)} title={member.is_active ? "Hide" : "Show"}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${member.is_active ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-slate-700 text-slate-500 hover:bg-slate-600"}`}>
          {member.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button onClick={() => onEdit(member)} className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(member)} className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function TeamAdmin() {
  const [members, setMembers]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [search, setSearch]         = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [editMember, setEditMember] = useState(null);   // null = closed, {} = new, {...} = edit
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast]           = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await API.get();
      if (Array.isArray(data)) setMembers(data);
      else showToast(data.error || "Failed to load", "error");
    } catch { showToast("Network error", "error"); }
    setLoading(false);
  }, []);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editMember?.id) {
        const res = await API.update(editMember.id, form);
        if (res.error) { showToast(res.error, "error"); setSaving(false); return; }
        showToast("Member updated!");
      } else {
        const res = await API.create(form);
        if (res.error) { showToast(res.error, "error"); setSaving(false); return; }
        showToast("Member created!");
      }
      setEditMember(null);
      loadMembers();
    } catch { showToast("Network error", "error"); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await API.delete(confirmDelete.id);
      if (res.error) { showToast(res.error, "error"); }
      else { showToast("Member deleted"); loadMembers(); }
    } catch { showToast("Network error", "error"); }
    setConfirmDelete(null);
  };

  const handleToggleActive = async (member) => {
    try {
      await API.update(member.id, { is_active: member.is_active ? 0 : 1 });
      loadMembers();
    } catch { showToast("Failed to update", "error"); }
  };

  const handleMove = async (id, dir) => {
    const idx = members.findIndex(m => m.id === id);
    if (idx === -1) return;
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= members.length) return;
    // Swap sort_order values
    const a = members[idx];
    const b = members[swapIdx];
    await Promise.all([
      API.update(a.id, { sort_order: b.sort_order }),
      API.update(b.id, { sort_order: a.sort_order }),
    ]);
    loadMembers();
  };

  // Filtered display
  const filtered = members.filter(m => {
    const matchSearch = !search || [m.name, m.role, m.department].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchLevel  = filterLevel === "all" || m.level === parseInt(filterLevel);
    return matchSearch && matchLevel;
  });

  // Group by level
  const grouped = LEVELS.map(l => ({
    ...l,
    members: filtered.filter(m => m.level === l.value),
  }));

  // Stats
  const stats = [
    { label: "Total Members", value: members.length,                  color: "text-white" },
    { label: "Founders",      value: members.filter(m=>m.level===0).length, color: "text-orange-400" },
    { label: "Directors",     value: members.filter(m=>m.level===1).length, color: "text-blue-400" },
    { label: "Team",          value: members.filter(m=>m.level===2).length, color: "text-emerald-400" },
    { label: "Active",        value: members.filter(m=>m.is_active).length, color: "text-slate-300" },
  ];

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">Team Admin</h1>
            <p className="text-slate-500 text-xs">Manage team members displayed on the About page</p>
          </div>
          <button onClick={() => setEditMember({})}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-orange-500/20">
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, department…"
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500" />
          </div>
          <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500">
            <option value="all">All Levels</option>
            {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        {/* Member List by Level */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No members found</p>
            {search && <p className="text-xs mt-1">Try clearing your search</p>}
          </div>
        ) : (
          grouped.map(group => group.members.length > 0 && (
            <div key={group.value}>
              <div className="flex items-center gap-3 mb-3">
                <group.icon className={`w-4 h-4 ${group.color}`} />
                <h2 className={`text-sm font-semibold ${group.color}`}>{group.label}</h2>
                <span className="text-slate-600 text-xs">{group.members.length} member{group.members.length !== 1 ? "s" : ""}</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="space-y-2">
                {group.members.map(m => (
                  <MemberRow key={m.id} member={m}
                    onEdit={setEditMember}
                    onDelete={setConfirmDelete}
                    onToggleActive={handleToggleActive}
                    onMove={handleMove}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {editMember !== null && (
        <MemberFormModal
          member={editMember?.id ? editMember : null}
          onSave={handleSave}
          onClose={() => setEditMember(null)}
          loading={saving}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          message={`Delete "${confirmDelete.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}