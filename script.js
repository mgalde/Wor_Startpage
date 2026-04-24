/* ═══════════════════════════════════════════════════════════════════
   ACIREMA // DASHBOARD — script.js
   ═══════════════════════════════════════════════════════════════════ */

const SHORTCUT_STARTER = 'tab';
const SHORTCUT_TIMEOUT = 1500;

// ─── Link Map ─────────────────────────────────────────────────────────
const MASTER_MAP = [
    {
        groupName: "OSINT",
        category:  "security",
        items: [
            { name: "Bleeping Computer",  shortcutKey: "q", url: "https://www.bleepingcomputer.com/" },
            { name: "Dark Reading",       shortcutKey: "w", url: "https://www.darkreading.com/" },
            { name: "Krebs on Security",  shortcutKey: "e", url: "https://krebsonsecurity.com/" },
            { name: "SANS ISC",           shortcutKey: "r", url: "https://isc.sans.edu/" }
        ]
    },
    {
        groupName: "News",
        category:  "news",
        items: [
            { name: "NY Times",           shortcutKey: "t", url: "https://www.nytimes.com/" },
            { name: "KOLD News 13",       shortcutKey: "y", url: "https://www.kold.com/" },
            { name: "KVOA News 4",        shortcutKey: "u", url: "https://kvoa.com/" },
            { name: "KGUN 9",             shortcutKey: "p", url: "https://www.kgun9.com/" },
            { name: "Arizona Daily Star", shortcutKey: "o", url: "https://tucson.com/" },
            { name: "AZFamily",           shortcutKey: "i", url: "https://www.azfamily.com/" }
        ]
    },
    {
        groupName: "References",
        category:  "references",
        items: [
            { name: "InfraGard",          shortcutKey: "a", url: "https://www.infragard.org/" },
            { name: "MITRE ATT&CK",       shortcutKey: "s", url: "https://attack.mitre.org/" },
            { name: "NIST NVD",           shortcutKey: "d", url: "https://nvd.nist.gov/" },
            { name: "CVE.org",            shortcutKey: "f", url: "https://www.cve.org/" },
            { name: "Exploit-DB",         shortcutKey: "g", url: "https://www.exploit-db.com/" },
            { name: "NIST CSF",           shortcutKey: "h", url: "https://www.nist.gov/cyberframework" }
        ]
    },
    {
        groupName: "University",
        category:  "university",
        items: [
            { name: "InfoSci SharePoint", shortcutKey: "z", url: "https://emailarizona.sharepoint.com/sites/InfoSci" },
            { name: "UA VITAE",           shortcutKey: "x", url: "https://uavitae.arizona.edu/" },
            { name: "UA Access",          shortcutKey: "c", url: "https://uaccess.arizona.edu/" },
            { name: "D2L",                shortcutKey: "v", url: "https://d2l.arizona.edu/d2l/home" },
            { name: "Academic Calendar",  shortcutKey: "b", url: "https://catalog.arizona.edu/academic-calendar" },
            { name: "GenAI Arizona",      shortcutKey: "n", url: "https://genai.arizona.edu/" },
            { name: "Coursebook Adopt.",  shortcutKey: "m", url: "https://shop.arizona.edu/faculty" },
            { name: "TopHat",             shortcutKey: ",", url: "https://app.tophat.com/" }
        ]
    },
    {
        groupName: "Tools",
        category:  "tools",
        items: [
            { name: "Claude AI",          shortcutKey: "1", url: "https://claude.ai/" },
            { name: "ChatGPT",            shortcutKey: "2", url: "https://chat.openai.com/" },
            { name: "Gemini",             shortcutKey: "3", url: "https://gemini.google.com/" },
            { name: "Shodan",             shortcutKey: "4", url: "https://www.shodan.io/" },
            { name: "VirusTotal",         shortcutKey: "5", url: "https://www.virustotal.com/" },
            { name: "Any.Run",            shortcutKey: "6", url: "https://app.any.run/" },
            { name: "Binary Ninja Cloud", shortcutKey: "7", url: "https://cloud.binary.ninja/" },
            { name: "DNS Dumpster",       shortcutKey: "8", url: "https://dnsdumpster.com/" }
        ]
    },
    {
        groupName: "Connections",
        category:  "social",
        items: [
            { name: "Bluesky",            shortcutKey: "j", url: "https://bsky.app/" },
            { name: "Reddit",             shortcutKey: "k", url: "https://www.reddit.com/" },
            { name: "YouTube",            shortcutKey: "l", url: "https://www.youtube.com/" },
            { name: "LinkedIn",           shortcutKey: ";", url: "https://www.linkedin.com/" },
            { name: "GitHub",             shortcutKey: "'", url: "https://github.com/" }
        ]
    },
    {
        groupName: "CTF & Labs",
        category:  "ctf",
        items: [
            { name: "Hack The Box",        shortcutKey: "9", url: "https://www.hackthebox.com/" },
            { name: "TryHackMe",           shortcutKey: "0", url: "https://tryhackme.com/" },
            { name: "PicoCTF",             shortcutKey: "`", url: "https://picoctf.org/" },
            { name: "PortSwigger Academy", shortcutKey: "=", url: "https://portswigger.net/web-security" },
            { name: "Blue Team Labs",      shortcutKey: "",  url: "https://blueteamlabs.online/" }
        ]
    },
    {
        groupName: "Research",
        category:  "research",
        items: [
            { name: "arXiv · Security",    shortcutKey: "-", url: "https://arxiv.org/list/cs.CR/recent" },
            { name: "Google Scholar",      shortcutKey: "[", url: "https://scholar.google.com/" },
            { name: "IEEE Xplore",         shortcutKey: "]", url: "https://ieeexplore.ieee.org/" },
            { name: "USENIX",              shortcutKey: "\\",url: "https://www.usenix.org/" },
            { name: "ACM Digital Library", shortcutKey: "",  url: "https://dl.acm.org/" }
        ]
    },
    {
        groupName: "Privacy & OPSEC",
        category:  "opsec",
        items: [
            { name: "Privacy Guides",  shortcutKey: ".", url: "https://www.privacyguides.org/" },
            { name: "HaveIBeenPwned",  shortcutKey: "",  url: "https://haveibeenpwned.com/" },
            { name: "EFF",             shortcutKey: "",  url: "https://www.eff.org/" },
            { name: "ProtonMail",      shortcutKey: "",  url: "https://mail.proton.me/" },
            { name: "Tor Project",     shortcutKey: "",  url: "https://www.torproject.org/" }
        ]
    },
    {
        groupName: "Developer",
        category:  "dev",
        items: [
            { name: "Stack Overflow",  shortcutKey: "", url: "https://stackoverflow.com/" },
            { name: "DevDocs",         shortcutKey: "", url: "https://devdocs.io/" },
            { name: "CyberChef",       shortcutKey: "", url: "https://gchq.github.io/CyberChef/" },
            { name: "Regex101",        shortcutKey: "", url: "https://regex101.com/" },
            { name: "ExplainShell",    shortcutKey: "", url: "https://explainshell.com/" }
        ]
    }
];

