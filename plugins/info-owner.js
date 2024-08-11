let handler = async (m, { conn, text, usedPrefix, command }) => {
  let nomor = global.owner;
  let array = [];
  for (let i of nomor) {
    let jid = await (await conn.onWhatsApp(i))[0].jid;
    let nama = await conn.getName(i + "@s.whatsapp.net");
    array.push([i, nama]);
  }
  let caption = `*[ BERIKUT ADALAH OWNER SAYA ]*
${global.owner.map((a, i) => `*${i + 1}.* @` + a + " *[" + " " + conn.getName(a + "@s.whatsapp.net") + "]*").join("\n")}

*[ INFORMATION ]*
> • _Jangan Spam nomor Owner *[ Sanksi Blokir ]*_
> • _Jangan Call Nomor Owner *[ Sanksi Blokir ]*_`;

  let reply = await conn.sendContact(m.chat, array, m);
  await conn.sendMessage(
    m.chat,
    { text: caption, mentions: conn.parseMention(caption) },
    { quoted: reply },
  );
};
handler.help = ["owner", "creator"].map((a) => a + " *[Contact Owner]*");
handler.tags = ["info"];
handler.command = ["owner", "creator"];

module.exports = handler;
