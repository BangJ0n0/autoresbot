// VARIABLE yg bisa di pakai
/*
{USER}
{WAKTU}
{TANGGAL}
{USERTAG}
{UCAPAN} 
{GRUBNAME}

*/




// TEMPLATE VERSI 1
/* 
const awalanItem = '» ';
const template_list = `{UCAPAN} {USERTAG}

📝 {GRUBNAME}
⏳ {WAKTU} WIB
📆 {TANGGAL}

*⬇️ List Menu ⬇️*

{LIST_ITEMS}

Untuk Melihat List menu
Ketik *teks* di atas`;
*/





// TEMPLATE VERSI 2
const awalanItem = '┣⌬';
const template_list = `┏━『 *Berikut Daftar List* 』

{LIST_ITEMS}
┗━━━━━━━━━━━━━━━━━━◧

_Untuk Melihat List menu Ketik *teks* di atas_`;



module.exports = {
    awalanItem,
    template_list
};