// ─── Runtime State ────────────────────────────────────────────────────
let getUrl               = {};
let $shortcutDisplayList;
let listeningForShortcut = false;
let listenerTimeout;
let commandPaletteOpen   = false;
let paletteResults       = [];
let selectedPaletteIndex = -1;
let searchIndex          = [];
let terminalMode         = false;
let spaceXCountdownTimer = null;

/* ═══════════════════════════════════════════════════════════════════
   1. BACKGROUND CANVAS
   ═══════════════════════════════════════════════════════════════════ */

function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H;
    const N    = 72;
    const DIST = 130;
    const pts  = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        pts.forEach(p => {
            if (p.x > W) p.x = Math.random() * W;
            if (p.y > H) p.y = Math.random() * H;
        });
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < N; i++) {
        pts.push({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            r:  Math.random() * 1.2 + 0.3
        });
    }

    function getColors() {
        const h    = new Date().getHours();
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';

        if (!dark) {
            return { from: '#dbeafe', to: '#eff6ff', dot: 'rgba(59,130,246,0.35)', line: '59,130,246' };
        }

        if (h >= 5 && h < 8)  return { from: '#08050f', to: '#140a1c', dot: 'rgba(180,100,255,0.45)', line: '160,90,255' };
        if (h >= 8 && h < 17) return { from: '#030b1a', to: '#051628', dot: 'rgba(0,200,255,0.4)',    line: '0,200,255' };
        if (h >= 17 && h < 21) return { from: '#0b0814', to: '#100c20', dot: 'rgba(130,90,255,0.42)', line: '120,80,255' };
        return                        { from: '#020810', to: '#040c18', dot: 'rgba(0,160,255,0.32)',    line: '0,150,255' };
    }

    function draw() {
        const c = getColors();
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, c.from);
        g.addColorStop(1, c.to);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        pts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });

        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < DIST) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(${c.line},${(1 - d / DIST) * 0.18})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }

        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = c.dot;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* ═══════════════════════════════════════════════════════════════════
   2. MOTD — tech-themed, time/season/day-aware
   ═══════════════════════════════════════════════════════════════════ */

