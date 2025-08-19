
# 🌸 FCA Kaori VIP - Advanced Facebook Chat API 🌸

**Hệ thống Facebook Chat API siêu VIP với tính năng đa bot và bảo mật cao cấp**  
*Phát triển bởi Kaori Waguri*

[![Version](https://img.shields.io/badge/version-1.0.0-pink.svg)](https://github.com/kaori-waguri/fca-kaoriVip)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)](https://nodejs.org/)

## 📋 Mục lục

- [🌟 Tính năng nổi bật](#-tính-năng-nổi-bật)
- [⚡ Cài đặt nhanh](#-cài-đặt-nhanh)
- [🚀 Hướng dẫn chi tiết](#-hướng-dẫn-chi-tiết)
- [💎 Tính năng VIP](#-tính-năng-vip)
- [📖 API Documentation](#-api-documentation)
- [🔧 Cấu hình nâng cao](#-cấu-hình-nâng-cao)
- [🛡️ Bảo mật](#️-bảo-mật)
- [🤝 Hỗ trợ](#-hỗ-trợ)

## 🌟 Tính năng nổi bật

### ✨ Tính năng chính
- 🤖 **Multi-Bot Support** - Quản lý nhiều bot từ một hệ thống
- 🚀 **Hiệu suất cao** - Tối ưu hóa tốc độ và độ ổn định
- 🔒 **Bảo mật nâng cao** - Xác thực và quản lý session tiên tiến
- 📱 **Real-time MQTT** - Giao tiếp thời gian thực siêu nhanh
- 🎨 **Logging đẹp mắt** - Log màu sắc và chi tiết
- 🔧 **Cấu hình dễ dàng** - Thiết lập và tùy chỉnh đơn giản
- 💎 **Cấp doanh nghiệp** - Xây dựng cho môi trường production

### 🌸 Tính năng VIP độc quyền
- 👻 **Anti-Detection** - Tránh phát hiện tự động
- 🛡️ **Anti-Warning System** - Tự động xóa cảnh báo Facebook
- 🔓 **E2EE Bypass** - Vượt qua mã hóa đầu cuối
- 🔄 **Session Rotation** - Xoay session tự động
- 🎯 **Smart Rate Limiting** - Giới hạn tốc độ thông minh
- 👑 **VIP Protection Suite** - Bộ bảo vệ tài khoản VIP

## ⚡ Cài đặt nhanh

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- NPM hoặc Yarn
- Facebook account với cookie hợp lệ

### Bước 1: Clone repository
```bash
git clone https://github.com/kaori-waguri/fca-kaoriVip.git
cd fca-kaoriVip
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Sử dụng cơ bản
```javascript
const kaoriLogin = require('fca-kaoriVip');

// Đăng nhập với cookie
kaoriLogin('your_facebook_cookie_here', (err, api) => {
    if (err) return console.error(err);
    
    console.log('🌸 Kaori FCA đã sẵn sàng!');
    
    // Gửi tin nhắn
    api.sendMessage('Hello từ Kaori!', 'thread_id');
    
    // Lắng nghe tin nhắn
    api.listenMqtt((err, event) => {
        if (err) return console.error(err);
        console.log('Nhận được:', event);
    });
});
```

## 🚀 Hướng dẫn chi tiết

### 📦 Cài đặt trong dự án có sẵn

#### 1. Thêm vào dự án Node.js
```bash
# Copy thư mục fca-kaoriVip vào dự án
cp -r fca-kaoriVip /path/to/your/project/

# Hoặc sử dụng npm link
cd fca-kaoriVip
npm link
cd /path/to/your/project
npm link fca-kaoriVip
```

#### 2. Import và sử dụng
```javascript
const kaoriLogin = require('./fca-kaoriVip');
// hoặc nếu dùng npm link
const kaoriLogin = require('fca-kaoriVip');
```

### 🔑 Lấy Facebook Cookie

#### Phương pháp 1: Browser Developer Tools
1. Đăng nhập Facebook
2. Mở Developer Tools (F12)
3. Vào tab Application/Storage
4. Chọn Cookies → facebook.com
5. Copy toàn bộ cookie

#### Phương pháp 2: Browser Extension
1. Cài extension "Cookie Editor"
2. Đăng nhập Facebook
3. Export cookies dạng JSON
4. Sử dụng cookie string

### 💻 Ví dụ sử dụng nâng cao

#### Đăng nhập với options
```javascript
const options = {
    logLevel: 'info',           // Mức độ log: error, warn, info, debug
    autoMarkDelivery: false,    // Tự động đánh dấu đã đọc
    autoReconnect: true,        // Tự động kết nối lại
    selfListen: false,          // Nghe tin nhắn của chính mình
    listenEvents: true,         // Nghe tất cả events
    updatePresence: true,       // Cập nhật trạng thái online
    forceLogin: true,          // Buộc đăng nhập
    vipMode: true,             // Kích hoạt chế độ VIP
    antiWarning: true,         // Bật anti-warning
    bypassE2EE: true,          // Bypass E2EE
    antiLock: true             // Chống khóa tài khoản
};

kaoriLogin(cookie, options, (err, api) => {
    if (err) return console.error(err);
    console.log('Đăng nhập thành công với VIP mode!');
});
```

#### Multi-Bot Management
```javascript
// Tạo nhiều bot instance
const bot1 = api.createBotInstance({
    id: 'support-bot',
    name: 'Bot Hỗ trợ khách hàng',
    category: 'support',
    config: {
        autoReply: true,
        workingHours: '9-17'
    }
});

const bot2 = api.createBotInstance({
    id: 'entertainment-bot',
    name: 'Bot Giải trí',
    category: 'fun',
    config: {
        gameMode: true,
        musicBot: true
    }
});

// Quản lý bots
const botManager = api.manageBots();

// Lấy danh sách bot
const allBots = botManager.getAllBots();
console.log('Tổng số bot:', allBots.length);

// Lấy bot đang hoạt động
const activeBots = botManager.getActiveBots();
console.log('Bot đang hoạt động:', activeBots.length);

// Xóa bot
botManager.removeBotById('support-bot');

// Thống kê
console.log('Số lượng bot:', botManager.getBotCount());
```

## 💎 Tính năng VIP

### 🛡️ Anti-Warning System
```javascript
// Tự động xóa cảnh báo Facebook
api.clearWarnings().then(success => {
    console.log('Xóa cảnh báo:', success ? 'Thành công' : 'Thất bại');
});

// Kích hoạt chế độ ẩn danh
api.enableStealthMode();
console.log('Chế độ stealth đã được kích hoạt');
```

### 🔄 Session Management
```javascript
// Làm mới session
api.refreshSession().then(() => {
    console.log('Session đã được làm mới');
});

// Thống kê VIP
const stats = api.getVipStats();
console.log('Thống kê VIP:', {
    warningCount: stats.warningCount,
    lockAttempts: stats.lockAttempts,
    vipFeatures: stats.vipFeatures,
    uptime: stats.uptime,
    protection: stats.protection
});
```

### 📊 Monitoring & Analytics
```javascript
// Event tracking
api.on('message', (event) => {
    console.log(`Tin nhắn mới từ ${event.senderID}: ${event.body}`);
});

api.on('presence', (event) => {
    console.log(`${event.userID} ${event.statuses ? 'online' : 'offline'}`);
});

api.on('error', (error) => {
    console.error('Lỗi API:', error);
});

// Custom middleware
api.use('message', (event, next) => {
    // Xử lý tin nhắn tùy chỉnh
    event.processed = true;
    event.timestamp = Date.now();
    next();
});
```

## 📖 API Documentation

### 🔤 Core Methods

#### `getCurrentUserID()`
Lấy ID người dùng hiện tại
```javascript
const userID = api.getCurrentUserID();
console.log('User ID:', userID);
```

#### `getAppState()`
Lấy app state hiện tại
```javascript
const appState = api.getAppState();
// Lưu để sử dụng lần sau
fs.writeFileSync('appstate.json', JSON.stringify(appState));
```

#### `setOptions(options)`
Cập nhật cấu hình
```javascript
api.setOptions({
    autoMarkDelivery: true,
    logLevel: 'debug'
});
```

### 💬 Messaging Methods

#### `sendMessage(message, threadID, callback, messageID)`
Gửi tin nhắn
```javascript
// Tin nhắn văn bản
api.sendMessage('Hello World!', threadID, (err, messageInfo) => {
    if (err) return console.error(err);
    console.log('Tin nhắn đã gửi:', messageInfo.messageID);
});

// Tin nhắn với attachment
api.sendMessage({
    body: 'Xem ảnh này!',
    attachment: fs.createReadStream('image.jpg')
}, threadID);

// Reply tin nhắn
api.sendMessage('Đây là reply', threadID, null, messageID);
```

#### `sendAttachment(attachment, threadID, callback)`
Gửi file đính kèm
```javascript
// Gửi ảnh
api.sendAttachment(
    fs.createReadStream('photo.jpg'),
    threadID,
    (err, messageInfo) => {
        console.log('Ảnh đã gửi:', messageInfo.messageID);
    }
);

// Gửi nhiều file
const attachments = [
    fs.createReadStream('file1.jpg'),
    fs.createReadStream('file2.mp4')
];
api.sendAttachment(attachments, threadID);
```

### 👥 User & Thread Methods

#### `getUserInfo(userIDs, callback)`
Lấy thông tin người dùng
```javascript
api.getUserInfo(['user1', 'user2'], (err, users) => {
    if (err) return console.error(err);
    
    for (let userID in users) {
        const user = users[userID];
        console.log(`${user.name} - ${user.profileUrl}`);
    }
});
```

#### `getThreadInfo(threadID, callback)`
Lấy thông tin nhóm chat
```javascript
api.getThreadInfo(threadID, (err, info) => {
    if (err) return console.error(err);
    
    console.log('Tên nhóm:', info.threadName);
    console.log('Thành viên:', info.participantIDs.length);
    console.log('Admin:', info.adminIDs);
});
```

#### `getThreadList(limit, timestamp, tags, callback)`
Lấy danh sách cuộc trò chuyện
```javascript
api.getThreadList(10, null, ['INBOX'], (err, threads) => {
    if (err) return console.error(err);
    
    threads.forEach(thread => {
        console.log(`${thread.name}: ${thread.snippet}`);
    });
});
```

### 🎧 Listening Methods

#### `listenMqtt(callback)`
Lắng nghe qua MQTT (khuyến nghị)
```javascript
const stopListening = api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    
    switch (event.type) {
        case 'message':
            console.log('Tin nhắn:', event.body);
            break;
        case 'event':
            console.log('Sự kiện:', event.logMessageType);
            break;
    }
});

// Dừng lắng nghe
// stopListening();
```

#### `listen(callback)`
Lắng nghe thông thường
```javascript
const stopListening = api.listen((err, event) => {
    if (err) return console.error(err);
    
    if (event.type === 'message') {
        // Xử lý tin nhắn
        api.sendMessage('Đã nhận: ' + event.body, event.threadID);
    }
});
```

### 🌐 HTTP Methods

#### `httpPost(url, data, callback)`
Gửi HTTP POST request
```javascript
api.httpPost('https://api.example.com/data', {
    key: 'value'
}, (err, response) => {
    if (err) return console.error(err);
    console.log('Response:', response);
});
```

#### `httpGet(url, options)`
Gửi HTTP GET request
```javascript
api.httpGet('https://api.example.com/info', {
    headers: {
        'Authorization': 'Bearer token'
    }
}).then(response => {
    console.log('Data:', response.data);
});
```

## 🔧 Cấu hình nâng cao

### ⚙️ FCA Options
```javascript
const fcaOptions = {
    // Cơ bản
    logLevel: 'info',           // error, warn, info, debug
    autoMarkDelivery: false,    // Tự động đánh dấu đã đọc
    autoReconnect: true,        // Tự động kết nối lại
    selfListen: false,          // Nghe tin nhắn của chính mình
    listenEvents: true,         // Nghe tất cả events
    updatePresence: true,       // Cập nhật trạng thái online
    forceLogin: true,          // Buộc đăng nhập
    
    // VIP Features
    vipMode: true,             // Kích hoạt tính năng VIP
    antiWarning: true,         // Anti-warning system
    bypassE2EE: true,          // Bypass E2EE encryption
    antiLock: true,            // Chống khóa tài khoản
    
    // Nâng cao
    userAgent: 'custom_user_agent',
    pageSize: 10,              // Số lượng tin nhắn tải về
    online: true,              // Trạng thái online
    timeout: 30000             // Timeout request (ms)
};

kaoriLogin(cookie, fcaOptions, callback);
```

### 🎯 Middleware System
```javascript
// Middleware cho tin nhắn
api.use('message', (event, next) => {
    // Log tất cả tin nhắn
    console.log(`[${new Date().toISOString()}] ${event.senderID}: ${event.body}`);
    
    // Thêm timestamp
    event.receivedAt = Date.now();
    
    // Tiếp tục xử lý
    next();
});

// Middleware cho events
api.use('event', (event, next) => {
    // Lọc events không cần thiết
    if (event.logMessageType === 'log:thread-color') {
        return; // Bỏ qua event này
    }
    
    next();
});

// Middleware có điều kiện
api.use('message', (event, next) => {
    // Chỉ xử lý tin nhắn từ admin
    if (isAdmin(event.senderID)) {
        event.isAdmin = true;
        next();
    }
});
```

### 🔄 Event Handling
```javascript
// Xử lý các loại event khác nhau
api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    
    switch (event.type) {
        case 'message':
            handleMessage(event);
            break;
            
        case 'event':
            switch (event.logMessageType) {
                case 'log:subscribe':
                    console.log('Có người tham gia nhóm');
                    break;
                    
                case 'log:unsubscribe':
                    console.log('Có người rời nhóm');
                    break;
                    
                case 'log:thread-name':
                    console.log('Tên nhóm đã thay đổi');
                    break;
            }
            break;
            
        case 'presence':
            console.log(`${event.userID} ${event.statuses ? 'online' : 'offline'}`);
            break;
    }
});

function handleMessage(event) {
    const { body, senderID, threadID, messageID } = event;
    
    // Bot đơn giản
    if (body.toLowerCase() === 'ping') {
        api.sendMessage('Pong!', threadID, null, messageID);
    }
    
    if (body.startsWith('/echo ')) {
        const text = body.slice(6);
        api.sendMessage(text, threadID, null, messageID);
    }
}
```

## 🛡️ Bảo mật

### 🔐 Cookie Security
```javascript
// Mã hóa cookie trước khi lưu
const crypto = require('crypto');

function encryptCookie(cookie, key) {
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(cookie, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptCookie(encryptedCookie, key) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encryptedCookie, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Sử dụng
const secretKey = 'your-secret-key';
const cookie = 'your-facebook-cookie';
const encrypted = encryptCookie(cookie, secretKey);

// Đăng nhập với cookie đã mã hóa
const decrypted = decryptCookie(encrypted, secretKey);
kaoriLogin(decrypted, callback);
```

### 🛡️ VIP Protection
```javascript
// Kích hoạt tất cả tính năng bảo vệ
const vipOptions = {
    vipMode: true,
    antiWarning: true,
    bypassE2EE: true,
    antiLock: true,
    antiDetection: {
        enabled: true,
        rotateHeaders: true,
        spoofFingerprint: true,
        randomDelay: { min: 1000, max: 3000 }
    },
    enhancedSecurity: {
        enabled: true,
        encryptAppState: true,
        secureStorage: true,
        antiDebug: true
    }
};

kaoriLogin(cookie, vipOptions, (err, api) => {
    if (err) return console.error(err);
    
    // Theo dõi trạng thái bảo mật
    setInterval(() => {
        const stats = api.getVipStats();
        console.log('Security Status:', {
            warnings: stats.warningCount,
            lockAttempts: stats.lockAttempts,
            protection: stats.protection
        });
    }, 60000); // Kiểm tra mỗi phút
});
```

## 🔍 Troubleshooting

### ❌ Lỗi thường gặp

#### 1. Login Failed
```javascript
// Kiểm tra cookie hợp lệ
kaoriLogin(cookie, (err, api) => {
    if (err) {
        console.error('Login error:', err.error);
        
        switch (err.error) {
            case 'login-approval':
                console.log('Cần phê duyệt đăng nhập');
                break;
            case 'checkpoint':
                console.log('Tài khoản bị checkpoint');
                break;
            case 'generic-error':
                console.log('Lỗi không xác định, thử lại sau');
                break;
        }
    }
});
```

#### 2. Network Issues
```javascript
// Xử lý lỗi mạng
api.on('error', (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNRESET') {
        console.log('Mất kết nối, đang kết nối lại...');
        // Auto-reconnect đã được kích hoạt
    }
});
```

#### 3. Rate Limiting
```javascript
// Xử lý giới hạn tốc độ
const rateLimiter = {
    messages: [],
    maxPerMinute: 10
};

function sendMessageSafe(message, threadID) {
    const now = Date.now();
    
    // Xóa tin nhắn cũ hơn 1 phút
    rateLimiter.messages = rateLimiter.messages.filter(
        time => now - time < 60000
    );
    
    if (rateLimiter.messages.length >= rateLimiter.maxPerMinute) {
        console.log('Rate limit reached, waiting...');
        setTimeout(() => sendMessageSafe(message, threadID), 60000);
        return;
    }
    
    rateLimiter.messages.push(now);
    api.sendMessage(message, threadID);
}
```

### 🔧 Debug Mode
```javascript
// Kích hoạt debug mode
const debugOptions = {
    logLevel: 'debug',
    vipMode: true
};

kaoriLogin(cookie, debugOptions, (err, api) => {
    if (err) return console.error(err);
    
    // Log tất cả requests
    api.on('request', (config) => {
        console.log('HTTP Request:', {
            method: config.method,
            url: config.url,
            headers: config.headers
        });
    });
    
    // Log responses
    api.on('response', (response) => {
        console.log('HTTP Response:', {
            status: response.status,
            data: response.data
        });
    });
});
```

## 📦 Package Structure

```
fca-kaoriVip/
├── src/
│   ├── core/
│   │   └── KaoriCore.js          # Core functionality
│   ├── handlers/
│   │   ├── AuthHandler.js        # Authentication
│   │   └── MessageHandler.js     # Message handling
│   ├── middleware/               # Middleware system
│   ├── plugins/                  # Plugin system
│   └── utils/
│       └── Logger.js             # Logging utility
├── index.js                      # Main entry point
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

## 🚀 Production Deployment

### 📊 Monitoring Setup
```javascript
// Production monitoring
const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
    const stats = api.getVipStats();
    res.json({
        status: 'healthy',
        uptime: stats.uptime,
        features: stats.vipFeatures,
        protection: stats.protection
    });
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
    res.json({
        messagesReceived: messageCount,
        messagesSent: sentCount,
        errors: errorCount,
        lastActivity: lastActivityTime
    });
});

app.listen(3000, () => {
    console.log('Monitoring server running on port 3000');
});
```

### 🔄 Auto-restart
```javascript
// Auto-restart on error
function startBot() {
    kaoriLogin(cookie, options, (err, api) => {
        if (err) {
            console.error('Login failed, restarting in 30s...', err);
            setTimeout(startBot, 30000);
            return;
        }
        
        console.log('Bot started successfully');
        
        // Handle unexpected errors
        process.on('uncaughtException', (error) => {
            console.error('Uncaught exception:', error);
            setTimeout(startBot, 5000);
        });
        
        api.on('error', (error) => {
            console.error('API error:', error);
            if (error.fatal) {
                setTimeout(startBot, 10000);
            }
        });
    });
}

startBot();
```

## 🤝 Hỗ trợ

### 💬 Community
- GitHub Issues: [Báo lỗi và đề xuất](https://github.com/kaori-waguri/fca-kaoriVip/issues)
- Discussions: [Thảo luận và hỏi đáp](https://github.com/kaori-waguri/fca-kaoriVip/discussions)

### 📧 Liên hệ
- Email: support@kaoriwaguri.dev
- Website: https://kaoriwaguri.dev
- Documentation: https://docs.kaoriwaguri.dev/fca-kaoriVip

### 🎯 Roadmap
- [ ] TypeScript support
- [ ] Plugin system
- [ ] Web dashboard
- [ ] Real-time analytics
- [ ] Mobile app support

## 📄 License

MIT License - Tạo bởi Kaori Waguri

```
Copyright (c) 2025 Kaori Waguri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🌸 Credits

Được phát triển với ❤️ bởi **Kaori Waguri**

- 💫 **Innovation** - Công nghệ tiên tiến
- 🎀 **Elegance** - Code đẹp và sạch
- 🚀 **Performance** - Thực thi siêu nhanh  
- 💎 **Quality** - Độ tin cậy cấp doanh nghiệp

---

*🌸 Made with love by Kaori Waguri 🌸*
