(() => {
  const REPO = "ovelhaohb/ovelhaohb-hub-idle";
  const RELEASES_URL = `https://api.github.com/repos/${REPO}/releases`;
  const releasePage = `https://github.com/${REPO}/releases`;
  const mapping = {
    windows: { id: "windows-assets", patterns: [/windows|win32|win64|win-x64|setup.*\.exe|\.msi$/i, /\.exe$/i, /\.msi$/i] },
    macos: { id: "macos-assets", patterns: [/macos|darwin|mac[-_ ]?(arm|intel|x64|aarch64)|\.dmg$/i, /\.dmg$/i, /\.pkg$/i] },
    linux: { id: "linux-assets", patterns: [/linux|\.appimage$|\.deb$|\.rpm$|\.tar\.gz$/i, /\.appimage$/i, /\.deb$/i, /\.rpm$/i, /\.tar\.gz$/i] }
  };

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));

  function assetLink(asset) {
    const name = escapeHtml(asset.name);
    const url = escapeHtml(asset.browser_download_url);
    return `<a class="asset-link" href="${url}" target="_blank" rel="noopener noreferrer" title="Baixar ${name}"><span class="asset-name">${name}</span><span>Baixar ↓</span></a>`;
  }

  function renderPlatform(key, assets) {
    const config = mapping[key];
    const node = document.getElementById(config.id);
    if (!node) return;
    const filtered = assets.filter(asset => config.patterns.some(pattern => pattern.test(asset.name)));
    if (!filtered.length) {
      node.innerHTML = `<span>Nenhum arquivo identificado automaticamente.</span><br><a class="text-link" href="${releasePage}" target="_blank" rel="noopener noreferrer">Ver todos os arquivos ↗</a>`;
      return;
    }
    node.innerHTML = filtered.slice(0, 3).map(assetLink).join("");
    if (filtered.length > 3) {
      node.innerHTML += `<a class="text-link" href="${releasePage}" target="_blank" rel="noopener noreferrer">+ ${filtered.length - 3} arquivo(s) nas Releases ↗</a>`;
    }
  }

  async function init() {
    document.getElementById("year").textContent = new Date().getFullYear();
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    menuButton?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

    const status = document.getElementById("release-status");
    try {
      const response = await fetch(RELEASES_URL, { headers: { "Accept": "application/vnd.github+json" } });
      if (!response.ok) throw new Error(`GitHub API retornou ${response.status}`);
      const releases = await response.json();
      const published = releases.filter(release => !release.draft);
      const release = published.find(item => !item.prerelease) || published[0];
      if (!release) {
        Object.values(mapping).forEach(({id}) => {
          document.getElementById(id).innerHTML = `<span>Ainda não há uma Release pública detectada.</span>`;
        });
        status.innerHTML = `Ainda não encontramos uma Release pública. Publique os instaladores em <a href="${releasePage}" target="_blank" rel="noopener noreferrer">GitHub Releases ↗</a>.`;
        return;
      }
      const assets = release.assets || [];
      Object.keys(mapping).forEach(key => renderPlatform(key, assets));
      status.innerHTML = `Versão consultada: <strong>${escapeHtml(release.name || release.tag_name)}</strong> · <a href="${escapeHtml(release.html_url)}" target="_blank" rel="noopener noreferrer">abrir Release ↗</a>. Se um arquivo não aparecer, confira todos os assets na página da versão.`;
    } catch (error) {
      Object.values(mapping).forEach(({id}) => {
        document.getElementById(id).innerHTML = `<a class="text-link" href="${releasePage}" target="_blank" rel="noopener noreferrer">Abrir downloads oficiais no GitHub ↗</a>`;
      });
      status.textContent = "Não foi possível consultar automaticamente as Releases agora. Use o link de downloads oficiais acima.";
    }
  }
  init();
})();
