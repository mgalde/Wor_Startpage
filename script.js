/* ═══════════════════════════════════════════════════════════════════
   acirema.dev — script.js
   All application logic for the start page.
   ═══════════════════════════════════════════════════════════════════ */

// ─── Constants ────────────────────────────────────────────────────────
const SHORTCUT_STARTER  = 'tab';
const SHORTCUT_TIMEOUT  = 1500; // ms — keep in sync with --SHORTCUT_TIMEOUT in CSS

// ─── Link Map ─────────────────────────────────────────────────────────
// `category` drives the left-border accent and command palette badge.
// Values: "security" | "references" | "important"
const MASTER_MAP = [
    {
        groupName: "Hacking News",
        category:  "security",
        items: [
            { name: "Bleeping Computer",  shortcutKey: "q", url: "https://www.bleepingcomputer.com" },
            { name: "Dark Reading",       shortcutKey: "w", url: "https://www.darkreading.com" },
            { name: "NY Times",           shortcutKey: "e", url: "https://www.nytimes.com/" },
            { name: "Hacker News",        shortcutKey: "r", url: "https://news.ycombinator.com/" },
            { name: "The Hacker News",    shortcutKey: "t", url: "https://thehackernews.com/" }
        ]
    },
    {
        groupName: "References",
        category:  "references",
        items: [
            { name: "ESTCP",                     shortcutKey: "a", url: "https://www.serdp-estcp.org/Tools-and-Training/Installation-Energy-and-Water/Cybersecurity" },
            { name: "Infragard",                 shortcutKey: "s", url: "https://www.infragard.org/" },
            { name: "SAM.gov",                   shortcutKey: "d", url: "https://sam.gov/content/opportunities" },
            { name: "MITRE ATT&CK",              shortcutKey: "f", url: "https://attack.mitre.org/" },
            { name: "NIST Cybersecurity",        shortcutKey: "g", url: "https://www.nist.gov/cyberframework" },
            { name: "GeeksForGeeks",             shortcutKey: "h", url: "https://www.geeksforgeeks.org/" }
        ]
    },
    {
        groupName: "University",
        category:  "important",
        items: [
            { name: "CAST Sharepoint",       shortcutKey: "z", url: "https://emailarizona.sharepoint.com/sites/CAST" },
            { name: "Cyber Ops Portal",      shortcutKey: "x", url: "https://portal.cyberapolis.com/" },
            { name: "UA VITAE",              shortcutKey: "c", url: "https://uavitae.arizona.edu/" },
            { name: "UA Access",             shortcutKey: "v", url: "https://uaccess.arizona.edu/" },
            { name: "D2L",                   shortcutKey: "b", url: "https://d2l.arizona.edu/d2l/home" },
            { name: "Office.com",            shortcutKey: "n", url: "https://www.office.com/" },
            { name: "Academic Calendar",     shortcutKey: "m", url: "https://catalog.arizona.edu/academic-calendar" }
        ]
    },
    {
        groupName: "Tools",
        category:  "important",
        items: [
            { name: "Claude AI",   shortcutKey: "1", url: "https://claude.ai/" },
            { name: "ChatGPT",     shortcutKey: "2", url: "https://chat.openai.com" },
            { name: "Any Run",     shortcutKey: "3", url: "https://app.any.run/" },
            { name: "DNS Dumpster",shortcutKey: "4", url: "https://dnsdumpster.com/" },
            { name: "SHODAN",      shortcutKey: "5", url: "https://shodan.io/" },
            { name: "VirusTotal",  shortcutKey: "6", url: "https://www.virustotal.com/" }
        ]
    },
    {
        groupName: "Connections",
        category:  "important",
        items: [
            { name: "Bluesky",   shortcutKey: "j", url: "https://bsky.app/" },
            { name: "Reddit",    shortcutKey: "k", url: "https://www.reddit.com/" },
            { name: "YouTube",   shortcutKey: "l", url: "https://www.youtube.com/" },
            { name: "LinkedIn",  shortcutKey: ";", url: "https://www.linkedin.com/" },
            { name: "GitHub",    shortcutKey: "i", url: "https://github.com/" },
            { name: "Twitter",   shortcutKey: "o", url: "https://twitter.com/" }
        ]
    },
    {
        groupName: "Entertainment",
        category:  "important",
        items: [
            { name: "Netflix",       shortcutKey: "7", url: "https://www.netflix.com/" },
            { name: "Hulu",          shortcutKey: "8", url: "https://www.hulu.com/" },
            { name: "Disney+",       shortcutKey: "9", url: "https://www.disneyplus.com/" },
            { name: "Spotify",       shortcutKey: "0", url: "https://open.spotify.com/" },
            { name: "Amazon Prime",  shortcutKey: "-", url: "https://www.amazon.com/Prime-Video/" },
            { name: "Twitch",        shortcutKey: "=", url: "https://www.twitch.tv/" }
        ]
    }
];

