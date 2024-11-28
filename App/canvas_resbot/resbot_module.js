const { createCanvas, registerFont, loadImage } = require('canvas');
const path = require('path');
const fs2 = require('fs');
const fs = require('fs').promises;
const axios = require('axios');

const moment = require('moment-timezone');
const zonaWaktuIndonesia = 'Asia/Jakarta';
const waktuSekarangIndonesia = moment().tz(zonaWaktuIndonesia);

waktuSekarangIndonesia.locale('id');
const formatTanggal = waktuSekarangIndonesia.format('D MMMM YYYY');




async function getImageAndSaveToTempFile(imageURL) {
    try {
        const imageBuffer = await getImageBufferFromURL(imageURL); // Mengambil buffer gambar dari URL
        const tempFilePath = await saveBufferToTempFile(imageBuffer); // Menyimpan buffer gambar ke file sementara
        return tempFilePath; // Mengembalikan path file sementara
    } catch (error) {
        console.error('Error getting image and saving to temp file:', error);
        throw error;
    }
}

async function getImageBufferFromURL(imageURL) {
    try {
        const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        return imageBuffer;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}

async function saveBufferToTempFile(buffer) {
    try {
        const rootTempDir = '/tmp'; // Path absolut ke folder tmp di root
        const tempDir = path.join(__dirname, rootTempDir); // Path absolut ke folder tmp dalam proyek
        await fs.mkdir(tempDir, { recursive: true }); // Membuat direktori jika belum ada
        const tempFilePath = path.join(tempDir, `tempfile_${Date.now()}.jpg`); // Nama file sementara
        await fs.writeFile(tempFilePath, buffer); // Menyimpan buffer ke file sementara
        return tempFilePath; // Mengembalikan path file sementara
    } catch (error) {
        console.error('Error saving buffer to temp file:', error);
        throw error;
    }
}


// Fungsi yang akan diexport sebagai modul
async function generateImage(name, pp,iwelcome) {

    try {

        if (!name || !pp) {
            return console.log('Enter valid parameters (name, pp)');
        }

        if (name.length > 18) {
            name = name.substring(0, 18);
        }

    const bufferPp = await getImageAndSaveToTempFile(pp);

    const date = formatTanggal;

    registerFont(path.resolve(__dirname, 'LEMONMILK-Bold.otf'), { family: 'LEMONMILK' });

    // Ukuran kanvas
    const canvasWidth = 1280;
    const canvasHeight = 720;

    // Buat kanvas
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Ganti path background sesuai kebutuhan
    const backgroundImage = await loadImage(path.resolve(__dirname, './'+iwelcome));
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    const xOffset = 0;
    const yOffset = -71;
    const newProfileRadius = 220; // Ubah sesuai keinginan Anda
    const newProfileX = (canvasWidth - newProfileRadius * 2) / 2 + xOffset;// Menempatkan gambar di tengah lebar kanvas
    const newProfileY = (canvasHeight - newProfileRadius * 2) / 2 + yOffset; // Menyesuaikan posisi ke bawah
    ctx.save();
    ctx.beginPath();
    ctx.arc(newProfileX + newProfileRadius, newProfileY + newProfileRadius, newProfileRadius, 0, Math.PI * 2, true); // Koordinat dan radius bulat
    ctx.closePath();
    ctx.clip();

    const profileImageObj = await loadImage(path.resolve(__dirname, bufferPp));
 

    ctx.drawImage(profileImageObj, newProfileX, newProfileY, newProfileRadius * 2, newProfileRadius * 2); // Sesuaikan koordinat dan ukuran sesuai kebutuhan
    ctx.restore();



     // "start", "end", "left", "right", dan "center".
    
    ctx.font = '55px "LEMONMILK"';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.strokeText(`${name}`, 640, 632);
    ctx.fillText(`${name}`, 640, 632);

    await fs.unlink(bufferPp);


        const buffer = canvas.toBuffer('image/png');
        return buffer;


       //  const fileName = `temp_welcome${Date.now()}.png`;
       //  fs2.writeFile(fileName, buffer, (err) => {
       //      if (err) {
       //          console.error('Error saving buffer as file:', err);
       //          throw err;
       //      }
            
       //  });


       // return fileName;
    } catch (error) {
        return console.error(error);
       
    }
}


// dah bagus 7 mei jam 6 malam



// async function generateMe(name, pp1,level_width,psStats_cache,nomor_hp,role_ingc,psStats_cache,psStats_level,psStats_money,psStats_limit,psStats_ingrub) {
//     try {
//         if (!name || !pp1) {
//             return console.log('Enter valid parameters (name, pp1, pp2)');
//         }
//         if (name.length > 18) {
//             name = name.substring(0, 18);
//         }

//         const bufferPp1 = await getImageAndSaveToTempFile(pp1);
//         const date = formatTanggal;
//         registerFont(path.resolve(__dirname, 'LEMONMILK-Bold.otf'), { family: 'LEMONMILK' });
//         const canvasWidth = 1080;
//         const canvasHeight = 1080;
//         const canvas = createCanvas(canvasWidth, canvasHeight);
//         const ctx = canvas.getContext('2d');
//         const backgroundImage = await loadImage(path.resolve(__dirname, './profil.jpg'));
//         ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);




//         // Gambar pertama di sebelah kiri
//         const profileWidth1 = 308;
//         const profileHeight1 = 308;
//         const profileX1 = 103;
//         const profileY1 = 227.5;
//         const profileImageObj1 = await loadImage(path.resolve(__dirname, bufferPp1));
//         const borderRadius1 = 15; // Border radius untuk gambar pertama
//         ctx.save();
//         ctx.beginPath();
//         ctx.moveTo(profileX1 + borderRadius1, profileY1); // Pindahkan ke sudut kiri atas
//         ctx.lineTo(profileX1 + profileWidth1 - borderRadius1, profileY1); // Garis horizontal ke sudut kanan atas
//         ctx.quadraticCurveTo(profileX1 + profileWidth1, profileY1, profileX1 + profileWidth1, profileY1 + borderRadius1); // Sudut kanan atas
//         ctx.lineTo(profileX1 + profileWidth1, profileY1 + profileHeight1 - borderRadius1); // Garis vertikal ke sudut kanan bawah
//         ctx.quadraticCurveTo(profileX1 + profileWidth1, profileY1 + profileHeight1, profileX1 + profileWidth1 - borderRadius1, profileY1 + profileHeight1); // Sudut kanan bawah
//         ctx.lineTo(profileX1 + borderRadius1, profileY1 + profileHeight1); // Garis horizontal ke sudut kiri bawah
//         ctx.quadraticCurveTo(profileX1, profileY1 + profileHeight1, profileX1, profileY1 + profileHeight1 - borderRadius1); // Sudut kiri bawah
//         ctx.lineTo(profileX1, profileY1 + borderRadius1); // Garis vertikal ke sudut kiri atas
//         ctx.quadraticCurveTo(profileX1, profileY1, profileX1 + borderRadius1, profileY1); // Sudut kiri atas
//         ctx.closePath();
//         ctx.clip();
//         ctx.drawImage(profileImageObj1, profileX1, profileY1, profileWidth1, profileHeight1);
//         ctx.restore();



//          // Gambar achievement
//         const achievementWidth1 = 83;
//         const achievementHeight1 = 83;
//         const achievementX1 = 469;
//         const achievementY1 = 314;
//         const achievementImageObj1 = await loadImage(path.resolve(__dirname, './achievement1.png'));
//         const achievement_borderRadius1 = 18; // Border radius untuk gambar pertama
//         ctx.save();
//         ctx.beginPath();
//         ctx.moveTo(achievementX1 + achievement_borderRadius1, achievementY1); // Pindahkan ke sudut kiri atas
//         ctx.lineTo(achievementX1 + achievementWidth1 - achievement_borderRadius1, achievementY1); // Garis horizontal ke sudut kanan atas
//         ctx.quadraticCurveTo(achievementX1 + achievementWidth1, achievementY1, achievementX1 + achievementWidth1, achievementY1 + achievement_borderRadius1); // Sudut kanan atas
//         ctx.lineTo(achievementX1 + achievementWidth1, achievementY1 + achievementHeight1 - achievement_borderRadius1); // Garis vertikal ke sudut kanan bawah
//         ctx.quadraticCurveTo(achievementX1 + achievementWidth1, achievementY1 + achievementHeight1, achievementX1 + achievementWidth1 - achievement_borderRadius1, achievementY1 + achievementHeight1); // Sudut kanan bawah
//         ctx.lineTo(achievementX1 + achievement_borderRadius1, achievementY1 + achievementHeight1); // Garis horizontal ke sudut kiri bawah
//         ctx.quadraticCurveTo(achievementX1, achievementY1 + achievementHeight1, achievementX1, achievementY1 + achievementHeight1 - achievement_borderRadius1); // Sudut kiri bawah
//         ctx.lineTo(achievementX1, achievementY1 + achievement_borderRadius1); // Garis vertikal ke sudut kiri atas
//         ctx.quadraticCurveTo(achievementX1, achievementY1, achievementX1 + achievement_borderRadius1, achievementY1); // Sudut kiri atas
//         ctx.closePath();
//         ctx.clip();
//         ctx.drawImage(achievementImageObj1, achievementX1, achievementY1, achievementWidth1, achievementHeight1);
//         ctx.restore();




//         // text nama
//         ctx.font = '35px "LEMONMILK"';
//         ctx.fillStyle = '#fcbf49';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(`${name}`, 599, 350);
//         ctx.fillText(`${name}`, 599, 350);



//          // text role
//         ctx.font = '35px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(role_ingc, 599, 397);
//         ctx.fillText(role_ingc, 599, 397);


//         // text nomor hp
//         ctx.font = '25px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(nomor_hp, 472, 447);
//         ctx.fillText(nomor_hp, 472, 447);



//          // text level
//         ctx.font = '15px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(psStats_cache, 472, 530);
//         ctx.fillText(psStats_cache, 472, 530);




//         // Gambar persegi panjang biru
//         ctx.fillStyle = '#41B06E'; // Warna biru
//         const rectangleWidth = level_width;
//         const rectangleHeight = 48;
//         const rectangleX = 473; // Posisi X
//         const rectangleY = 460; // Posisi Y
//         ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);






//         // LEVEL
//         ctx.font = '25px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(`${psStats_level}`, 230, 743);
//         ctx.fillText(`${psStats_level}`, 230, 743);

//          // money
//         ctx.font = '25px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(`${psStats_money}`, 257, 822);
//         ctx.fillText(`${psStats_money}`, 257, 822);


//          // limit
//         ctx.font = '25px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(`${psStats_limit}`, 228, 878);
//         ctx.fillText(`${psStats_limit}`, 228, 878);


//         // role
//         ctx.font = '25px "LEMONMILK"';
//         ctx.fillStyle = '#ffffff';
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 1;
//         ctx.textAlign = 'left';
//         ctx.strokeText(`${psStats_ingrub}`, 383, 949);
//         ctx.fillText(`${psStats_ingrub}`, 383, 949);


//         await fs.unlink(bufferPp1);
//         const buffer = canvas.toBuffer('image/png');
//         return buffer;
//     } catch (error) {
//         return console.error(error);
//     }
// }







async function generateMe(name, pp1,level_width,psStats_cache,nomor_hp,role_ingc,psStats_cache,psStats_level,psStats_money,psStats_limit,psStats_ingrub,flag,achievement) {
    try {
        if (!name || !pp1) {
            return console.log('Enter valid parameters (name, pp1, pp2)');
        }
        if (name.length > 18) {
            name = name.substring(0, 18);
        }



        
        const date = formatTanggal;
        registerFont(path.resolve(__dirname, 'LEMONMILK-Bold.otf'), { family: 'LEMONMILK' });
        const canvasWidth = 1080;
        const canvasHeight = 1080;
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');
        const backgroundImage = await loadImage(path.resolve(__dirname, './profil.jpg'));
        ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);



        // Gambar pertama di sebelah kiri
        const bufferPp1 = await getImageAndSaveToTempFile(pp1);
        const profileWidth1 = 308;
        const profileHeight1 = 308;
        const profileX1 = 103;
        const profileY1 = 227.5;
        const profileImageObj1 = await loadImage(path.resolve(__dirname, bufferPp1));
        const borderRadius1 = 15; // Border radius untuk gambar pertama
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(profileX1 + borderRadius1, profileY1); // Pindahkan ke sudut kiri atas
        ctx.lineTo(profileX1 + profileWidth1 - borderRadius1, profileY1); // Garis horizontal ke sudut kanan atas
        ctx.quadraticCurveTo(profileX1 + profileWidth1, profileY1, profileX1 + profileWidth1, profileY1 + borderRadius1); // Sudut kanan atas
        ctx.lineTo(profileX1 + profileWidth1, profileY1 + profileHeight1 - borderRadius1); // Garis vertikal ke sudut kanan bawah
        ctx.quadraticCurveTo(profileX1 + profileWidth1, profileY1 + profileHeight1, profileX1 + profileWidth1 - borderRadius1, profileY1 + profileHeight1); // Sudut kanan bawah
        ctx.lineTo(profileX1 + borderRadius1, profileY1 + profileHeight1); // Garis horizontal ke sudut kiri bawah
        ctx.quadraticCurveTo(profileX1, profileY1 + profileHeight1, profileX1, profileY1 + profileHeight1 - borderRadius1); // Sudut kiri bawah
        ctx.lineTo(profileX1, profileY1 + borderRadius1); // Garis vertikal ke sudut kiri atas
        ctx.quadraticCurveTo(profileX1, profileY1, profileX1 + borderRadius1, profileY1); // Sudut kiri atas
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profileImageObj1, profileX1, profileY1, profileWidth1, profileHeight1);
        ctx.restore();



        // GAMBAR BENDERA
        // Gambar pertama di sebelah kiri
        const flag_Width1 = 107;
        const flag_Height1 = 67;
        const flag_X1 = 470;
        const flag_Y1 = 225;
        const flagImageObj1 = await loadImage(path.resolve(__dirname, flag));
        const flag_borderRadius1 = 1; // Border radius untuk gambar pertama
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(flag_X1 + flag_borderRadius1, flag_Y1); // Pindahkan ke sudut kiri atas
        ctx.lineTo(flag_X1 + flag_Width1 - flag_borderRadius1, flag_Y1); // Garis horizontal ke sudut kanan atas
        ctx.quadraticCurveTo(flag_X1 + flag_Width1, flag_Y1, flag_X1 + flag_Width1, flag_Y1 + flag_borderRadius1); // Sudut kanan atas
        ctx.lineTo(flag_X1 + flag_Width1, flag_Y1 + flag_Height1 - flag_borderRadius1); // Garis vertikal ke sudut kanan bawah
        ctx.quadraticCurveTo(flag_X1 + flag_Width1, flag_Y1 + flag_Height1, flag_X1 + flag_Width1 - flag_borderRadius1, flag_Y1 + flag_Height1); // Sudut kanan bawah
        ctx.lineTo(flag_X1 + flag_borderRadius1, flag_Y1 + flag_Height1); // Garis horizontal ke sudut kiri bawah
        ctx.quadraticCurveTo(flag_X1, flag_Y1 + flag_Height1, flag_X1, flag_Y1 + flag_Height1 - flag_borderRadius1); // Sudut kiri bawah
        ctx.lineTo(flag_X1, flag_Y1 + flag_borderRadius1); // Garis vertikal ke sudut kiri atas
        ctx.quadraticCurveTo(flag_X1, flag_Y1, flag_X1 + flag_borderRadius1, flag_Y1); // Sudut kiri atas
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(flagImageObj1, flag_X1, flag_Y1, flag_Width1, flag_Height1);
        ctx.restore();



         // Gambar achievement
        const achievementWidth1 = 104;
        const achievementHeight1 = 92;
        const achievementX1 = 471.5;
        const achievementY1 = 313;
        const achievementImageObj1 = await loadImage(path.resolve(__dirname, achievement));
        const achievement_borderRadius1 = 18; // Border radius untuk gambar pertama
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(achievementX1 + achievement_borderRadius1, achievementY1); // Pindahkan ke sudut kiri atas
        ctx.lineTo(achievementX1 + achievementWidth1 - achievement_borderRadius1, achievementY1); // Garis horizontal ke sudut kanan atas
        ctx.quadraticCurveTo(achievementX1 + achievementWidth1, achievementY1, achievementX1 + achievementWidth1, achievementY1 + achievement_borderRadius1); // Sudut kanan atas
        ctx.lineTo(achievementX1 + achievementWidth1, achievementY1 + achievementHeight1 - achievement_borderRadius1); // Garis vertikal ke sudut kanan bawah
        ctx.quadraticCurveTo(achievementX1 + achievementWidth1, achievementY1 + achievementHeight1, achievementX1 + achievementWidth1 - achievement_borderRadius1, achievementY1 + achievementHeight1); // Sudut kanan bawah
        ctx.lineTo(achievementX1 + achievement_borderRadius1, achievementY1 + achievementHeight1); // Garis horizontal ke sudut kiri bawah
        ctx.quadraticCurveTo(achievementX1, achievementY1 + achievementHeight1, achievementX1, achievementY1 + achievementHeight1 - achievement_borderRadius1); // Sudut kiri bawah
        ctx.lineTo(achievementX1, achievementY1 + achievement_borderRadius1); // Garis vertikal ke sudut kiri atas
        ctx.quadraticCurveTo(achievementX1, achievementY1, achievementX1 + achievement_borderRadius1, achievementY1); // Sudut kiri atas
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(achievementImageObj1, achievementX1, achievementY1, achievementWidth1, achievementHeight1);
        ctx.restore();




        // text nama
        ctx.font = '32px "LEMONMILK"';
        ctx.fillStyle = '#fcbf49';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(`${name}`, 599, 350);
        ctx.fillText(`${name}`, 599, 350);



         // text role
        ctx.font = '30px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(role_ingc, 599, 397);
        ctx.fillText(role_ingc, 599, 397);


        // text nomor hp
        ctx.font = '25px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(nomor_hp, 472, 447);
        ctx.fillText(nomor_hp, 472, 447);



         // text level
        ctx.font = '15px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(psStats_cache, 472, 530);
        ctx.fillText(psStats_cache, 472, 530);




        // Gambar persegi panjang biru
        ctx.fillStyle = '#41B06E'; // Warna biru
        const rectangleWidth = level_width;
        const rectangleHeight = 47;
        const rectangleX = 473; // Posisi X
        const rectangleY = 461; // Posisi Y
        ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);






        // LEVEL
        ctx.font = '25px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(`${psStats_level}`, 230, 746.5);
        ctx.fillText(`${psStats_level}`, 230, 746.5);

         // money
        ctx.font = '25px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(`${psStats_money}`, 257, 818.1);
        ctx.fillText(`${psStats_money}`, 257, 818.1);


         // limit
        ctx.font = '25px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(`${psStats_limit}`, 228, 886.5);
        ctx.fillText(`${psStats_limit}`, 228, 886.5);


        // role
        ctx.font = '25px "LEMONMILK"';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.textAlign = 'left';
        ctx.strokeText(`${psStats_ingrub}`, 383, 950.5);
        ctx.fillText(`${psStats_ingrub}`, 383, 950.5);


        await fs.unlink(bufferPp1);
        const buffer = canvas.toBuffer('image/png');
        return buffer;
    } catch (error) {
        return console.error(error);
    }
}













