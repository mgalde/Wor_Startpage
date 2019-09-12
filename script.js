const NAME = "Michael";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format.
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab'

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Hacking",
        "items":[
            {"name": "Password Generator", "shortcutKey": "q", "url": "https://passwordsgenerator.net/"},
            {"name": "Micro Corruption", "shortcutKey": "w", "url": "https://microcorruption.com/login"},
            {"name": "Github", "shortcutKey": "e", "url": "https://github.com/mgalde"},
            {"name": "X86 Opp Codes", "shortcutKey": "r", "url": "http://ref.x86asm.net/coder32.html"},
            {"name": "Malware Runner", "shortcutKey": "t", "url": "https://app.any.run/"},
            {"name": "DNS Dumpster", "shortcutKey": "y", "url": "https://dnsdumpster.com/"},
            {"name": "SHODAN", "shortcutKey": "u", "url": "https://shodan.com/"}
        ]
    },
    {
        "groupName": "References",
        "items":[
            {"name": "NARI Home Page", "shortcutKey": "a", "url": "https://nari-cyber.com"},
            {"name": "ESTCP", "shortcutKey": "s", "url": "https://www.serdp-estcp.org/Tools-and-Training/Installation-Energy-and-Water/Cybersecurity"},
            {"name": "Infragard", "shortcutKey": "d", "url": "https://www.infragard.org/"},
            {"name": "FedBizzOpps", "shortcutKey": "f", "url": "https://www.fbo.gov/"},
            {"name": "Infographics Builder", "shortcutKey": "g", "url": "https://www.canva.com/create/infographics/"},
            {"name": "Meraki Management", "shortcutKey": "h", "url": "https://meraki.cisco.com/"}
        ]
    },
    {
        "groupName": "Important",
        "items":[
            {"name": "Time Card", "shortcutKey": "z", "url": "https://naricyber.tsheets.com/page/login"},
            {"name": "VSTS", "shortcutKey": "x", "url": "https://aex.dev.azure.com/me?mkt=en-US"},
            {"name": "Sharepoint", "shortcutKey": "c", "url": "https://unebraskanari.sharepoint.com/sites/team"},
            {"name": "Wordpress", "shortcutKey": "v", "url": "https://nari-cyber.com/wp-login.php"},
            {"name": "Hosting", "shortcutKey": "b", "url": "https://app.getflywheel.com/login"},
            {"name": "DNS Management", "shortcutKey": "n", "url": "https://domains.google.com/m/registrar/nari-cyber.com/dns?hl=en_US&authuser=1"},
            {"name": "Analytics Management", "shortcutKey": "m", "url": "https://analytics.google.com/analytics/web/?authuser=1"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
