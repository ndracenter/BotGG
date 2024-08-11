const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const fetch = require("node-fetch");
const os = require("os");
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory = totalMemory - freeMemory;
const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");


let menulist = async (m, { conn, usedPrefix, command, args }) => {
  const perintah = args[0] || "tags";
  const tagCount = {};
  const tagHelpMapping = {};
const user = global.db.data.users[m.sender] 


  Object.keys(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .forEach((plugin) => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach((tag) => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .map((plugin) => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      };
    });

  if (perintah === "tags") {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join(`\n│  ◦ ${usedPrefix + command} `);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let _mpt;
    if (process.send) {
      process.send("uptime");
      _mpt =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let mpt = clockString(_mpt);
    let name = m.pushName || conn.getName(m.sender);
    let prn = thumb;
    let fitur = Object.values(plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);
    let syaii = `${
      global.menu === "button"
        ? `Hai @${m.sender.split("@")[0]}
${namebot} Adalah sistem WhatsApp yang dikendalikan oleh robot secara otomatis yang dapat menjadi jembatan transaksi bagi kamu dan Owner Ku

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *Suntik Sosmed*, *Pembelian Akun Hosting*, *Server*, dan lainnya 

┌  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
└  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}

*® TEKAN BUTTON DI BAWAH UNTUK MELIHAT DAFTAR FITUR*`
        : `Hi @${m.sender.split("@")[0]}
${namebot} Adalah sistem WhatsApp yang dikendalikan oleh robot secara otomatis yang dapat menjadi jembatan transaksi bagi kamu dan Owner Ku

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *Suntik Sosmed*, *Pembelian Akun Hosting*, *Server*, dan lainnya 

┌  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
└  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}

┌  ◦ ${usedPrefix + command} all
│  ◦ ${usedPrefix + command} ${daftarTag}
└————`
    }

`;

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid.split("@")[0],
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: syaii,
          mimetype: "text/html",
          fileName: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I Y A N A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: `➳ *Please Waif...*`,
          mimetype: "text/html",
          fileName: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (global.menu === "button") {
      const list = Object.keys(tagCount);
      let array = [];
   for (let i of list) {
  array.push({
rows: [{
   headers: "🏷️ MENU " + i.toUpperCase(),
   title: `View List Category [ ${i.toUpperCase()} ]`,
   body: `*[ Category ${i} ]*`,
  command: `${usedPrefix + command} ${i}`
   }]
})
}
conn.sendList(m.chat,"Click Here", array, m, {
body: syaii,
url: thumb
})
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah]
      .map((helpItem, index) => {
        return `${helpItem}`;
      })
      .join("\n│  ◦ " + " ");
    let syaii = `┌  ◦ *📝 MENU ${perintah.toUpperCase()}*
│  ◦ ${daftarHelp}
└———
`;

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: syaii,
          mimetype: "text/html",
          fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(list),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I N A Y A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: `➳ *Please Waif...*`,
          mimetype: "text/html",
          fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (menu === "button") {
      conn.sendButton(m.chat,[["OWNER",".owner"],["INFO SCRIPT","sc"],["GROUP BOT","gcbot"]], m, {
      body: syaii,
      url: thumb
      })
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else if (perintah === "all") {
    let name = m.pushName || conn.getName(m.sender);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    const allTagsAndHelp = Object.keys(tagCount)
      .map((tag) => {
        const daftarHelp = tagHelpMapping[tag]
          .map((helpItem, index) => {
            return `${usedPrefix + helpItem}`;
          })
          .join("\n│  ◦ " + " ");
        return `┌  ◦ *MENU ${tag.toUpperCase()}*
│  ◦ ${daftarHelp}
└——
`;
      })
      .join("\n");
    let syaii = `🌟 Hi @${m.sender.split("@")[0]}
${namebot} Adalah sistem WhatsApp yang dikendalikan oleh robot secara otomatis yang dapat menjadi jembatan transaksi bagi kamu dan Owner Ku

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *Suntik Sosmed*, *Pembelian Akun Hosting*, *Server*, dan lainnya 

┌  ◦ *Name Bot :* ${namebot}
│  ◦ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ◦ *Total Chat:* ${Object.keys(conn.chats).length}
│  ◦ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ◦ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ◦ *Free Memory :* ${Func.formatSize(freeMemory)}
└  ◦ *Used Memory :* ${Func.formatSize(usedMemory)}

┌  ◦ *Name User :* ${m.name}
│  ◦ *Tag User :* @${m.sender.split("@")[0]}
│  ◦ *Limit User  :* ${user.limit}
│  ◦ *Premium :* ${user.premium ? "✓" : "x"}
└  ◦ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
${readMore}

${allTagsAndHelp}`;

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: syaii,
          mimetype: "text/html",
          fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I N A Y A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: `➳ *Please Waif...*`,
          mimetype: "text/html",
          fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© Shinaya-Bot [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (menu === "button") { 
     conn.sendButton(m.chat,[["OWNER",".owner"],["INFO SCRIPT","sc"],["GROUP BOT","gcbot"]], m, {
      body: syaii,
      url: thumb
      })
    } else {
      conn.sendMessage(
        m.chat,
        {
          text: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© NdraCloudHost [ ver ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    }
  } else {
    await conn.reply(
      m.chat,
      `*[ MENU ${perintah.toUpperCase()} NOT FOUND ]*\n> • _Ketik *.menu* untuk melihat semua kategori menu atau keitk *.menu all* untuk melihat semua fitur_`,
      m,
    );
  }
};

menulist.help = ["menu"].map((a) => a + " *[view main menu]*");
menulist.tags = ["main"];
menulist.command = ["menu"];

module.exports = menulist;

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}