// async function smeme(text, pp) {
//     try {
//         if (!text || !pp) {
//             return console.log('Enter valid parameters (text, pp)');
//         }

//         const bufferPp = await getImageAndSaveToTempFile(pp);
//         const imageSmeme = await loadImage(path.resolve(__dirname, bufferPp));

//         registerFont(path.resolve(__dirname, 'LEMONMILK-Bold.otf'), { family: 'LEMONMILK' });

//         const canvasWidth = 1280;
//         const canvasHeight = 1280;

//         const canvas = createCanvas(canvasWidth, canvasHeight);
//         const ctx = canvas.getContext('2d');

//         // Gambar gambar profil di kanvas
//         ctx.drawImage(imageSmeme, 0, 0, canvasWidth, canvasHeight);

//         // Tambahkan teks pada bagian tengah atas
//         const fontSize = 100; // Ukuran font
//         const fontFamily = 'LEMONMILK';
//         const textColor = '#ffffff';
//         const borderColor = '#000000'; // Warna border hitam
//         ctx.font = `${fontSize}px ${fontFamily}`;

//         // Menghitung lebar teks
//         const textWidth = ctx.measureText(text).width;

//         // Mengatur posisi X dan Y agar teks berada di tengah horizontal dan di atas kanvas
//         const textX = canvasWidth / 2;
//         let textY = fontSize + 20;