const MOTD = {
    earlyMorning: {
        weekday: [
            "Boot sequence complete. No critical alerts overnight. Begin.",
            "Pre-dawn window. Optimal signal-to-noise ratio. Use it.",
            "Attackers don't observe business hours. You're already ahead.",
            "The network logs accumulated while you were offline.",
            "Before the noise starts. This is the window.",
            "0500 hrs. Stack trace from yesterday: address it first."
        ],
        monday: [
            "New week, fresh attack surface. Enumerate accordingly.",
            "Monday pre-dawn. Week threat model: initialize.",
            "Configuration drift accrues over weekends. Check it."
        ],
        weekend: [
            "Weekend early boot. No standups. Just signal.",
            "The network doesn't respect weekends. Smart of you.",
            "Quiet hours. Optimal time for deep work and deep packets."
        ]
    },
    morning: {
        weekday: [
            "New CVEs published while you slept. Triage pending.",
            "Coffee loaded. Threat model reviewed. Systems nominal.",
            "The attack surface is unchanged. Your awareness should be sharper.",
            "Patch Tuesday approaches. Inventory your exposure.",
            "New day. The adversary already has a plan. Do you?",
            "Morning. What's your threat model for the next eight hours?"
        ],
        monday: [
            "New week. What's your threat model for the next five days?",
            "Monday initialized. Every incident this week starts with today.",
            "Week loaded. Carry over only what's worth carrying."
        ],
        friday: [
            "Friday. No deployments without a rollback plan. Non-negotiable.",
            "End-of-week push. Ship nothing you can't un-ship.",
            "Friday morning. Whatever you break today, you fix today."
        ],
        weekend: [
            "Weekend access. No Jira tickets. Just work.",
            "Saturday morning. The best debugging happens here.",
            "No standup. No blockers. The terminal is yours."
        ]
    },
    midday: {
        weekday: [
            "Midday. Peak phishing delivery window. Stay calibrated.",
            "Half the workday elapsed. Threat landscape: unchanged.",
            "Entropy increases. So does your patch backlog.",
            "Midday check. Logs reviewed. Incidents triaged. Carry on.",
            "12:00 UTC. Nation-state actors: clocking in."
        ],
        weekend: [
            "Midday weekend. The attack surface doesn't observe Sundays.",
            "Afternoon loading. Systems nominal.",
            "Half the day. The terminal has been patient."
        ]
    },
    afternoon: {
        weekday: [
            "Post-lunch cognitive dip is a real attack vector. Compensate.",
            "SOC activity peaks in the afternoon. So does the noise.",
            "The work you finish today is the incident you prevent tomorrow.",
            "Four hours left. Use them like the threat is already inside.",
            "Afternoon. Don't let the slump be the adversary's advantage."
        ],
        friday: [
            "Friday afternoon. No force pushes to production. Ever.",
            "End of week. What's your Friday failure mode?",
            "Almost there. Don't merge technical debt with your features."
        ],
        weekend: [
            "Weekend afternoon. Rest is a force multiplier. Or keep hacking.",
            "No deadline, no manager. What are you actually building?",
            "Afternoon. The best open-source contributions happen here."
        ]
    },
    evening: {
        weekday: [
            "Day complete. What did the adversary attempt while you worked?",
            "Evening threat brief: vulnerabilities discovered today — many.",
            "The SIEM is still watching. Are you?",
            "Close out clean. Document what you broke. Fix it tomorrow.",
            "End of operational day. Logging off shouldn't stop the monitoring."
        ],
        weekend: [
            "Evening. The best research sessions start right here.",
            "Weekend wind-down. Or it's just getting interesting.",
            "Late afternoon light. The terminal is still warm."
        ]
    },
    night: {
        weekday: [
            "Most APT activity occurs after business hours. Be aware.",
            "Late night. Either you're dedicated, or there's an incident.",
            "Night shift: where caffeine meets kernel modules.",
            "0-dark-something. The packet captures are clean. Keep going.",
            "After-hours access. The audit log sees everything. That's fine."
        ],
        weekend: [
            "Weekend night mode. The interesting vulnerabilities live here.",
            "Night owl. The attack surface never looked this clear.",
            "Late night, no constraints. What are you building?"
        ]
    },
    lateNight: {
        any: [
            "It's that late. Hydrate, then ship.",
            "SIGTERM not received. Process continues.",
            "The dark web doesn't observe business hours. Neither do you.",
            "Sleep is a security risk only if deferred indefinitely.",
            "0200 hrs. The threat actors are clocking in. You never left.",
            "Late-night kernel panic: caffeine. Root cause: stubbornness.",
            "After midnight. The logs see everything. That's fine."
        ]
    }
};

