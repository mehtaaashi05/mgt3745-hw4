// app.js
// The page talks to the Worker instead of keeping entries in localStorage.

// Replace this with the deployed Worker URL before testing the hosted page.
const API = "https://mgt3745-hw4.mgt3745-hw4.workers.dev";

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

async function loadNotes() {
  const response = await fetch(API + "/entries");
  if (!response.ok) {
    throw new Error("could not load entries");
  }
  return response.json();
}

async function saveEntry(candidate) {
  const response = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) {
    const reason = await response.text();
    throw new Error(reason || "could not save entry");
  }
}

async function deleteEntry(id) {
  const response = await fetch(API + "/entries/" + id, { method: "DELETE" });
  if (!response.ok) {
    const reason = await response.text();
    throw new Error(reason || "could not remove entry");
  }
}

function renderEntries(notes) {
  list.replaceChildren();
  emptyState.hidden = notes.length > 0;

  for (const note of notes) {
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = note.text;
    const when = document.createElement("time");
    when.textContent = note.created_at || "";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove entry: " + note.text);
    remove.addEventListener("click", async () => {
      clearMessages();
      remove.disabled = true;
      try {
        await deleteEntry(note.id);
        status.textContent = "Entry removed.";
        await refresh();
      } catch (err) {
        remove.disabled = false;
        showError(err.message || "Could not remove the entry.");
      }
    });
    item.append(text, when, remove);
    list.append(item);
  }
}

async function refresh() {
  try {
    renderEntries(await loadNotes());
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
