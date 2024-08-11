const axios = require('axios');
const FormData = require('form-data');
const md5 = require('md5');
const { exec } = require('child_process');
const { promisify } = require('util');
const config = require('../configserver.js');
const paydisiniApiKey = '10db6cfb0271596c9d87053ab96e609d';
const execPromise = promisify(exec);

async function createTransaction(uniqueCode, amount, note, validTime) {
  let data = new FormData();
  const signature = md5(paydisiniApiKey + uniqueCode + '17' + amount + validTime + 'NewTransaction');

  data.append('key', paydisiniApiKey);
  data.append('request', 'new');
  data.append('unique_code', uniqueCode);
  data.append('service', '17');
  data.append('amount', amount);
  data.append('note', note);
  data.append('valid_time', validTime);
  data.append('type_fee', '1');
  data.append('signature', signature);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://paydisini.co.id/api/',
    headers: { 
      ...data.getHeaders()
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log('Create Transaction Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Creating Transaction:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function checkTransactionStatus(uniqueCode) {
  let data = new FormData();
  const signature = md5(paydisiniApiKey + uniqueCode + 'StatusTransaction');

  data.append('key', paydisiniApiKey);
  data.append('request', 'status');
  data.append('unique_code', uniqueCode);
  data.append('signature', signature);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://paydisini.co.id/api/',
    headers: { 
      ...data.getHeaders()
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log('Check Transaction Status Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Checking Transaction Status:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function createWhmAccount(domain, package, user) {
  const apiConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.ndracloudhost.my.id/api/whm/create.php?server=${config.server}&userwhm=${config.userwhm}&passwhm=${config.passwhm}&domain=${domain}&package=${package}&user=${user}&apikey=${config.apikey}`,
    headers: {}
  };

  try {
    const response = await axios(apiConfig);
    console.log('Create WHM Account Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error Creating WHM Account:', error.response ? error.response.data : error.message);
    return { status: 'Gagal', code: 500, message: 'Terjadi kesalahan dalam pembuatan akun.' };
  }
}

async function deleteMessage(chatId, messageId) {
  try {
    await conn.sendMessage(chatId, { delete: { id: messageId } });
    console.log('Pesan berhasil dihapus');
  } catch (error) {
    console.error('Gagal menghapus pesan:', error);
  }
}

let handler = async (m, { conn, command, args }) => {
  if (args.length < 3) {
    return conn.reply(m.chat, '```[#] .buywhm <domain> <package> <user>```', m);
  }

  const [domain, packageOption, user] = args;
  const packageAmounts = {
    '1': { name: 'Whm Mini', amount: 25000 },
    '2': { name: 'Mwhm Mini', amount: 45000 },
    '3': { name: 'cPanel Mini', amount: 75000 }
  };

  const selectedPackage = packageAmounts[packageOption];
  if (!selectedPackage) {
    return conn.reply(m.chat, 'Paket tidak dikenali. Pilih dari 1-15.', m);
  }

  const uniqueCode = `whm-${Date.now()}`;
  const note = `Pembelian WHM untuk ${user}`;
  const validTime = 1800;

  try {
    const transaction = await createTransaction(uniqueCode, selectedPackage.amount, note, validTime);
    if (transaction.success) {
      const qrCodeImage = transaction.data.qrcode_url;
      const qrCodeMessage = await conn.sendMessage(m.chat, {
        image: { url: qrCodeImage },
        caption: `Silakan scan QRIS berikut untuk pembayaran sebesar ${amount}. Waktu Pembayaran 5 Menit`,
        fileLength: 10,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: true
        }
      }, { quoted: m });

      const interval = setInterval(async () => {
        const status = await checkTransactionStatus(uniqueCode);
        console.log('Transaction Status:', status);

        if (status.success && status.data.status === 'Succes') {
          clearInterval(interval);
          await deleteMessage(m.chat, qrCodeMessage.key.id);

          conn.reply(m.chat, 'Pembayaran Berhasil. Pembuatan Akun Sedang Di Proses. Jika Ada Masalah Mohon Untuk Segera Hubungi Owner', m);

          const whmResponse = await createWhmAccount(domain, selectedPackage.name, user);
          console.log('WHM Account Response:', whmResponse);

          if (whmResponse.status === "Berhasil" && whmResponse.code === 200) {
            const { domain, user, pass, package, ip, LoginWhm, LogincPanel } = whmResponse.data;
            let teks = `⬣ *TRANSAKSI SUKSES.*\n\n`;
            teks += `◉ Domain: ${domain}\n`;
            teks += `◉ Pengguna: ${user}\n`;
            teks += `◉ Kata Sandi: ${pass}\n`;
            teks += `◉ Paket: ${package}\n`;
            teks += `◉ IP: ${ip}\n`;
            teks += `◉ Login WHM: ${LoginWhm}\n`;
            teks += `◉ Login cPanel: ${LogincPanel}\n`;

            conn.reply(m.chat, teks, m);
          } else if (whmResponse.status === "Gagal" && whmResponse.code === 500) {
            conn.reply(m.chat, `Ada kesalahan dalam pembuatan akun. Pesan kesalahan: Tolong segera hubungi owner.`, m);
          } else {
            conn.reply(m.chat, `Gagal membuat WHM: ${whmResponse.message}`, m);
          }
        }
      }, 5000);
    } else {
      conn.reply(m.chat, `Gagal membuat transaksi: ${transaction.msg}`, m);
    }
  } catch (error) {
    console.error('Error in Buy WHM Process:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.', m);
  }
};

handler.help = ['beliwhm'];
handler.tags = ['produk'];
handler.command = /^(buywhm)$/i;

module.exports = handler;