function getSeason() {
    const m = new Date().getMonth();
    if (m >= 2 && m <= 4)  return 'Spring';
    if (m >= 5 && m <= 7)  return 'Summer';
    if (m >= 8 && m <= 10) return 'Fall';
    return 'Winter';
}

function getTimeSlot() {
    const h = new Date().getHours();
    if (h >= 5  && h < 8)  return ['earlyMorning', 'Pre-Dawn'];
    if (h >= 8  && h < 12) return ['morning',      'Morning'];
    if (h >= 12 && h < 14) return ['midday',        'Midday'];
    if (h >= 14 && h < 18) return ['afternoon',     'Afternoon'];
    if (h >= 18 && h < 22) return ['evening',       'Evening'];
    if (h >= 22)            return ['night',         'Night'];
    return ['lateNight', 'Late Night'];
}

function getDayType() {
    const d    = new Date().getDay();
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (d === 0) return ['weekend', 'Sunday'];
    if (d === 1) return ['monday',  'Monday'];
    if (d === 5) return ['friday',  'Friday'];
    if (d === 6) return ['weekend', 'Saturday'];
    return ['weekday', DAYS[d]];
}

function setupMOTD() {
    const [slotKey, slotLabel] = getTimeSlot();
    const [dayKey,  dayLabel]  = getDayType();
    const season = getSeason();

    const pool = MOTD[slotKey];
    const msgs = pool[dayKey] || pool.weekday || pool.any || ['Systems nominal.'];
    const msg  = msgs[Math.floor(Math.random() * msgs.length)];

    const el = document.getElementById('motd-text');
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('visible'));

    document.getElementById('motd-context').textContent =
        `${slotLabel}  ·  ${season}  ·  ${dayLabel}`;
}

/* ═══════════════════════════════════════════════════════════════════
   3. CLOCK / DATE
   ═══════════════════════════════════════════════════════════════════ */

function updateDateTime() {
    const now = new Date();
    const hh  = now.getHours().toString().padStart(2, '0');
    const mm  = now.getMinutes().toString().padStart(2, '0');
    const ss  = now.getSeconds().toString().padStart(2, '0');

    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');

    if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });

    setTimeout(updateDateTime, 1000);
}

