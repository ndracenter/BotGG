global.owner = ["6285708391463"];
global.mods = ["6285708391463"]; // Moderator
global.prems = ["6285708391463"];
global.fsizedoc = "45000000000"; // default 10TB
global.fpagedoc = "19";
global.numberbot = "6282143136366";
global.menu = "button";
global.namedoc = "NdraCloudHost Bot Store Automatic";
global.nameowner = "NdraCloudHost";
global.nomorown = "6285708391463";
global.dana = "081252431605";
global.pulsa = "085708391463";
global.ovo = "-";
global.saweria = "https://saweria.co/NdraCloudHost";
global.namebot = "NdraCloudHost_Store";
global.sgc = "https://chat.whatsapp.com/It4wawspJqD4J8W25LGUhx";
global.sourceUrl = "https://whatsapp.com/channel/0029VagGg201Hsq0nTx2pV1H";
global.sig = "instagram.com/xyn.dra_";
global.swa = "wa.me/6287869975929";
global.gif = " "; //Ini buat gif yang di menu
global.icon = "https://a.uguu.se/bsTaWwgW.jpg";
global.thumb = "https://telegra.ph/file/6114b89ce52b7c925771d.jpg";
global.version = "1.0";
global.wm = "© NdraCloudHost 2021-2024";
global.watermark = wm;
global.lann = "p8ADYJib";
global.wm2 = "NdraCloudHost";
global.wm3 = namebot;
global.isPairing = true;
global.wm4 = namebot;
global.fla =
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
global.wait = "*[ PLEASE WAIT... ]*";
global.eror = "*[ SYSTEM ERROR ]*";
global.done = "```© NdraCloudHost 2021-2024```";
global.salah = "Salah\n";
global.web = global.sourceUrl;
global.APIs = {};
global.APIKeys = {};
global.packname = "[ STICKER BY NdraCloudHost ]";
global.author = ``;
global.domain = "";
global.apikey = "";

global.multiplier = 100;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      petFood: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

global.danied = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363144038483540@newsletter",
      newsletterName: "🟢 NdraCloudHost Automatic Store",
      serverMessageId: -1,
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `[ x ] Your Acces has Danied`,
      body: null,
      thumbnailUrl: "https://telegra.ph/file/02989972e9117495fe747.jpg",
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
};
let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});