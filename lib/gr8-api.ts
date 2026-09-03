const CONFIGURED_API_BASE = (
  process.env.NEXT_PUBLIC_GR8_API_URL || "https://api.gr8.com.np/gr8/api"
).replace(/\/+$/, "");

function isLoopback(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

export function getGr8ApiBase() {
  if (typeof window === "undefined") return CONFIGURED_API_BASE;

  try {
    const apiUrl = new URL(CONFIGURED_API_BASE);
    const pageHost = window.location.hostname;

    // A site opened through a LAN hostname cannot fetch `localhost`: in the
    // browser that would point back to the visitor's own device.
    if (isLoopback(apiUrl.hostname) && !isLoopback(pageHost)) {
      apiUrl.hostname = pageHost;
    }

    return apiUrl.href.replace(/\/+$/, "");
  } catch {
    return CONFIGURED_API_BASE;
  }
}

export function resolveGr8AssetUrl(source: string) {
  const value = source.trim();
  if (!value || value.startsWith("data:") || value.startsWith("blob:")) return value;

  try {
    const apiUrl = new URL(getGr8ApiBase());
    const apiRootPath = apiUrl.pathname.replace(/\/api\/?$/, "/");
    const apiRoot = new URL(apiRootPath, apiUrl.origin);
    const isAbsolute = /^https?:\/\//i.test(value);
    const assetUrl = new URL(value, value.startsWith("/") ? apiUrl.origin : apiRoot);

    // Works uploads are owned by the configured API. Rebase old absolute
    // localhost URLs so content saved in one environment also works in another.
    if (assetUrl.pathname.includes("/uploads/") && isAbsolute && isLoopback(assetUrl.hostname)) {
      assetUrl.protocol = apiUrl.protocol;
      assetUrl.host = apiUrl.host;
    }

    return assetUrl.href;
  } catch {
    return value;
  }
}

