"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const EMPTY_FORM = { name: "", is_active: 1, logo: null };
const CLIENTS_API_BASE = `${
  process.env.NEXT_PUBLIC_GR8_API_URL || "https://api.gr8.com.np/gr8/api"
}/clients`;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${CLIENTS_API_BASE}/${endpoint}`, {
    cache: "no-store",
    credentials: "include",
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "The client list could not be updated.");
  }
  return data;
}

function publishClientsChanged() {
  const updatedAt = String(Date.now());
  localStorage.setItem("gr8_clients_updated", updatedAt);
  window.dispatchEvent(new Event("gr8:clients-updated"));

  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel("gr8_clients");
    channel.postMessage({ updatedAt });
    channel.close();
  }
}

function StatusMessage({ message, onClose }) {
  if (!message) return null;
  const isError = message.type === "error";

  return (
    <div
      className={`fixed right-5 bottom-5 z-60 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
      role="status"
    >
      {isError ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
      <span>{message.text}</span>
      <button onClick={onClose} className="ml-auto rounded p-1 hover:bg-black/5" aria-label="Close message">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ClientForm({ client, onClose, onSaved }) {
  const [form, setForm] = useState(() =>
    client
      ? { name: client.name, is_active: client.is_active, logo: null }
      : EMPTY_FORM,
  );
  const [preview, setPreview] = useState(client?.logo_url || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!form.logo) return undefined;
    const objectUrl = URL.createObjectURL(form.logo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.logo]);

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0] || null;
    setError("");
    if (!file) {
      setForm((current) => ({ ...current, logo: null }));
      setPreview(client?.logo_url || "");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose a logo smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setForm((current) => ({ ...current, logo: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Client name is required.");
      return;
    }
    if (!client && !form.logo) {
      setError("Please upload a client logo.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const body = new FormData();
      if (client) body.append("id", String(client.id));
      body.append("name", name);
      body.append("is_active", String(form.is_active));
      if (form.logo) body.append("logo", form.logo);

      await apiRequest(client ? "update_client.php" : "add_client.php", {
        method: "POST",
        body,
      });
      await onSaved(client ? "Client updated." : "Client added.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{client ? "Edit client" : "Add a client"}</h2>
            <p className="mt-1 text-sm text-slate-500">This information appears in the homepage banner.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close form">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label htmlFor="client-name" className="mb-2 block text-sm font-semibold text-slate-700">
              Client name
            </label>
            <input
              id="client-name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              maxLength={120}
              placeholder="e.g. GR8 Partner"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
              autoFocus
            />
          </div>

          <div>
            <span className="mb-2 block text-sm font-semibold text-slate-700">Client logo</span>
            <label
              htmlFor="client-logo"
              className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-emerald-400 hover:bg-emerald-50/40"
            >
              <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-900 p-2">
                {preview ? (
                  <img src={preview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <Upload className="h-4 w-4" />
                  {client ? "Replace logo" : "Upload logo"}
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {form.logo?.name || "PNG, JPG, GIF, or WebP. Maximum 5 MB."}
                </p>
              </div>
            </label>
            <input
              id="client-logo"
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              onChange={handleLogoChange}
              className="sr-only"
            />
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <span className="block text-sm font-semibold text-slate-700">Visible on homepage</span>
              <span className="text-xs text-slate-500">You can hide a client without deleting it.</span>
            </div>
            <input
              type="checkbox"
              checked={form.is_active === 1}
              onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked ? 1 : 0 }))}
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((text, type = "success") => {
    setMessage({ text, type });
  }, []);

  useEffect(() => {
    if (!message) return undefined;
    const timeout = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timeout);
  }, [message]);

  const loadClients = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const data = await apiRequest(`get_clients.php?all=1&_=${Date.now()}`);
      setClients(data.clients || []);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadClients();
    const interval = window.setInterval(() => loadClients(false), 3000);
    const handleFocus = () => loadClients(false);
    const handleStorageUpdate = (event) => {
      if (event.key === "gr8_clients_updated") loadClients(false);
    };
    const channel =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("gr8_clients")
        : null;

    channel?.addEventListener("message", handleFocus);
    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearInterval(interval);
      channel?.removeEventListener("message", handleFocus);
      channel?.close();
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadClients]);

  const activeCount = useMemo(
    () => clients.filter((client) => client.is_active === 1).length,
    [clients],
  );

  const openCreate = () => {
    setEditingClient(null);
    setFormOpen(true);
  };

  const openEdit = (client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleSaved = async (successMessage) => {
    setFormOpen(false);
    setEditingClient(null);
    await loadClients(false);
    publishClientsChanged();
    showMessage(successMessage);
  };

  const toggleVisibility = async (client) => {
    const action = client.is_active ? "hide" : "show";
    const location = client.is_active
      ? "It will be removed from the live homepage banner."
      : "It will appear on the live homepage banner.";
    if (!window.confirm(`${action === "hide" ? "Hide" : "Show"} ${client.name}? ${location}`)) {
      return;
    }

    setBusyId(client.id);
    try {
      await apiRequest("toggle_client.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, is_active: client.is_active ? 0 : 1 }),
      });
      await loadClients(false);
      publishClientsChanged();
      showMessage(client.is_active ? "Client hidden from the banner." : "Client is now visible.");
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setBusyId(null);
    }
  };

  const moveClient = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= clients.length) return;

    const reordered = [...clients];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setClients(reordered);
    setBusyId(clients[index].id);
    try {
      await apiRequest("reorder_clients.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordered_ids: reordered.map((client) => client.id) }),
      });
      publishClientsChanged();
    } catch (error) {
      setClients(clients);
      showMessage(error.message, "error");
    } finally {
      setBusyId(null);
    }
  };

  const deleteClient = async (client) => {
    if (!window.confirm(`Delete ${client.name}? This cannot be undone.`)) return;
    setBusyId(client.id);
    try {
      await apiRequest("delete_client.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id }),
      });
      await loadClients(false);
      publishClientsChanged();
      showMessage("Client deleted.");
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">Homepage content</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Valued clients</h1>
          <p className="mt-1 text-sm text-slate-500">
            {activeCount} visible of {clients.length} clients. Reorder them with the arrow buttons.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => loadClients()}
            disabled={loading}
            className="rounded-lg border border-slate-300 p-2.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            aria-label="Refresh clients"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
            <Plus className="h-5 w-5" />
            Add client
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span>Loading clients...</span>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4"><ImageIcon className="h-8 w-8 text-slate-400" /></div>
            <h2 className="font-bold text-slate-800">No clients yet</h2>
            <p className="mt-1 text-sm text-slate-500">Add the first logo to populate the homepage banner.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {clients.map((client, index) => {
              const isBusy = busyId === client.id;
              return (
                <div key={client.id} className={`flex flex-col gap-4 p-4 transition sm:flex-row sm:items-center ${client.is_active ? "" : "bg-slate-50 opacity-70"}`}>
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0f1821] p-2">
                      <img src={client.logo_url} alt={client.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-900">{client.name}</h2>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Position {index + 1}</span>
                        <span className={`rounded-full px-2 py-0.5 font-medium ${client.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                          {client.is_active ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => moveClient(index, -1)} disabled={index === 0 || isBusy} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label={`Move ${client.name} up`}>
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <button onClick={() => moveClient(index, 1)} disabled={index === clients.length - 1 || isBusy} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label={`Move ${client.name} down`}>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    <button onClick={() => toggleVisibility(client)} disabled={isBusy} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40" aria-label={client.is_active ? `Hide ${client.name}` : `Show ${client.name}`}>
                      {client.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                    <button onClick={() => openEdit(client)} disabled={isBusy} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-40" aria-label={`Edit ${client.name}`}>
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button onClick={() => deleteClient(client)} disabled={isBusy} className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-40" aria-label={`Delete ${client.name}`}>
                      {isBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {formOpen && (
        <ClientForm
          client={editingClient}
          onClose={() => { setFormOpen(false); setEditingClient(null); }}
          onSaved={handleSaved}
        />
      )}
      <StatusMessage message={message} onClose={() => setMessage(null)} />
    </div>
  );
}