// ─── Runtime State ────────────────────────────────────────────────────
let $container;
let getUrl                = {};
let $shortcutDisplayList;
let listeningForShortcut  = false;
let listenerTimeout;

let commandPaletteOpen    = false;
let paletteResults        = [];
let selectedPaletteIndex  = -1;
let searchIndex           = [];

let terminalMode          = false;

/* ═══════════════════════════════════════════════════════════════════
   1. CONTEXT-AWARE GREETING
   ═══════════════════════════════════════════════════════════════════ */

const GREETINGS = {
    earlyMorning: {
        weekday: [
            "Up before the sun. Let's get to work.",
            "Early hours. No distractions. Use them.",
            "Before the noise starts. Go.",
            "First one in. Make it mean something."
        ],
        monday: [
            "Monday. Up before the sun. Points for effort.",
            "Week starts now. Make it count.",
            "Early Monday. The edge is yours."
        ],
        weekend: [
            "Early start. Enjoy the quiet.",
            "Weekend early bird. Rare.",
            "No alarm needed today. Good habit."
        ]
    },
    morning: {
        weekday: [
            "Morning. Time to build something.",
            "Fresh start. What matters today?",
            "Morning window. Don't waste it.",
            "The day is still yours. Act like it."
        ],
        monday: [
            "New week. Clean slate. Make it count.",
            "Monday morning. Reset and go.",
            "Week one of the rest. Start clean."
        ],
        friday: [
            "Friday morning. One more push.",
            "Last stretch. Finish what you started.",
            "Friday. Don't coast. Not yet."
        ],
        weekend: [
            "No meetings. No deadlines. Good.",
            "Weekend morning. Yours to use however.",
            "Coffee first. Then whatever you want."
        ]
    },
    midday: {
        weekday: [
            "Halfway through. Stay focused.",
            "Midday check: are you ahead or behind?",
            "Half the day left. Use it.",
            "Lunch earned. Keep the momentum."
        ],
        weekend: [
            "Midday. Still time to do something useful.",
            "Half the day gone. No pressure.",
            "Afternoon starting. Still yours."
        ]
    },
    afternoon: {
        weekday: [
            "Afternoon. The focus window is narrowing.",
            "Post-lunch. Fight the slump.",
            "Second half. Make it productive.",
            "Still time to ship something today."
        ],
        friday: [
            "Almost there. Finish strong.",
            "Friday afternoon. Hold the line.",
            "End of week push. Don't blink now."
        ],
        weekend: [
            "Afternoon. Rest or build — your call.",
            "Weekend afternoon. No wrong answer here.",
            "Halfway through the day. Relax."
        ]
    },
    evening: {
        weekday: [
            "Evening. What did you actually finish?",
            "Day's end. Did it matter?",
            "Wrap up. Document what you did.",
            "Closing time. Leave it better than you found it."
        ],
        weekend: [
            "Evening. Wind down or push forward.",
            "Weekend winding down. Make peace with what got done.",
            "Sunday evening. Tomorrow is a clean slate."
        ]
    },
    night: {
        weekday: [
            "Still at it. Respect.",
            "Late night build session. Classic.",
            "The quiet hours are productive. Use them.",
            "Night shift. Get something shipped."
        ],
        weekend: [
            "Night owl on the weekend. Respect.",
            "Late weekend. You do you.",
            "Not everyone burns midnight oil on weekends."
        ]
    },
    lateNight: {
        any: [
            "Still at it. Respect.",
            "It's that late. Hydrate and ship.",
            "The world is asleep. You're not. Make it count.",
            "Late night run. Whatever keeps you going."
        ]
    }
};

