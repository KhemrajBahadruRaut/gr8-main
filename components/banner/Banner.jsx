"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_GR8_API_URL || "https://api.gr8.com.np/gr8/api";

export default function TrustedBySection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    let refreshInProgress = false;

    const refreshClients = async () => {
      if (refreshInProgress || controller.signal.aborted) return;
      refreshInProgress = true;

      try {
        const response = await fetch(
          `${API_BASE_URL}/clients/get_clients.php?active=1&_=${Date.now()}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error("Unable to load clients");
        const data = await response.json();
        if (!data.success || !Array.isArray(data.clients)) return;
        setClients(
          data.clients.map((client) => ({
            id: client.id,
            name: client.name,
            logo: client.logo_url,
          })),
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Unable to refresh the clients banner:", error);
        }
      } finally {
        refreshInProgress = false;
      }
    };

    const handleStorageUpdate = (event) => {
      if (event.key === "gr8_clients_updated") refreshClients();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") refreshClients();
    };
    const channel =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("gr8_clients")
        : null;

    refreshClients();
    const interval = window.setInterval(refreshClients, 3000);
    channel?.addEventListener("message", refreshClients);
    window.addEventListener("gr8:clients-updated", refreshClients);
    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("focus", refreshClients);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      channel?.removeEventListener("message", refreshClients);
      channel?.close();
      window.removeEventListener("gr8:clients-updated", refreshClients);
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("focus", refreshClients);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (clients.length === 0) return null;

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="bg-[#0f1821] text-white sm:pt-15 pt-5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
            OUR VALUED CLIENTS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">Trusted By</h2>
        </div>

        <div className="relative h-32 flex items-center" style={{ contain: "layout style paint" }}>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#0f1821] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#0f1821] to-transparent z-10"></div>

          <div className="flex overflow-hidden w-full">
            <div className="flex animate-scroll">
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="shrink-0 sm:mx-8 mx-4 flex items-center justify-center sm:w-35 w-25 h-24"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300 max-h-20 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
