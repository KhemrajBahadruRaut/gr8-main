"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { getGr8ApiBase, resolveGr8AssetUrl } from "@/lib/gr8-api";
import { normalizeWorksContent } from "@/lib/works-content";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${getGr8ApiBase()}/works/${endpoint}`, {
    cache: "no-store",
    credentials: "include",
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "The Our Works content could not be updated.");
  }
  return data;
}

async function clientsRequest(endpoint) {
  const response = await fetch(`${getGr8ApiBase()}/clients/${endpoint}`, {
    cache: "no-store",
    credentials: "include",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "The client list could not be loaded.");
  }
  return data;
}

function publishWorksChanged() {
  const updatedAt = String(Date.now());
  localStorage.setItem("gr8_works_updated", updatedAt);
  window.dispatchEvent(new Event("gr8:works-updated"));
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel("gr8_works");
    channel.postMessage({ updatedAt });
    channel.close();
  }
}

function Field({ label, value, onChange, textarea = false, type = "text", placeholder = "" }) {
  const shared =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100";
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${shared} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </label>
  );
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function RowActions({ index, count, onMove, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onMove(index, -1)}
        disabled={index === 0}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-25"
        aria-label="Move up"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onMove(index, 1)}
        disabled={index === count - 1}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-25"
        aria-label="Move down"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
        aria-label="Delete row"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function UploadField({ label, value, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await onUpload(file);
      onChange(url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Image URL (optional)"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="hidden sm:inline">Upload</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={upload}
          disabled={uploading}
          tabIndex={-1}
          className="hidden"
        />
      </div>
      {value && (
        <div className="mt-2 flex h-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-900 p-2">
          <img src={resolveGr8AssetUrl(value)} alt="Uploaded preview" className="max-h-full max-w-full object-contain" />
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function MultiUploadField({ label, values, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const upload = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selectedFiles.length) return;

    setUploading(true);
    setError("");
    const uploadedUrls = [];
    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        setProgress(`${index + 1} of ${selectedFiles.length}`);
        uploadedUrls.push(await onUpload(selectedFiles[index]));
      }
      onChange([...values, ...uploadedUrls]);
    } catch (uploadError) {
      if (uploadedUrls.length) onChange([...values, ...uploadedUrls]);
      setError(uploadError.message);
    } finally {
      setUploading(false);
      setProgress("");
    }
  };

  const moveImage = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= values.length) return;
    const reordered = [...values];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    onChange(reordered);
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          {label}
        </span>
        <span className="text-xs text-slate-500">{values.length} images</span>
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm font-semibold text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? `Uploading ${progress}` : "Upload work images"}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={upload}
        disabled={uploading}
        tabIndex={-1}
        className="hidden"
      />
      {values.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {values.map((url, imageIndex) => (
            <div key={`${url}-${imageIndex}`} className="group relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-900 p-1.5">
              <img src={resolveGr8AssetUrl(url)} alt={`Work preview ${imageIndex + 1}`} className="max-h-full max-w-full object-contain" />
              <span className="absolute top-1.5 left-1.5 rounded-full bg-slate-950/85 px-2 py-1 text-[10px] font-bold text-white shadow">
                {imageIndex + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(values.filter((_, index) => index !== imageIndex))}
                className="absolute top-1.5 right-1.5 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700"
                aria-label={`Remove work image ${imageIndex + 1}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 overflow-hidden rounded-lg border border-white/20 bg-slate-950/85 text-white shadow">
                <button
                  type="button"
                  onClick={() => moveImage(imageIndex, -1)}
                  disabled={imageIndex === 0}
                  className="p-1.5 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move work image ${imageIndex + 1} earlier`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(imageIndex, 1)}
                  disabled={imageIndex === values.length - 1}
                  className="border-l border-white/15 p-1.5 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Move work image ${imageIndex + 1} later`}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ClientEditor({
  client,
  index,
  count,
  setField,
  availableClients,
  onSelect,
  onMove,
  onDelete,
  onUpload,
  allowHighlight,
  showWorkImage = false,
  collapsible = false,
  expanded = true,
  onToggle,
}) {
  return (
    <div className={`rounded-2xl border bg-slate-50/70 p-4 transition-[border-color,box-shadow] duration-300 ${expanded && collapsible ? "border-emerald-300 shadow-md shadow-emerald-100/60" : "border-slate-200"}`}>
      <div className={`flex items-center justify-between gap-3 transition-[margin] duration-300 ${expanded ? "mb-4" : "mb-0"}`}>
        <button
          type="button"
          onClick={collapsible ? onToggle : undefined}
          disabled={!collapsible}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl text-left outline-none focus-visible:ring-3 focus-visible:ring-emerald-100 disabled:cursor-default"
          aria-expanded={collapsible ? expanded : undefined}
        >
          {collapsible ? (
            <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-900 p-1.5">
              {client.logo_url ? (
                <img src={resolveGr8AssetUrl(client.logo_url)} alt="" className="max-h-full max-w-full object-contain" />
              ) : (
                <ImageIcon className="h-4 w-4 text-slate-400" />
              )}
            </div>
          ) : (
            <ImageIcon className="h-4 w-4 shrink-0 text-emerald-600" />
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-slate-800">
              {collapsible ? client.name || `Client ${index + 1}` : `Client ${index + 1}`}
            </span>
            {collapsible && (
              <span className="mt-0.5 block text-xs font-normal text-slate-500">
                {client.work_image_urls.length} {client.work_image_urls.length === 1 ? "project" : "projects"}
              </span>
            )}
          </span>
          {collapsible && (
            <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          )}
        </button>
        <RowActions index={index} count={count} onMove={onMove} onDelete={onDelete} />
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="editor-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 border-t border-slate-200 pt-4 md:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Client
          </span>
          <select
            value={client.client_id || ""}
            onChange={(event) => onSelect(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
          >
            <option value="" disabled>
              {availableClients.length ? "Select a client" : "No clients available"}
            </option>
            {availableClients.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}{option.is_active ? "" : " (hidden)"}
              </option>
            ))}
          </select>
          {!client.client_id && client.name && (
            <span className="mt-1.5 block text-xs text-amber-700">
              Current unlinked entry: {client.name}. Select a client to synchronize it.
            </span>
          )}
        </label>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Synced client logo
          </span>
          <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-3">
            {client.logo_url ? (
              <img src={resolveGr8AssetUrl(client.logo_url)} alt={client.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-xs text-slate-400">Select a client to use its logo</span>
            )}
          </div>
        </div>
        {showWorkImage && (
          <div className="md:col-span-2">
            <MultiUploadField
              label="Completed work images"
              values={client.work_image_urls}
              onChange={(value) => setField("work_image_urls", value)}
              onUpload={onUpload}
            />
          </div>
        )}
            </div>
            {allowHighlight && (
              <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(client.highlighted)}
                  onChange={(event) => setField("highlighted", event.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
                Show highlighted border
              </label>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusMessage({ notice, onClose }) {
  if (!notice) return null;
  const error = notice.type === "error";
  return (
    <div
      className={`fixed right-4 bottom-24 z-60 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl sm:right-5 ${
        error
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
      role="status"
    >
      {error ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
      <span>{notice.text}</span>
      <button onClick={onClose} className="ml-auto rounded p-1 hover:bg-black/5" aria-label="Close">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function WorksAdmin() {
  const [content, setContent] = useState(null);
  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [expandedDigitalClient, setExpandedDigitalClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const loadRetryRef = useRef(null);

  const loadContent = async () => {
    if (loadRetryRef.current) window.clearTimeout(loadRetryRef.current);
    setLoading(true);
    setExpandedDigitalClient(null);
    const [worksResult, clientsResult] = await Promise.allSettled([
      apiRequest(`get_works.php?_=${Date.now()}`),
      clientsRequest(`get_clients.php?_=${Date.now()}`),
    ]);

    if (worksResult.status === "fulfilled") {
      const loadedContent = normalizeWorksContent(worksResult.value.content);
      setContent(loadedContent);
      setSavedSnapshot(JSON.stringify(loadedContent));
    } else {
      setNotice({ type: "error", text: worksResult.reason.message });
      setContent(null);
      setSavedSnapshot("");
      loadRetryRef.current = window.setTimeout(() => void loadContent(), 4000);
    }

    if (clientsResult.status === "fulfilled" && Array.isArray(clientsResult.value.clients)) {
      setClients(clientsResult.value.clients);
    } else if (clientsResult.status === "rejected") {
      setNotice({ type: "error", text: clientsResult.reason.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadContent();
    return () => {
      if (loadRetryRef.current) window.clearTimeout(loadRetryRef.current);
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const updateSection = (section, field, value) => {
    setContent((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }));
  };

  const updateRow = (section, list, index, field, value) => {
    const next = [...content[section][list]];
    next[index] = { ...next[index], [field]: value };
    updateSection(section, list, next);
  };

  const addRow = (section, list, row) => {
    updateSection(section, list, [...content[section][list], row]);
  };

  const deleteRow = (section, list, index) => {
    updateSection(
      section,
      list,
      content[section][list].filter((_, rowIndex) => rowIndex !== index),
    );
  };

  const moveRow = (section, list, index, direction) => {
    const target = index + direction;
    const next = [...content[section][list]];
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateSection(section, list, next);
  };

  const addDigitalClient = () => {
    const nextIndex = content.digital_marketing.clients.length;
    addRow("digital_marketing", "clients", {
      client_id: null,
      name: "",
      logo_kind: "reliable",
      logo_url: "",
      project_url: "",
      work_image_url: "",
      work_image_urls: [],
    });
    setExpandedDigitalClient(nextIndex);
  };

  const deleteDigitalClient = (index) => {
    deleteRow("digital_marketing", "clients", index);
    setExpandedDigitalClient((current) => {
      if (current === null) return null;
      if (current === index) return null;
      return current > index ? current - 1 : current;
    });
  };

  const moveDigitalClient = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= content.digital_marketing.clients.length) return;
    moveRow("digital_marketing", "clients", index, direction);
    setExpandedDigitalClient((current) => {
      if (current === index) return target;
      if (current === target) return index;
      return current;
    });
  };

  const selectClient = (section, list, index, clientId) => {
    const selected = clients.find((client) => Number(client.id) === clientId);
    if (!selected) return;
    const next = [...content[section][list]];
    next[index] = {
      ...next[index],
      client_id: Number(selected.id),
      name: selected.name,
      logo_url: selected.logo_url,
    };
    updateSection(section, list, next);
  };

  const uploadAsset = async (file) => {
    const body = new FormData();
    body.append("image", file);
    const data = await apiRequest("upload_asset.php", { method: "POST", body });
    return data.path || data.url;
  };

  const save = async () => {
    if (!content || !savedSnapshot || JSON.stringify(content) === savedSnapshot || saving) return;
    setSaving(true);
    try {
      const data = await apiRequest("save_works.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const savedContent = normalizeWorksContent(data.content);
      setContent(savedContent);
      setSavedSnapshot(JSON.stringify(savedContent));
      publishWorksChanged();
      setNotice({
        type: data.asset_cleanup_failed > 0 ? "error" : "success",
        text: data.message || "Our Works content saved.",
      });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = Boolean(
    content && savedSnapshot && JSON.stringify(content) !== savedSnapshot,
  );

  if (loading || !content) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const tabs = [
    ["home", "Overview"],
    ["digital", "Digital Marketing"],
    ["web", "Web Development"],
    ["virtual", "Virtual Assistance"],
  ];

  return (
    <div className="mx-auto max-w-6xl pb-28">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Our Works content</h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit page copy, client cards, projects, services, links, and images without changing the frontend layout.
          </p>
        </div>
        <button
          type="button"
          onClick={loadContent}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" />
          Reload
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === id
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "home" && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Page heading"
              description="The heading shown above the three service panels."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" value={content.home.eyebrow} onChange={(value) => updateSection("home", "eyebrow", value)} />
              <Field label="Title" value={content.home.title} onChange={(value) => updateSection("home", "title", value)} />
              <div className="md:col-span-2">
                <Field textarea label="Description" value={content.home.description} onChange={(value) => updateSection("home", "description", value)} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Service panels"
              description="The three panel destinations stay fixed so their current interactions and design remain intact."
            />
            <div className="space-y-4">
              {content.home.panels.map((panel, index) => (
                <div key={panel.route} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 text-sm font-bold capitalize text-slate-800">
                    {panel.route.replaceAll("-", " ")}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Number" value={panel.tag} onChange={(value) => updateRow("home", "panels", index, "tag", value)} />
                    <Field label="Title" value={panel.title} onChange={(value) => updateRow("home", "panels", index, "title", value)} />
                    <div className="md:col-span-2">
                      <Field textarea label="Description" value={panel.description} onChange={(value) => updateRow("home", "panels", index, "description", value)} />
                    </div>
                    <Field label="Accent colour" type="color" value={panel.accent} onChange={(value) => updateRow("home", "panels", index, "accent", value)} />
                    <div className="md:col-span-2">
                      <UploadField
                        label="Panel background image"
                        value={panel.image_url}
                        onChange={(value) => updateRow("home", "panels", index, "image_url", value)}
                        onUpload={uploadAsset}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "digital" && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Digital marketing header" description="Page title and introductory copy." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={content.digital_marketing.title} onChange={(value) => updateSection("digital_marketing", "title", value)} />
              <Field textarea label="Subtitle" value={content.digital_marketing.subtitle} onChange={(value) => updateSection("digital_marketing", "subtitle", value)} />
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Digital marketing clients"
              description="Click a client to open its projects. Only one client editor stays open at a time."
              action={
                <button type="button" onClick={addDigitalClient} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Add client
                </button>
              }
            />
            <div className="space-y-4">
              {content.digital_marketing.clients.map((client, index) => (
                <ClientEditor
                  key={index}
                  client={client}
                  index={index}
                  count={content.digital_marketing.clients.length}
                  setField={(field, value) => updateRow("digital_marketing", "clients", index, field, value)}
                  availableClients={clients}
                  onSelect={(clientId) => selectClient("digital_marketing", "clients", index, clientId)}
                  onMove={moveDigitalClient}
                  onDelete={deleteDigitalClient}
                  onUpload={uploadAsset}
                  showWorkImage
                  collapsible
                  expanded={expandedDigitalClient === index}
                  onToggle={() => setExpandedDigitalClient((current) => current === index ? null : index)}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "web" && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Web development header" description="Page title and introductory copy." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={content.web_development.title} onChange={(value) => updateSection("web_development", "title", value)} />
              <Field textarea label="Subtitle" value={content.web_development.subtitle} onChange={(value) => updateSection("web_development", "subtitle", value)} />
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Web projects"
              description="The first project is featured. Uploaded previews override the built-in artwork."
              action={
                <button type="button" onClick={() => addRow("web_development", "projects", { name: "", description: "", services: "", stack: "", visual_kind: "photography", image_url: "", website_url: "" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Add project
                </button>
              }
            />
            <div className="space-y-4">
              {content.web_development.projects.map((project, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-bold text-slate-800">Project {index + 1}{index === 0 ? " · Featured" : ""}</div>
                    <RowActions index={index} count={content.web_development.projects.length} onMove={(row, direction) => moveRow("web_development", "projects", row, direction)} onDelete={(row) => deleteRow("web_development", "projects", row)} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Project name" value={project.name} onChange={(value) => updateRow("web_development", "projects", index, "name", value)} />
                    <div className="md:col-span-2">
                      <Field textarea label="Description" value={project.description} onChange={(value) => updateRow("web_development", "projects", index, "description", value)} />
                    </div>
                    <Field label="Services" value={project.services} onChange={(value) => updateRow("web_development", "projects", index, "services", value)} />
                    <Field label="Tech stack" value={project.stack} onChange={(value) => updateRow("web_development", "projects", index, "stack", value)} />
                    <UploadField
                      label="Project preview"
                      value={project.image_url}
                      onChange={(value) => updateRow("web_development", "projects", index, "image_url", value)}
                      onUpload={uploadAsset}
                    />
                    <Field label="Website URL" value={project.website_url} onChange={(value) => updateRow("web_development", "projects", index, "website_url", value)} placeholder="https://..." />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "virtual" && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Virtual assistance header" description="Page title and introductory copy." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={content.virtual_assistance.title} onChange={(value) => updateSection("virtual_assistance", "title", value)} />
              <Field textarea label="Subtitle" value={content.virtual_assistance.subtitle} onChange={(value) => updateSection("virtual_assistance", "subtitle", value)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Virtual assistance clients"
              description="Select clients already managed in the Clients section. Their names and logos stay synchronized."
              action={
                <button type="button" onClick={() => addRow("virtual_assistance", "clients", { client_id: null, name: "", logo_kind: "reliable", logo_url: "", project_url: "", work_image_url: "", work_image_urls: [], highlighted: false })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Add client
                </button>
              }
            />
            <div className="space-y-4">
              {content.virtual_assistance.clients.map((client, index) => (
                <ClientEditor
                  key={index}
                  client={client}
                  index={index}
                  count={content.virtual_assistance.clients.length}
                  setField={(field, value) => updateRow("virtual_assistance", "clients", index, field, value)}
                  availableClients={clients}
                  onSelect={(clientId) => selectClient("virtual_assistance", "clients", index, clientId)}
                  onMove={(row, direction) => moveRow("virtual_assistance", "clients", row, direction)}
                  onDelete={(row) => deleteRow("virtual_assistance", "clients", row)}
                  allowHighlight
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Services handled"
              description="Cards shown under the client grid."
              action={
                <button type="button" onClick={() => addRow("virtual_assistance", "handle_items", { icon: "", title: "", description: "" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Add service
                </button>
              }
            />
            <div className="mb-4">
              <Field label="Section title" value={content.virtual_assistance.handle_title} onChange={(value) => updateSection("virtual_assistance", "handle_title", value)} />
            </div>
            <div className="space-y-4">
              {content.virtual_assistance.handle_items.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex justify-end"><RowActions index={index} count={content.virtual_assistance.handle_items.length} onMove={(row, direction) => moveRow("virtual_assistance", "handle_items", row, direction)} onDelete={(row) => deleteRow("virtual_assistance", "handle_items", row)} /></div>
                  <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                    <Field label="Icon" value={item.icon} onChange={(value) => updateRow("virtual_assistance", "handle_items", index, "icon", value)} />
                    <Field label="Title" value={item.title} onChange={(value) => updateRow("virtual_assistance", "handle_items", index, "title", value)} />
                    <div className="md:col-span-2"><Field textarea label="Description" value={item.description} onChange={(value) => updateRow("virtual_assistance", "handle_items", index, "description", value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              title="Getting started steps"
              description="Numbered steps at the bottom of the page."
              action={
                <button type="button" onClick={() => addRow("virtual_assistance", "steps", { number: String(content.virtual_assistance.steps.length + 1).padStart(2, "0"), title: "", description: "" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Add step
                </button>
              }
            />
            <div className="mb-4">
              <Field label="Section title" value={content.virtual_assistance.steps_title} onChange={(value) => updateSection("virtual_assistance", "steps_title", value)} />
            </div>
            <div className="space-y-4">
              {content.virtual_assistance.steps.map((step, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex justify-end"><RowActions index={index} count={content.virtual_assistance.steps.length} onMove={(row, direction) => moveRow("virtual_assistance", "steps", row, direction)} onDelete={(row) => deleteRow("virtual_assistance", "steps", row)} /></div>
                  <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                    <Field label="Number" value={step.number} onChange={(value) => updateRow("virtual_assistance", "steps", index, "number", value)} />
                    <Field label="Title" value={step.title} onChange={(value) => updateRow("virtual_assistance", "steps", index, "title", value)} />
                    <div className="md:col-span-2"><Field textarea label="Description" value={step.description} onChange={(value) => updateRow("virtual_assistance", "steps", index, "description", value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-2 pl-3 shadow-2xl shadow-slate-900/20 backdrop-blur sm:right-5">
        <span className={`hidden items-center gap-2 text-xs font-semibold sm:flex ${hasChanges ? "text-amber-700" : "text-slate-500"}`}>
          <span className={`h-2 w-2 rounded-full ${hasChanges ? "bg-amber-500" : "bg-slate-300"}`} />
          {hasChanges ? "Unsaved changes" : "No changes to save"}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={!hasChanges || saving}
          className={`flex min-w-36 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
            hasChanges && !saving
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      <StatusMessage notice={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
