let fs = require("fs");
let handler = async (m, { conn, args, command }) => {
  let fitur = Object.values(plugins)
    .filter((v) => v.help && !v.disabled)
    .map((v) => v.help)
    .flat(1);
  let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags,
  ).length;
  let hasil = fitur.length;
  conn.sendButton(m.chat,[["BACK TO MENU",".menu"],["INFO SCRIPT",".sc"],["GROUP BOT",".gcbot"]], m, {
  footer: `akiraa has a total of features: *[ ${hasil} ]*`
  })
};
handler.help = ["totalfitur"].map((a) => a + " *[get total features]*");
handler.tags = ["info"];
handler.command = ["totalfitur"];
module.exports = handler;