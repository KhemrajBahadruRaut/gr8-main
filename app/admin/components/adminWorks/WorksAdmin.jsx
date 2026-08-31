"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  DEFAULT_WORKS_CONTENT,
  normalizeWorksContent,
} from "@/lib/works-content";

const WORKS_API_BASE = `${
  process.env.NEXT_PUBLIC_GR8_API_URL || "https://api.gr8.com.np/gr8/api"
}/works`;

const LOGO_KINDS = [
  "suvekchya",
  "reliable",
  "united",
  "joy",
  "precision",
  "parijat",
  "delivery",
  "rtcs",
];

const PROJECT_VISUALS = ["photography", "food", "travel", "delivery"];

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${WORKS_API_BASE}/${endpoint}`, {
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

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("-", " ")}
          </option>
        ))}
      </select>
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
          <img src={value} alt="Uploaded preview" className="max-h-full max-w-full object-contain" />
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ClientEditor({
  client,
  index,
  count,
  setField,
  onMove,
  onDelete,
  onUpload,
  allowHighlight,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <ImageIcon className="h-4 w-4 text-emerald-600" />
          Client {index + 1}
        </div>
        <RowActions index={index} count={count} onMove={onMove} onDelete={onDelete} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Client name" value={client.name} onChange={(value) => setField("name", value)} />
        <SelectField
          label="Fallback logo style"
          value={client.logo_kind}
          options={LOGO_KINDS}
          onChange={(value) => setField("logo_kind", value)}
        />
        <UploadField
          label="Custom logo"
          value={client.logo_url}
          onChange={(value) => setField("logo_url", value)}
          onUpload={onUpload}
        />
        <Field
          label="Project URL"
          value={client.project_url}
          onChange={(value) => setField("project_url", value)}
          placeholder="https://..."
        />
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
    </div>
  );
}

function StatusMessage({ notice, onClose }) {
  if (!notice) return null;
  const error = notice.type === "error";
  return (
    <div
      className={`fixed right-5 bottom-5 z-60 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl ${
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
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`get_works.php?_=${Date.now()}`);
      setContent(normalizeWorksContent(data.content));
    } catch (error) {
      setNotice({ type: "error", text: error.message });
      setContent(normalizeWorksContent(DEFAULT_WORKS_CONTENT));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadContent();
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

  const uploadAsset = async (file) => {
    const body = new FormData();
    body.append("image", file);
    const data = await apiRequest("upload_asset.php", { method: "POST", body });
    return data.url;
  };

  const save = async () => {
    setSaving(true);
    try {
      const data = await apiRequest("save_works.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setContent(normalizeWorksContent(data.content));
      publishWorksChanged();
      setNotice({ type: "success", text: data.message || "Our Works content saved." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

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
    <div className="mx-auto max-w-6xl pb-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Our Works content</h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit page copy, client cards, projects, services, links, and images without changing the frontend layout.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadContent}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            Reload
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
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
              description="Custom logos override the built-in fallback logo style."
              action={
                <button type="button" onClick={() => addRow("digital_marketing", "clients", { name: "New client", logo_kind: "reliable", logo_url: "", project_url: "" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
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
                  onMove={(row, direction) => moveRow("digital_marketing", "clients", row, direction)}
                  onDelete={(row) => deleteRow("digital_marketing", "clients", row)}
                  onUpload={uploadAsset}
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
                <button type="button" onClick={() => addRow("web_development", "projects", { name: "New project", description: "Project description", services: "UI/UX, Frontend", stack: "React", visual_kind: "photography", image_url: "", website_url: "" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
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
                    <SelectField label="Fallback artwork" value={project.visual_kind} options={PROJECT_VISUALS} onChange={(value) => updateRow("web_development", "projects", index, "visual_kind", value)} />
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
              description="Client cards shown at the top of the page."
              action={
                <button type="button" onClick={() => addRow("virtual_assistance", "clients", { name: "New client", logo_kind: "reliable", logo_url: "", project_url: "", highlighted: false })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
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
                  onMove={(row, direction) => moveRow("virtual_assistance", "clients", row, direction)}
                  onDelete={(row) => deleteRow("virtual_assistance", "clients", row)}
                  onUpload={uploadAsset}
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
                <button type="button" onClick={() => addRow("virtual_assistance", "handle_items", { icon: "✓", title: "New service", description: "Service description" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
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
                <button type="button" onClick={() => addRow("virtual_assistance", "steps", { number: String(content.virtual_assistance.steps.length + 1).padStart(2, "0"), title: "New step", description: "Step description" })} className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white">
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

      <StatusMessage notice={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