//         // Memisahkan teks menjadi beberapa baris jika terlalu panjang
//         const maxLineWidth = canvasWidth - 40; // Lebar maksimum untuk satu baris teks
//         let words = text.split(' ');
//         let line = '';
//         let lines = [];
//         for (let word of words) {
//             let testLine = line + word + ' ';
//             let testLineWidth = ctx.measureText(testLine).width;
//             if (testLineWidth > maxLineWidth) {
//                 lines.push(line);
//                 line = word + ' ';
//             } else {
//                 line = testLine;
//             }
//         }
//         lines.push(line);

//         // Menggambar teks dengan border hitam
//         ctx.strokeStyle = borderColor;
//         ctx.lineWidth = 4; // Lebar border
//         ctx.textAlign = 'center'; // Teks diatur agar berada di tengah horizontal
//         ctx.fillStyle = textColor;

//         // Menggambar setiap baris teks
//         for (let line of lines) {
//             ctx.strokeText(line.trim(), textX, textY);
//             ctx.fillText(line.trim(), textX, textY);
//             textY += fontSize * 1.2; // Menggeser posisi Y untuk baris selanjutnya
//         }

//         await fs.unlink(bufferPp);

//         const buffer = canvas.toBuffer('image/png');
//         return buffer;

//     } catch (error) {
//         console.error(error);
//     }
// }