/* ═══════════════════════════════════════════════════════════════════
   4. WEATHER — NWS API, Tucson AZ
   ═══════════════════════════════════════════════════════════════════ */

function fetchWeather() {
    const lat = 32.253460, lon = -110.911789;
    fetch(`https://api.weather.gov/points/${lat},${lon}`)
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(d => fetch(d.properties.forecast))
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(fd => {
            const cur  = fd.properties.periods[0];
            const desc = cur.shortForecast.toLowerCase();

            let icon = '🌡️';
            if (desc.includes('sunny') || desc.includes('clear'))        icon = '☀️';
            else if (desc.includes('partly'))                             icon = '🌤️';
            else if (desc.includes('cloud') || desc.includes('overcast')) icon = '☁️';
            else if (desc.includes('rain') || desc.includes('shower'))    icon = '🌧️';
            else if (desc.includes('snow'))                               icon = '❄️';
            else if (desc.includes('storm') || desc.includes('thunder'))  icon = '⛈️';
            else if (desc.includes('fog'))                                icon = '🌫️';
            else if (desc.includes('wind'))                               icon = '💨';

            document.getElementById('weather-icon').textContent = icon;
            document.getElementById('weather-temp').textContent = `${cur.temperature}°${cur.temperatureUnit}`;
            document.getElementById('weather-desc').textContent = cur.shortForecast;

            const wind = document.getElementById('weather-wind');
            if (cur.windSpeed) {
                wind.textContent = `${cur.windDirection || ''} ${cur.windSpeed}`.trim();
            }
        })
        .catch(() => {
            document.getElementById('weather-temp').textContent = '--°F';
            document.getElementById('weather-desc').textContent = 'Unavailable';
        });

    setTimeout(fetchWeather, 30 * 60 * 1000);
}

/* ═══════════════════════════════════════════════════════════════════
   5. SPACEX LAUNCH TRACKER
   ═══════════════════════════════════════════════════════════════════ */

async function fetchSpaceXLaunch() {
    const missionEl    = document.getElementById('spacex-mission');
    const providerEl   = document.getElementById('spacex-provider');
    const countdownEl  = document.getElementById('spacex-countdown');
    const locationEl   = document.getElementById('spacex-location');
    const visibilityEl = document.getElementById('spacex-visibility');

    try {
        // The Space Devs Launch Library 2 — includes pad location in the response
        const res = await fetch(
            'https://ll.thespacedevs.com/2.0.0/launch/upcoming/?lsp__name=SpaceX&ordering=net&limit=5&format=json'
        );
        if (!res.ok) throw new Error(`LL2 HTTP ${res.status}`);
        const data = await res.json();

        if (!data.results?.length) {
            missionEl.textContent   = 'No launches scheduled';
            providerEl.textContent  = '';
            countdownEl.textContent = '';
            locationEl.textContent  = '';
            visibilityEl.textContent = '';
            return;
        }

        const next = data.results[0];

        missionEl.textContent  = next.name || 'Unknown Mission';
        providerEl.textContent = next.launch_service_provider?.name || 'SpaceX';

        const padName  = next.pad?.name || '';
        const locName  = next.pad?.location?.name || '';
        locationEl.textContent = [padName, locName].filter(Boolean).join(' · ');

        const isVandenberg = locName.toLowerCase().includes('vandenberg');
        visibilityEl.textContent = isVandenberg ? '⬡ May be visible from Southern AZ' : '';

        // Show launch status if not confirmed (TBD / TBC / Hold)
        const statusAbbrev = next.status?.abbrev || '';
        const launchMs     = new Date(next.net).getTime();

        startSpaceXCountdown(launchMs, statusAbbrev);

    } catch (_) {
        missionEl.textContent   = 'Launch data unavailable';
        providerEl.textContent  = '';
        countdownEl.textContent = '';
        locationEl.textContent  = '';
        visibilityEl.textContent = '';
    }
}