function getGreeting() {
    const now    = new Date();
    const hour   = now.getHours();
    const day    = now.getDay(); // 0=Sun, 6=Sat
    const isWknd = day === 0 || day === 6;
    const isMon  = day === 1;
    const isFri  = day === 5;

    let slot;
    if      (hour >= 5  && hour < 9)  slot = 'earlyMorning';
    else if (hour >= 9  && hour < 12) slot = 'morning';
    else if (hour >= 12 && hour < 14) slot = 'midday';
    else if (hour >= 14 && hour < 17) slot = 'afternoon';
    else if (hour >= 17 && hour < 20) slot = 'evening';
    else if (hour >= 20 && hour < 24) slot = 'night';
    else                               slot = 'lateNight';

    const pool = GREETINGS[slot];
    let options;

    if (slot === 'lateNight') {
        options = pool.any;
    } else if (isWknd) {
        options = pool.weekend || pool.weekday;
    } else if (isMon && pool.monday) {
        options = pool.monday;
    } else if (isFri && pool.friday) {
        options = pool.friday;
    } else {
        options = pool.weekday || pool.any;
    }

    return options[Math.floor(Math.random() * options.length)];
}

function setupWelcomeMessage() {
    const el = document.getElementById('welcome-string');
    el.textContent = getGreeting();
    // Trigger fade-in on next tick so transition fires
    requestAnimationFrame(() => el.classList.add('visible'));
}

/* ═══════════════════════════════════════════════════════════════════
   2. BACKGROUND IMAGE (time-based)
   ═══════════════════════════════════════════════════════════════════ */

function setBackgroundBasedOnTime() {
    // Light mode uses its own background color — dark photo backgrounds make
    // the light-mode text (#1e293b) invisible.
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
        document.body.style.backgroundImage = 'none';
        return;
    }

    const hour = new Date().getHours();
    let img;
    if      (hour >= 5  && hour < 8)  img = 'sunrise.jpg';
    else if (hour >= 8  && hour < 18) img = 'daytime.jpg';
    else if (hour >= 18 && hour < 20) img = 'sunset.jpg';
    else                               img = 'night.jpg';

    document.body.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url("${img}")`;
}

/* ═══════════════════════════════════════════════════════════════════
   3. CLOCK / DATE
   ═══════════════════════════════════════════════════════════════════ */

function updateDateTime() {
    const now  = new Date();
    const hh   = now.getHours().toString().padStart(2, '0');
    const mm   = now.getMinutes().toString().padStart(2, '0');
    const ss   = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hh}:${mm}:${ss}`;
    document.getElementById('current-date').textContent =
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    setTimeout(updateDateTime, 1000);
}

/* ═══════════════════════════════════════════════════════════════════
   4. WEATHER (NWS API — Tucson, AZ)
   ═══════════════════════════════════════════════════════════════════ */

function fetchWeather() {
    const lat = 32.253460, lon = -110.911789;

    fetch(`https://api.weather.gov/points/${lat},${lon}`)
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(d => fetch(d.properties.forecast))
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(fd => {
            const cur  = fd.properties.periods[0];
            document.getElementById('weather-temp').textContent =
                `${cur.temperature}°${cur.temperatureUnit}`;
            document.getElementById('weather-desc').textContent = cur.shortForecast;

            const ico  = document.querySelector('.weather-icon');
            const desc = cur.shortForecast.toLowerCase();
            if (desc.includes('sunny') || desc.includes('clear'))   ico.textContent = '☀️';
            else if (desc.includes('partly'))                        ico.textContent = '🌤️';
            else if (desc.includes('cloud'))                         ico.textContent = '☁️';
            else if (desc.includes('rain') || desc.includes('shower')) ico.textContent = '🌧️';
            else if (desc.includes('snow'))                          ico.textContent = '❄️';
            else if (desc.includes('storm') || desc.includes('thunder')) ico.textContent = '⛈️';
            else                                                      ico.textContent = '🌡️';
        })
        .catch(() => {
            document.getElementById('weather-temp').textContent = '--°F';
            document.getElementById('weather-desc').textContent = 'Unavailable';
            document.querySelector('.weather-icon').textContent = '🌡️';
        });

    setTimeout(fetchWeather, 30 * 60 * 1000);
}

/* ═══════════════════════════════════════════════════════════════════
   5. LINK GROUPS (generated from MASTER_MAP)
   ═══════════════════════════════════════════════════════════════════ */

function buildSearchIndex() {
    searchIndex = [];
    MASTER_MAP.forEach(group => {
        group.items.forEach(item => {
            searchIndex.push({
                name:      item.name,
                url:       item.url,
                groupName: group.groupName,
                category:  group.category || 'important'
            });
        });
    });
}

