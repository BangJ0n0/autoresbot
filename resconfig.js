// =============================================
// VERSION UPDATE
// UPDATE TERAKHIR 30 September 2024 JAM 00:00 WIB
// WEBSITE : autoresbot.com
// VERSION : 3.5.3
// =============================================



const path=require("path"),fs=require("fs"),chalk=require("chalk"),moment=require("moment-timezone");

const config = {
    botDestination  : 'group', // group |  private | both
    region       	: 'indonesia',
    resbot_version  : 'Autoresbot v3.5.3',
    apikey_resbot   : 'APIKEY_GRATIS', // apikey beli di autoresbot.com
    nomorsuperOwner : '6285246154386',
    grup            : 'https://whatsapp.com/channel/0029VabMgUy9MF99bWrYja2Q',
    email           : 'autoresbot@gmail.com',
    ig           	: '@autoresbot',
    ownername       : 'Autoresbot',
    botname         : 'Autoresbot',
    packname        : 'Autoresbot',
    sleep_game      : 60000, // waktu main tebak (1000 = 1 detik)
    limit_tunggu 	: 10, // ini menit = 10 menit setiap setelah claim
    MoneyMenangGame : 20,
    ratelimiter 	: 4, // detik
    prefix_custom   : ['#','!','.'],
    dalamdetik		: 5, // ini adalah waktu couldown dalamdetik
    chatmasuk 		: 5, // ini adalah jumlah chat maxsimum {dalamdetik}
    prefix 			: true,
    anticall        : false, // true = aktif || false = tidak aktif
    publik 			: true,
    audio_menu      : true,
    autoread 		: false,
    antitoxic 		: true,
    savekontak		: {
    format   	: 'Buyer @urutan - @tanggal @bulan @tahun',
    mulai 		: '1',
    },
    author          : `Date: ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\nYouTube: Azhari Creative\nBot: 0852-4615-4386`,
    allmenu         : 'https://telegra.ph/file/8303c9aaba8c2c8dd1f8e.jpg',
    typeWelcome 	: '1', // ada 3 pilihan angka 1 = image pp user  2 = image welcome custom   || 3 = teks only
    icon_on			: '🟢', 
	icon_off		: '🔴',
    game 			: {
        tebakangka   : 'https://telegra.ph/file/81a1aa13c00d36a1f2b75.jpg',
        tebaklontong : 'https://telegra.ph/file/f20bec6cbc011da4ac25d.jpg',
        tebakkalimat : 'https://telegra.ph/file/9624ca315002d0898bcee.jpg',
        tebaklirik   : 'https://telegra.ph/file/ec6362c91aaf837a6ec77.jpg',
        tebakkata    : 'https://telegra.ph/file/4cd10be17fd6c13303453.jpg',
        tebakbendera : 'https://telegra.ph/file/d982a966ba17ee035807c.jpg',
        tebakgambar  : 'https://telegra.ph/file/e9107d96769831a17ee21.jpg',
        tebaklagu    : 'https://telegra.ph/file/d96c459b9605d6fab4284.jpg'
    },
    PANEL            : {
        URL             : '', // https://panel.contoh.com
        KEY_APPLICATION : '', // ambil di panel : ptla_xxxxx
        SERVER_EGG      : '15',
        port_range      : '1900-2000',
        id_location     : '5', // id location -> ambil di panel
        cpu_default     : 90, // unlimited ganti 0
        disk_default    : 5120, // 5 gb || unlimited ganti 0
        description     : 'Jika Ada Pertanyaan Hubungi Telegram Admin : https://t.me/autoresbot_com',
        access          : 'owner' , // owner, premium,
    },
    BACKUP          : {
        autobackup : false, // true atau false
        autosendwa : true
    }
};



module.exports = config;

let file = path.resolve(__filename);
fs.watchFile(file,(()=>{fs.unwatchFile(file),console.log(`${chalk.greenBright.bold("UPDATE FILE "+file)} ${chalk.redBright.bold("PLEASE RESTART THIS SERVER")}`),delete require.cache[file],require(file)}));













/* 
---- PENJELASAN ------ 
 // 🟢 🔴
true : artinya aktif
false : tidak aktif

jadi kalau
anticall        : true 
// artinya bot lu gak bisa di telpon // kalo ada orang nelpon lansung di block



untuk link yang seperti https://telegra.ph/file/4cd10be17fd6c13303453.jpg
kalau mau di ganti silakan upload gambar kalian dulu ke website https://telegra.ph
lalu nanti salin url gambarnya 


KALAU MAU NANYA NANYA CHAT https://t.me/autoresbot_com admin/owner autoresbot

*/