function startSpaceXCountdown(launchMs, statusAbbrev) {
    if (spaceXCountdownTimer) clearInterval(spaceXCountdownTimer);

    const el = document.getElementById('spacex-countdown');
    if (!el) return;

    const uncertain = statusAbbrev === 'TBD' || statusAbbrev === 'TBC';
    const prefix    = uncertain ? 'NET ' : 'T- ';

    function tick() {
        const diff = launchMs - Date.now();
        if (diff <= 0) {
            el.textContent = 'LAUNCH OCCURRED';
            el.style.color = 'var(--red)';
            clearInterval(spaceXCountdownTimer);
            setTimeout(fetchSpaceXLaunch, 90_000);
            return;
        }

        const d  = Math.floor(diff / 86400000);
        const h  = Math.floor((diff % 86400000) / 3600000);
        const m  = Math.floor((diff % 3600000) / 60000);
        const s  = Math.floor((diff % 60000) / 1000);

        el.textContent = `${prefix}${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
        el.style.color = diff < 3600000 ? 'var(--red)' : diff < 86400000 ? 'var(--amber)' : 'var(--accent)';
    }

    tick();
    spaceXCountdownTimer = setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════════════════════
   6. THREAT INTEL FEED — GitHub Security Advisories
   ═══════════════════════════════════════════════════════════════════ */

async function fetchThreatFeed() {
    const itemsEl = document.getElementById('threat-feed-items');
    if (!itemsEl) return;

    try {
        const res = await fetch(
            'https://api.github.com/advisories?per_page=8&sort=published&direction=desc&type=reviewed',
            { headers: { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } }
        );
        if (!res.ok) throw new Error();
        const advisories = await res.json();

        itemsEl.innerHTML = '';

        advisories.forEach(adv => {
            const row = document.createElement('a');
            row.className = 'threat-row';
            row.href      = adv.html_url;
            row.target    = '_blank';
            row.rel       = 'noopener noreferrer';

            const badge = document.createElement('span');
            badge.className   = 'cve-badge';
            badge.textContent = adv.cve_id || adv.ghsa_id;

            const pkg    = adv.vulnerabilities?.[0]?.package;
            const vendor = document.createElement('span');
            vendor.className   = 'threat-vendor';
            vendor.textContent = pkg ? `${pkg.ecosystem} / ${pkg.name}` : adv.ghsa_id;

            const name = document.createElement('span');
            name.className   = 'threat-name';
            name.textContent = adv.summary;

            const date = document.createElement('span');
            date.className   = 'threat-date';
            date.textContent = adv.published_at?.slice(0, 10) || '';

            row.append(badge, vendor, name, date);
            itemsEl.appendChild(row);
        });

    } catch (_) {
        if (itemsEl) {
            itemsEl.innerHTML = '<div class="feed-unavailable">FEED UNAVAILABLE</div>';
        }
    }
}

/* ═══════════════════════════════════════════════════════════════════
   7. INTEL NEWS FEED — rss2json
   ═══════════════════════════════════════════════════════════════════ */

const NEWS_SOURCES = [
    { name: 'Bleeping Computer', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/', limit: 4 },
    { name: 'Dark Reading',      url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml',   limit: 4 },
    { name: 'Krebs on Security', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://krebsonsecurity.com/feed/',     limit: 3 },
    { name: 'Ars Technica',      url: 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.arstechnica.com/arstechnica/index', limit: 3 },
    { name: 'NY Times Tech',     url: 'https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', limit: 2 }
];

function relTime(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h >= 24) return `${Math.floor(h / 24)}d ago`;
    if (h > 0)   return `${h}h ago`;
    if (m > 0)   return `${m}m ago`;
    return 'just now';
}

async function fetchNewsFeed() {
    const itemsEl = document.getElementById('news-feed-items');
    if (!itemsEl) return;

    let items = [];

    await Promise.allSettled(
        NEWS_SOURCES.map(async src => {
            try {
                const res  = await fetch(src.url);
                const data = await res.json();
                if (data.status === 'ok') {
                    data.items.slice(0, src.limit).forEach(item => {
                        items.push({ title: item.title, link: item.link, source: src.name, pubDate: item.pubDate });
                    });
                }
            } catch (_) {}
        })
    );

    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    items = items.slice(0, 14);

    itemsEl.innerHTML = '';

    if (!items.length) {
        itemsEl.innerHTML = '<span class="feed-loading">No articles available</span>';
        return;
    }

    items.forEach(item => {
        const row = document.createElement('a');
        row.className = 'news-row';
        row.href      = item.link;
        row.target    = '_blank';
        row.rel       = 'noopener noreferrer';

        const badge = document.createElement('span');
        badge.className   = 'news-source-badge';
        badge.textContent = item.source;

        const title = document.createElement('span');
        title.className   = 'news-title';
        title.textContent = item.title;

        const time = document.createElement('span');
        time.className   = 'news-time';
        time.textContent = relTime(item.pubDate);

        row.append(badge, title, time);
        itemsEl.appendChild(row);
    });
}

/* ═══════════════════════════════════════════════════════════════════
   8. LINK GROUPS
   ═══════════════════════════════════════════════════════════════════ */

function buildSearchIndex() {
    searchIndex = [];
    MASTER_MAP.forEach(group => {
        group.items.forEach(item => {
            searchIndex.push({
                name:      item.name,
                url:       item.url,
                groupName: group.groupName,
                category:  group.category
            });
        });
    });
}

function setupGroups() {
    const grid = document.getElementById('links-grid');
    grid.querySelectorAll('.link-card[data-generated]').forEach(el => el.remove());
    getUrl = {};

    MASTER_MAP.forEach(grpData => {
        const card = document.createElement('div');
        card.className = 'card link-card';
        card.setAttribute('data-generated', 'true');
        card.setAttribute('data-category', grpData.category);
        grid.appendChild(card);

        const label = document.createElement('div');
        label.className   = 'card-label';
        label.textContent = `// ${grpData.groupName.toUpperCase()}`;
        card.appendChild(label);

        grpData.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'link-row';
            card.appendChild(row);

            const link = document.createElement('a');
            link.textContent = item.name;
            link.href        = item.url;
            link.target      = '_blank';
            link.rel         = 'noopener noreferrer';
            row.appendChild(link);

            const sc = document.createElement('span');
            sc.textContent = item.shortcutKey;
            sc.className   = 'shortcut';
            sc.style.animation = 'none';
            row.appendChild(sc);

            getUrl[item.shortcutKey] = item.url;
        });
    });

    $shortcutDisplayList = document.getElementsByClassName('shortcut');
}

