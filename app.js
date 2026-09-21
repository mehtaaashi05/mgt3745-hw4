// app.js
// The page talks to the Worker instead of keeping entries in localStorage.

// Replace this with the deployed Worker URL before testing the hosted page.
const API = "https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev";

const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const list = document.getElementById("note-list");
const error = document.getElementById("note-error");
const status = document.getElementById("save-status");
const emptyState = document.getElementById("empty-state");

function showError(message) {
  error.textContent = message;
  status.textContent = "";
}

function clearMessages() {
  error.textContent = "";
  status.textContent = "";
}

async function loadEntries() {
  const response = await fetch(API + "/entries");
  if (!response.ok) {
    throw new Error("could not load entries");
  }
  return response.json();
}

async function saveEntry(entry) {
  const response = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const reason = await response.text();
    throw new Error(reason || "could not save entry");
  }
}

function renderEntries(entries) {
  list.replaceChildren();
  emptyState.hidden = entries.length > 0;

  for (const entry of entries) {
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = entry.text;
    const when = document.createElement("time");
    when.textContent = entry.created_at || "";
    item.append(text, when);
    list.append(item);
  }
}

async function refresh() {
  try {
    renderEntries(await loadEntries());
  } catch {
    showError("Could not reach the server. Try again when it is available.");
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  clearMessages();

  const text = input.value.trim();
  if (text.length < 1 || text.length > 200) {
    showError("Enter a directory entry containing 1–200 characters.");
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  input.removeAttribute("aria-invalid");
  try {
    await saveEntry({ text });
    input.value = "";
    status.textContent = "Added to the directory.";
    await refresh();
    input.focus();
  } catch (err) {
    showError(err.message || "Could not save the entry.");
  }
});

refresh();