async function smeme(text = '', text2 = '', pp, borderWidth = 4) {
    try {
        if (!pp) {
            return console.log('Enter a valid parameter for pp');
        }

        const bufferPp = await getImageAndSaveToTempFile(pp);
        const imageSmeme = await loadImage(bufferPp);

        // Ambil dimensi asli gambar
        const canvasWidth = imageSmeme.width;
        const canvasHeight = imageSmeme.height;

        // Membuat kanvas dengan ukuran gambar asli
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        // Gambar gambar profil di kanvas
        ctx.drawImage(imageSmeme, 0, 0, canvasWidth, canvasHeight);

        // Tambahkan teks pada bagian tengah atas
        const fontSize = 100; // Ukuran font
        const fontFamily = 'LEMONMILK';
        const textColor = '#ffffff';
        const borderColor = '#000000'; // Warna border hitam
        registerFont(path.resolve(__dirname, 'LEMONMILK-Bold.otf'), { family: fontFamily });
        ctx.font = `${fontSize}px ${fontFamily}`;

        // Menghitung lebar teks
        const textWidth = ctx.measureText(text).width;

        // Mengatur posisi X dan Y agar teks berada di tengah horizontal dan di atas kanvas
        const textX = canvasWidth / 2;
        //let textY = fontSize + 20;
        let textY = fontSize;

        // Memisahkan teks menjadi beberapa baris jika terlalu panjang
        const maxLineWidth = canvasWidth - 40; // Lebar maksimum untuk satu baris teks
        let words = text.split(' ');
        let line = '';
        let lines = [];
        for (let word of words) {
            let testLine = line + word + ' ';
            let testLineWidth = ctx.measureText(testLine).width;
            if (testLineWidth > maxLineWidth) {
                lines.push(line);
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        // Menggambar teks dengan border hitam
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth; // Lebar border
        ctx.textAlign = 'center'; // Teks diatur agar berada di tengah horizontal
        ctx.fillStyle = textColor;

        // Menggambar setiap baris teks
        for (let line of lines) {
            ctx.strokeText(line.trim(), textX, textY);
            ctx.fillText(line.trim(), textX, textY);
            textY += fontSize * 1.2; // Menggeser posisi Y untuk baris selanjutnya
        }

        // Tambahkan teks kedua di bagian bawah
        textY = canvasHeight - 20; // Mengatur posisi Y agar teks berada di bawah kanvas
        words = text2.split(' ');
        line = '';
        lines = [];
        for (let word of words) {
            let testLine = line + word + ' ';
            let testLineWidth = ctx.measureText(testLine).width;
            if (testLineWidth > maxLineWidth) {
                lines.push(line);
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        // Menggambar setiap baris teks kedua
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            ctx.strokeText(line.trim(), textX, textY);
            ctx.fillText(line.trim(), textX, textY);
            textY -= fontSize * 1.2; // Menggeser posisi Y untuk baris sebelumnya
        }

        await fs.unlink(bufferPp);

        const buffer = canvas.toBuffer('image/png');
        return buffer;

    } catch (error) {
        console.error(error);
    }
}



// Ekspor fungsi sebagai modul
module.exports = {
    generateImage,smeme,generateMe
};