/* ═══════════════════════════════════════════════════════════════════
   9. KEYBOARD SHORTCUTS (Tab + key)
   ═══════════════════════════════════════════════════════════════════ */

function shortcutListener(e) {
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

        for (let i = 0; i < $shortcutDisplayList.length; i++) {
            $shortcutDisplayList[i].style.animation = 'none';
            // Force reflow
            void $shortcutDisplayList[i].offsetWidth;
            $shortcutDisplayList[i].style.animation = '';
        }

        listenerTimeout = setTimeout(() => { listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

/* ═══════════════════════════════════════════════════════════════════
   10. THEME
   ═══════════════════════════════════════════════════════════════════ */

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const btn = document.getElementById('theme-btn');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀' : '☾';
        btn.title       = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

/* ═══════════════════════════════════════════════════════════════════
   11. COMMAND PALETTE
   ═══════════════════════════════════════════════════════════════════ */

function openCommandPalette() {
    commandPaletteOpen = true;
    const overlay = document.getElementById('command-palette-overlay');
    overlay.classList.add('active');
    const input = document.getElementById('command-palette-input');
    input.value = '';
    selectedPaletteIndex = -1;
    renderPaletteResults('');
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
    paletteResults = q === ''
        ? searchIndex
        : searchIndex.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.groupName.toLowerCase().includes(q) ||
            item.url.toLowerCase().includes(q)
        );

    selectedPaletteIndex = paletteResults.length > 0 ? 0 : -1;
    const container = document.getElementById('command-palette-results');
    container.innerHTML = '';

    if (!paletteResults.length) {
        const empty = document.createElement('div');
        empty.className   = 'palette-empty';
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
        name.className   = 'palette-link-name';
        name.textContent = item.name;

        const urlSpan = document.createElement('span');
        urlSpan.className = 'palette-link-url';
        try { urlSpan.textContent = new URL(item.url).hostname; }
        catch (_) { urlSpan.textContent = item.url; }

        row.append(badge, name, urlSpan);
        row.addEventListener('click', () => {
            window.open(item.url, '_blank', 'noopener,noreferrer');
            closeCommandPalette();
        });
        container.appendChild(row);
    });
}

function navigatePalette(dir) {
    if (!paletteResults.length) return;
    const rows = document.getElementById('command-palette-results').querySelectorAll('.palette-result');
    if (rows[selectedPaletteIndex]) {
        rows[selectedPaletteIndex].classList.remove('selected');
        rows[selectedPaletteIndex].setAttribute('aria-selected', 'false');
    }
    selectedPaletteIndex = Math.max(0, Math.min(paletteResults.length - 1, selectedPaletteIndex + dir));
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
    input.addEventListener('input', () => renderPaletteResults(input.value));
    document.getElementById('command-palette-overlay').addEventListener('click', e => {
        if (e.target === document.getElementById('command-palette-overlay')) closeCommandPalette();
    });
}

/* ═══════════════════════════════════════════════════════════════════
   12. GLOBAL KEY HANDLER
   ═══════════════════════════════════════════════════════════════════ */

function globalKeyHandler(e) {
    if (e.ctrlKey && e.key === '\\') {
        e.preventDefault();
        toggleTerminalMode();
        return;
    }

    if (e.key === 'Escape') {
        if (commandPaletteOpen)  closeCommandPalette();
        else if (terminalMode)   deactivateTerminalMode();
        return;
    }

    if (commandPaletteOpen) {
        if (e.key === 'ArrowDown') { e.preventDefault(); navigatePalette(1);  return; }
        if (e.key === 'ArrowUp')   { e.preventDefault(); navigatePalette(-1); return; }
        if (e.key === 'Enter')     { e.preventDefault(); openSelectedResult(); return; }
        return;
    }

    const tag = document.activeElement.tagName.toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        openCommandPalette();
    }
}