function setupGroups() {
    // Remove any previously generated groups (preserves threat feed card)
    $container.querySelectorAll('.group[data-generated]').forEach(g => g.remove());

    for (let i = 0; i < MASTER_MAP.length; i++) {
        const grpData = MASTER_MAP[i];

        const group = document.createElement('div');
        group.className = 'group';
        group.setAttribute('data-generated', 'true');
        group.setAttribute('data-category', grpData.category || 'important');
        $container.appendChild(group);

        const header = document.createElement('h1');
        header.textContent = grpData.groupName;
        group.appendChild(header);

        for (let j = 0; j < grpData.items.length; j++) {
            const item = grpData.items[j];

            const p = document.createElement('p');
            group.appendChild(p);

            const link = document.createElement('a');
            link.textContent = item.name;
            link.href        = item.url;
            link.target      = '_blank';
            link.rel         = 'noopener noreferrer';
            p.appendChild(link);

            const shortcut = document.createElement('span');
            shortcut.textContent = item.shortcutKey;
            shortcut.className   = 'shortcut';
            shortcut.style.animation = 'none';
            p.appendChild(shortcut);

            getUrl[item.shortcutKey] = item.url;
        }
    }

    // Re-read the live collection after DOM update
    $shortcutDisplayList = document.getElementsByClassName('shortcut');
}

/* ═══════════════════════════════════════════════════════════════════
   6. KEYBOARD SHORTCUTS (Tab + key)
   ═══════════════════════════════════════════════════════════════════ */

