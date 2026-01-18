async function loadCollection() {
  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=9");
    if (!res.ok) throw new Error("Failed to fetch external data.");
    const items = await res.json();

    const categories = ["Interiors", "Cinema", "Objects", "Architecture", "Culture"];
    grid.innerHTML = items
      .map((item, idx) => {
        const year = 2018 + (idx % 7);
        const cat = categories[idx % categories.length];
        return `
          <article class="card animate-fadeUp">
            <span class="badge">${escapeHTML(cat)} • ${year}</span>
            <h3>${escapeHTML(titleCase(item.title).slice(0, 44))}</h3>
            <p>${escapeHTML(item.body.slice(0, 120))}...</p>
          </article>
        `;
      })
      .join("");
  } catch (err) {
    grid.innerHTML = `
      <div class="card">
        <h3>Collection unavailable</h3>
        <p>Please try again shortly.</p>
      </div>
    `;
  }
}

async function loadJournal() {
  const list = document.getElementById("journalGrid");
  if (!list) return;

  try {
    const res = await fetch("data/journal.json");
    if (!res.ok) throw new Error("Failed to fetch local JSON.");
    const posts = await res.json();

    list.innerHTML = posts
      .map((p) => `
        <article class="card animate-fadeUp">
          <span class="badge">${escapeHTML(p.tag)} • ${escapeHTML(p.readTime)}</span>
          <h3>${escapeHTML(p.title)}</h3>
          <p>${escapeHTML(p.excerpt)}</p>
          <p style="margin-top:10px; color: rgba(30,30,30,.55); font-size:13px;">
            ${escapeHTML(p.date)} • by ${escapeHTML(p.author)}
          </p>
        </article>
      `)
      .join("");
  } catch (err) {
    list.innerHTML = `
      <div class="card">
        <h3>Journal unavailable</h3>
        <p>Please check again later.</p>
      </div>
    `;
  }
}

function titleCase(str) {
  return String(str)
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

function escapeHTML(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadCollection();
loadJournal();