/* ═══════════════════════════════════════════════════════════════════
   13. TERMINAL MODE  (Ctrl+\)
   ═══════════════════════════════════════════════════════════════════ */

function activateTerminalMode() {
    terminalMode = true;
    document.body.classList.add('terminal-mode');
    const wt = document.getElementById('wordmark-text');
    if (wt) wt.textContent = '[root@acirema ~]$';
    sessionStorage.setItem('terminalMode', 'true');
}

function deactivateTerminalMode() {
    terminalMode = false;
    document.body.classList.remove('terminal-mode');
    const wt = document.getElementById('wordmark-text');
    if (wt) wt.textContent = 'ACIREMA';
    sessionStorage.removeItem('terminalMode');
}

function toggleTerminalMode() {
    if (terminalMode) deactivateTerminalMode();
    else              activateTerminalMode();
}

/* ═══════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);

    // Background canvas
    initBackground();

    // Terminal mode restore
    if (sessionStorage.getItem('terminalMode') === 'true') activateTerminalMode();

    // Link grid
    buildSearchIndex();
    setupGroups();

    // Hero widgets
    setupMOTD();
    updateDateTime();
    fetchWeather();
    fetchSpaceXLaunch();

    // Live feeds
    fetchThreatFeed();
    fetchNewsFeed();

    // Periodic refresh
    setInterval(fetchThreatFeed,      10 * 60 * 1000);
    setInterval(fetchNewsFeed,        10 * 60 * 1000);
    setInterval(fetchSpaceXLaunch,    60 * 60 * 1000);

    // Command palette
    setupCommandPalette();

    // Keyboard
    document.addEventListener('keydown', globalKeyHandler, false);
    document.addEventListener('keyup',   shortcutListener,  false);
});
