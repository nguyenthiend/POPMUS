const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// ====== THÔNG TIN CẦN THAY ĐỔI ======
const config = {
    host: 'kingmc.vn',        // Địa chỉ server
    port: 19132,              // Cổng kết nối
    username: 'PopMusic',     // Tên tài khoản của bạn
    password: '2792011'       // Mật khẩu của bạn
};
// ===================================

let bot = null;
let reconnectInterval = 5000;

function createBot() {
    console.log(`[${new Date().toLocaleString()}] Đang kết nối tới ${config.host}:${config.port}...`);

    bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        version: false
    });

    bot.on('login', () => {
        console.log(`[${new Date().toLocaleString()}] ✅ Bot ${config.username} đã đăng nhập!`);
    });

    bot.on('spawn', () => {
        console.log(`[${new Date().toLocaleString()}] ✅ Bot đã vào game!`);
    });

    bot.on('error', (err) => {
        console.log(`[${new Date().toLocaleString()}] ❌ Lỗi: ${err.message}`);
        bot.end();
    });

    bot.on('end', () => {
        console.log(`[${new Date().toLocaleString()}] ⚠️ Bot đã ngắt kết nối. Thử lại sau ${reconnectInterval/1000} giây...`);
        setTimeout(() => {
            createBot();
        }, reconnectInterval);
    });
}

// Bắt đầu bot
createBot();

// ====== PHẦN NÀY GIÚP BOT KHÔNG BỊ NGỦ TRÊN RENDER ======
// Tạo một web server nhỏ. Render sẽ ping vào chính URL này để giữ bot thức.
app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(PORT, () => {
    console.log(`[${new Date().toLocaleString()}] ✅ Web server đang chạy ở cổng ${PORT}`);
});
// ======================================================