function shortcutListener(e) {
    // Don't fire when command palette is open or an input is focused
    if (commandPaletteOpen) return;
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    const key = e.key.toLowerCase();

    if (listeningForShortcut && Object.prototype.hasOwnProperty.call(getUrl, key)) {
        window.open(getUrl[key], '_blank', 'noopener,noreferrer');
        listeningForShortcut = false;
        return;
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animate shortcut badges
        for (let i = 0; i < $shortcutDisplayList.length; i++) {
            $shortcutDisplayList[i].style.animation = 'none';
            setTimeout(() => { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(() => { listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

/* ═══════════════════════════════════════════════════════════════════
   7. THEME
   ═══════════════════════════════════════════════════════════════════ */

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setBackgroundBasedOnTime(); // re-evaluate: light mode clears the photo bg
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.getElementById('theme-switch').checked = next === 'light';
}

/* ═══════════════════════════════════════════════════════════════════
   8. COMMAND PALETTE
   ═══════════════════════════════════════════════════════════════════ */

function openCommandPalette() {
    commandPaletteOpen = true;
    const overlay = document.getElementById('command-palette-overlay');
    overlay.classList.add('active');
    const input = document.getElementById('command-palette-input');
    input.value = '';
    selectedPaletteIndex = -1;
    renderPaletteResults('');
    // Small delay so the overlay renders before focus
    setTimeout(() => input.focus(), 30);
}

function closeCommandPalette() {
    commandPaletteOpen = false;
    document.getElementById('command-palette-overlay').classList.remove('active');
    document.getElementById('command-palette-input').value = '';
    document.getElementById('command-palette-results').innerHTML = '';
    selectedPaletteIndex = -1;
}

function renderPaletteResults(query) {
    const q = query.trim().toLowerCase();

    if (q === '') {
        paletteResults = searchIndex;
    } else {
        paletteResults = searchIndex.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.groupName.toLowerCase().includes(q) ||
            item.url.toLowerCase().includes(q)
        );
    }

    selectedPaletteIndex = paletteResults.length > 0 ? 0 : -1;

    const container = document.getElementById('command-palette-results');
    container.innerHTML = '';

    if (paletteResults.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'palette-empty';
        empty.textContent = 'No results.';
        container.appendChild(empty);
        return;
    }

    paletteResults.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'palette-result' + (idx === 0 ? ' selected' : '');
        row.setAttribute('role', 'option');
        row.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

        const badge = document.createElement('span');
        badge.className = 'palette-cat-badge';
        badge.setAttribute('data-cat', item.category);
        badge.textContent = item.groupName;

        const name = document.createElement('span');
        name.className = 'palette-link-name';
        name.textContent = item.name;

        const urlSpan = document.createElement('span');
        urlSpan.className = 'palette-link-url';
        try {
            urlSpan.textContent = new URL(item.url).hostname;
        } catch (_) {
            urlSpan.textContent = item.url;
        }

        row.appendChild(badge);
        row.appendChild(name);
        row.appendChild(urlSpan);

        row.addEventListener('click', () => {
            window.open(item.url, '_blank', 'noopener,noreferrer');
            closeCommandPalette();
        });

        container.appendChild(row);
    });
}

function navigatePalette(direction) {
    if (paletteResults.length === 0) return;

    const container = document.getElementById('command-palette-results');
    const rows = container.querySelectorAll('.palette-result');

    if (rows[selectedPaletteIndex]) {
        rows[selectedPaletteIndex].classList.remove('selected');
        rows[selectedPaletteIndex].setAttribute('aria-selected', 'false');
    }

    selectedPaletteIndex = Math.max(0, Math.min(
        paletteResults.length - 1,
        selectedPaletteIndex + direction
    ));

    if (rows[selectedPaletteIndex]) {
        rows[selectedPaletteIndex].classList.add('selected');
        rows[selectedPaletteIndex].setAttribute('aria-selected', 'true');
        rows[selectedPaletteIndex].scrollIntoView({ block: 'nearest' });
    }
}

function openSelectedResult() {
    if (selectedPaletteIndex >= 0 && paletteResults[selectedPaletteIndex]) {
        window.open(paletteResults[selectedPaletteIndex].url, '_blank', 'noopener,noreferrer');
        closeCommandPalette();
    }
}

function setupCommandPalette() {
    const input = document.getElementById('command-palette-input');

    input.addEventListener('input', () => {
        renderPaletteResults(input.value);
    });

    // Close when clicking the backdrop (but not the palette box itself)
    document.getElementById('command-palette-overlay').addEventListener('click', e => {
        if (e.target === document.getElementById('command-palette-overlay')) {
            closeCommandPalette();
        }
    });
}

/* ═══════════════════════════════════════════════════════════════════
   9. GLOBAL KEY HANDLER (keydown)
   ═══════════════════════════════════════════════════════════════════ */

function globalKeyHandler(e) {
    // ── Ctrl+\ → toggle terminal mode ──────────────────────────────
    if (e.ctrlKey && e.key === '\\') {
        e.preventDefault();
        toggleTerminalMode();
        return;
    }

    // ── Escape ─────────────────────────────────────────────────────
    if (e.key === 'Escape') {
        if (commandPaletteOpen) {
            closeCommandPalette();
        } else if (terminalMode) {
            deactivateTerminalMode();
        }
        return;
    }

    // ── Arrow / Enter navigation inside palette ─────────────────────
    if (commandPaletteOpen) {
        if (e.key === 'ArrowDown') { e.preventDefault(); navigatePalette(1);  return; }
        if (e.key === 'ArrowUp')   { e.preventDefault(); navigatePalette(-1); return; }
        if (e.key === 'Enter')     { e.preventDefault(); openSelectedResult(); return; }
        return; // swallow other keys while palette is open
    }

    // ── "/" → open command palette (not when focused in an input) ───
    const tag = document.activeElement.tagName.toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        openCommandPalette();
    }
}

/* ═══════════════════════════════════════════════════════════════════
   10. CYBER THREAT INTEL — CISA KEV FEED
   ═══════════════════════════════════════════════════════════════════ */

async function fetchCISAFeed() {
    // Ensure the threat feed card exists as the first child of #content
    let card = document.getElementById('threat-feed');
    if (!card) {
        card = document.createElement('div');
        card.id        = 'threat-feed';
        card.className = 'group threat-feed-card';
        $container.insertBefore(card, $container.firstChild);
    }

    // Build/reset the card structure
    card.innerHTML = `
        <h1><span class="live-dot">●</span> THREAT FEED</h1>
        <div id="threat-feed-items"><span style="color:#444;font-size:0.8rem">fetching…</span></div>
    `;

    try {
        // CISA's CDN does not send CORS headers so a direct browser fetch is blocked.
        // Try two public CORS proxies in order; the first successful response wins.
        const CISA_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
        const PROXIES  = [
            u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
            u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
        ];

        let data = null;
        for (const proxy of PROXIES) {
            try {
                const r = await fetch(proxy(CISA_URL));
                if (!r.ok) continue;
                data = await r.json();
                break;
            } catch (_) { continue; }
        }
        if (!data) throw new Error('all proxies failed');

        const vulns = (data.vulnerabilities || [])
            .slice()
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 5);

        const itemsEl = document.getElementById('threat-feed-items');
        itemsEl.innerHTML = '';

        vulns.forEach(v => {
            const row    = document.createElement('div');
            row.className = 'threat-row';

            const badge  = document.createElement('span');
            badge.className   = 'cve-badge';
            badge.textContent = v.cveID;

            const vendor = document.createElement('span');
            vendor.className   = 'threat-vendor';
            vendor.textContent = `${v.vendorProject} — ${v.product}`;

            const name   = document.createElement('span');
            name.className   = 'threat-name';
            name.textContent = v.vulnerabilityName;

            const date   = document.createElement('span');
            date.className   = 'threat-date';
            date.textContent = v.dateAdded;

            row.appendChild(badge);
            row.appendChild(vendor);
            row.appendChild(name);
            row.appendChild(date);
            itemsEl.appendChild(row);
        });

    } catch (_) {
        const itemsEl = document.getElementById('threat-feed-items');
        if (itemsEl) {
            const msg = document.createElement('div');
            msg.className   = 'feed-unavailable';
            msg.textContent = 'FEED UNAVAILABLE';
            itemsEl.innerHTML = '';
            itemsEl.appendChild(msg);
        }
    }
}

/* ═══════════════════════════════════════════════════════════════════
   11. TERMINAL MODE EASTER EGG  (Ctrl+\)
   ═══════════════════════════════════════════════════════════════════ */

function activateTerminalMode() {
    terminalMode = true;
    document.body.classList.add('terminal-mode');
    document.body.style.backgroundImage = 'none';

    const wt = document.getElementById('wordmark-text');
    if (wt) wt.textContent = '[acirema@dev ~]$';

    sessionStorage.setItem('terminalMode', 'true');
}

function deactivateTerminalMode() {
    terminalMode = false;
    document.body.classList.remove('terminal-mode');
    setBackgroundBasedOnTime(); // restore time-based background

    const wt = document.getElementById('wordmark-text');
    if (wt) wt.textContent = 'acirema.dev';

    sessionStorage.removeItem('terminalMode');
}

function toggleTerminalMode() {
    if (terminalMode) deactivateTerminalMode();
    else              activateTerminalMode();
}

/* ═══════════════════════════════════════════════════════════════════
   12. NEWS TICKER
   ═══════════════════════════════════════════════════════════════════ */

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function updateNewsTicker(newsItems) {
    const content = document.getElementById('news-ticker-content');
    content.innerHTML = '';

    const addItem = item => {
        const wrap = document.createElement('div');
        wrap.className = 'news-ticker-item';
        const a = document.createElement('a');
        a.href        = item.link;
        a.target      = '_blank';
        a.rel         = 'noopener noreferrer';
        a.textContent = `[${item.sourceName || 'News'}] ${item.title}`;
        wrap.appendChild(a);
        return wrap;
    };

    // Primary items + duplicates for seamless loop
    newsItems.forEach(item => content.appendChild(addItem(item)));
    newsItems.forEach(item => content.appendChild(addItem(item)));

    startTickerAnimation();
}

function startTickerAnimation() {
    const content   = document.getElementById('news-ticker-content');
    const container = document.querySelector('.news-ticker-container');

    if (!content || !container) return;

    // Cancel any running animation
    if (content._tickerRaf) cancelAnimationFrame(content._tickerRaf);

    content.style.animation = 'none';
    let position  = container.offsetWidth;
    let isPaused  = false;

    const onEnter = () => { isPaused = true; };
    const onLeave = () => { isPaused = false; };

    // Avoid stacking listeners on re-runs
    container.removeEventListener('mouseenter', container._tickerEnter);
    container.removeEventListener('mouseleave', container._tickerLeave);
    container._tickerEnter = onEnter;
    container._tickerLeave = onLeave;
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    content.style.transform = `translateX(${position}px)`;

    function tick() {
        if (!isPaused) {
            position -= 0.5;
            if (position < -content.offsetWidth) position = container.offsetWidth;
            content.style.transform = `translateX(${position}px)`;
        }
        content._tickerRaf = requestAnimationFrame(tick);
    }
    tick();
}

function loadFallbackNews() {
    const fallback = shuffleArray([
        { title: "Maintaining proper cyber hygiene is essential for protecting against threats",        link: "https://thehackernews.com/",         sourceName: "The Hacker News" },
        { title: "Zero-day vulnerabilities continue to be exploited in major software",                link: "https://thehackernews.com/",         sourceName: "The Hacker News" },
        { title: "Ransomware attacks target critical infrastructure worldwide",                         link: "https://krebsonsecurity.com/",        sourceName: "Krebs on Security" },
        { title: "New phishing campaign targets corporate executives",                                  link: "https://www.darkreading.com/",        sourceName: "Dark Reading" },
        { title: "Security researchers discover vulnerability in popular IoT devices",                  link: "https://www.bleepingcomputer.com/",   sourceName: "Bleeping Computer" },
        { title: "Data breach exposes millions of customer records",                                    link: "https://krebsonsecurity.com/",        sourceName: "Krebs on Security" },
        { title: "NIST releases new guidelines for password security",                                  link: "https://www.nist.gov/",               sourceName: "NIST" },
        { title: "Critical security patches released for major operating systems",                      link: "https://www.bleepingcomputer.com/",   sourceName: "Bleeping Computer" },
        { title: "Global economic outlook shows signs of recovery",                                     link: "https://www.cnn.com/",                sourceName: "CNN" },
        { title: "Tech companies announce major investments in AI research",                             link: "https://www.nytimes.com/",            sourceName: "NY Times" },
        { title: "Scientists make breakthrough in renewable energy storage",                             link: "https://news.yahoo.com/",             sourceName: "Yahoo News" }
    ]);
    updateNewsTicker(fallback);
}

function fetchCyberSecurityNews() {
    const sources = [
        { name: 'The Hacker News',   url: 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews', limit: 10 },
        { name: 'Krebs on Security', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://krebsonsecurity.com/feed/',            limit: 10 },
        { name: 'Bleeping Computer', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/',       limit: 10 },
        { name: 'CNN',               url: 'https://api.rss2json.com/v1/api.json?rss_url=http://rss.cnn.com/rss/edition.rss',           limit: 5  },
        { name: 'BBC',               url: 'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml',         limit: 5  },
        { name: 'NY Times',          url: 'https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', limit: 5 },
        { name: 'Yahoo News',        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.yahoo.com/rss/', limit: 5 }
    ];

    let all = [];
    const promises = sources.map(src =>
        fetch(src.url)
            .then(r => r.json())
            .then(d => {
                if (d.status === 'ok') {
                    d.items.slice(0, src.limit).forEach(item => {
                        item.sourceName = src.name;
                        all.push(item);
                    });
                }
            })
            .catch(() => { /* individual source failure is acceptable */ })
    );

    Promise.all(promises).then(() => {
        if (all.length > 0) updateNewsTicker(shuffleArray(all));
        else                 loadFallbackNews();
    });
}

function setupNewsTicker() {
    loadFallbackNews(); // immediate display

    setTimeout(() => {
        fetchCyberSecurityNews();
        setInterval(fetchCyberSecurityNews, 600_000);
    }, 150);

    document.addEventListener('visibilitychange', () => {
        const content = document.getElementById('news-ticker-content');
        if (document.hidden) {
            if (content && content._tickerRaf) {
                cancelAnimationFrame(content._tickerRaf);
                content._tickerRaf = null;
            }
        } else {
            startTickerAnimation();
        }
    });
}

/* ═══════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    $container           = document.getElementById('content');
    getUrl               = {};
    listeningForShortcut = false;

    // Theme
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', toggleTheme);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    themeSwitch.checked = savedTheme === 'light';

    // Background (before terminal mode check)
    setBackgroundBasedOnTime();

    // Restore terminal mode from sessionStorage
    if (sessionStorage.getItem('terminalMode') === 'true') {
        activateTerminalMode();
    }

    // Content — threat feed first, then link groups
    buildSearchIndex();
    fetchCISAFeed().then(() => {
        // groups appear after threat feed in DOM order
        setupGroups();
    });
    setInterval(fetchCISAFeed, 10 * 60 * 1000);

    // UI components
    setupWelcomeMessage();
    updateDateTime();
    fetchWeather();
    setupNewsTicker();
    setupCommandPalette();

    // Search bar expand/contract
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('focus', () => { searchInput.style.width = '90%'; });
    searchInput.addEventListener('blur',  () => {
        if (!searchInput.value) searchInput.style.width = '';
    });

    // Keyboard listeners
    document.addEventListener('keydown', globalKeyHandler, false);
    document.addEventListener('keyup',   shortcutListener, false);
});
