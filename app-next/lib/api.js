const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default  async function api(path, init = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}