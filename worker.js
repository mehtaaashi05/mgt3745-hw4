// worker.js
// The Worker is the server-side boundary for the entries feature.

// The static page may be served from a different origin during local
// development, so the API explicitly permits the browser requests it needs.
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch {
      // A failed database operation becomes a readable response for the page.
      return new Response("server error", { status: 500, headers: CORS });
    }
  },
};

async function handle(request, env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (request.method === "GET" && url.pathname === "/") {
    return Response.json({ service: "mgt3745-hw4", status: "ok" }, { headers: CORS });
  }

  if (!env.DB) {
    return new Response("server error: database is not configured", {
      status: 500,
      headers: CORS,
    });
  }

  if (request.method === "GET" && url.pathname === "/entries") {
    const { results } = await env.DB.prepare(
      "SELECT id, text, created_at FROM entries ORDER BY id"
    ).all();
    return Response.json(results, { headers: CORS });
  }

  if (request.method === "POST" && url.pathname === "/entries") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("body must be JSON", { status: 400, headers: CORS });
    }

    const text = typeof body?.text === "string" ? body.text.trim() : "";
    // EARS: IF entry text is longer than 200 characters, THEN the system SHALL reject it and say why.
    if (text.length > 200) {
      return new Response("text must be 200 characters or fewer", {
        status: 400,
        headers: CORS,
      });
    }
    if (text.length === 0) {
      return new Response("text required", { status: 400, headers: CORS });
    }

    // User data is passed as a bound value, never concatenated into SQL.
    await env.DB.prepare("INSERT INTO entries (text) VALUES (?)")
      .bind(text)
      .run();
    return new Response(null, { status: 201, headers: CORS });
  }

  if (request.method === "DELETE" && url.pathname.startsWith("/entries/")) {
    const id = Number(url.pathname.slice("/entries/".length));
    if (!Number.isInteger(id) || id < 1) {
      return new Response("entry id must be a positive integer", {
        status: 400,
        headers: CORS,
      });
    }

    const result = await env.DB.prepare("DELETE FROM entries WHERE id = ?")
      .bind(id)
      .run();
    if (!result.meta.changes) {
      return new Response("entry not found", { status: 404, headers: CORS });
    }
    return new Response(null, { status: 204, headers: CORS });
  }

  return new Response("not found", { status: 404, headers: CORS });
}
