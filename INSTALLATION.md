
# 📦 Hướng dẫn cài đặt FCA Kaori VIP

## 🎯 Mục tiêu
Tài liệu này hướng dẫn chi tiết cách cài đặt và thiết lập FCA Kaori VIP trong các môi trường khác nhau.

## 📋 Yêu cầu hệ thống

### Tối thiểu
- **Node.js**: >= 16.0.0
- **NPM**: >= 7.0.0 (hoặc Yarn >= 1.22.0)
- **RAM**: 512MB
- **Storage**: 100MB trống

### Khuyến nghị
- **Node.js**: >= 18.0.0 LTS
- **NPM**: >= 8.0.0
- **RAM**: 1GB+
- **Storage**: 500MB+
- **OS**: Ubuntu 20.04+, Windows 10+, macOS 10.15+

## 🚀 Cài đặt cho người mới bắt đầu

### Bước 1: Cài đặt Node.js

#### Windows
1. Truy cập https://nodejs.org
2. Tải về phiên bản LTS
3. Chạy file .msi và làm theo hướng dẫn
4. Kiểm tra: mở Command Prompt và chạy:
```cmd
node --version
npm --version
```

#### macOS
```bash
# Sử dụng Homebrew (khuyến nghị)
brew install node

# Hoặc tải từ nodejs.org
```

#### Ubuntu/Debian
```bash
# Cập nhật package list
sudo apt update

# Cài đặt Node.js và npm
sudo apt install nodejs npm

# Kiểm tra phiên bản
node --version
npm --version
```

### Bước 2: Tạo dự án mới

```bash
# Tạo thư mục dự án
mkdir my-kaori-bot
cd my-kaori-bot

# Khởi tạo package.json
npm init -y
```

### Bước 3: Cài đặt FCA Kaori VIP

#### Phương pháp 1: Copy thư mục (khuyến nghị)
```bash
# Clone repository
git clone https://github.com/your-username/fca-kaoriVip.git

# Copy vào dự án
cp -r fca-kaoriVip ./node_modules/

# Hoặc trên Windows
xcopy fca-kaoriVip node_modules\ /E /I
```

#### Phương pháp 2: NPM Link
```bash
# Trong thư mục fca-kaoriVip
cd fca-kaoriVip
npm link

# Trong thư mục dự án
cd ../my-kaori-bot
npm link fca-kaoriVip
```

### Bước 4: Cài đặt dependencies
```bash
# Trong thư mục fca-kaoriVip
cd fca-kaoriVip
npm install

# Quay lại dự án chính
cd ../
```

### Bước 5: Tạo file cấu hình

#### config.json
```json
{
    "bot": {
        "name": "My Kaori Bot",
        "prefix": "!",
        "adminIDs": ["your_facebook_id_here"]
    },
    "fca": {
        "logLevel": "info",
        "autoMarkDelivery": false,
        "autoReconnect": true,
        "vipMode": true,
        "antiWarning": true
    }
}
```

#### app.js
```javascript
const kaoriLogin = require('./node_modules/fca-kaoriVip');
const fs = require('fs');

// Đọc cấu hình
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Đăng nhập
kaoriLogin('your_facebook_cookie_here', config.fca, (err, api) => {
    if (err) {
        console.error('Đăng nhập thất bại:', err);
        return;
    }
    
    console.log('🌸 Kaori Bot đã sẵn sàng!');
    
    // Lắng nghe tin nhắn
    api.listenMqtt((err, event) => {
        if (err) return console.error(err);
        
        if (event.type === 'message' && event.body) {
            console.log(`Tin nhắn từ ${event.senderID}: ${event.body}`);
            
            // Bot đơn giản
            if (event.body === config.bot.prefix + 'ping') {
                api.sendMessage('Pong! 🏓', event.threadID);
            }
        }
    });
});
```

### Bước 6: Lấy Facebook Cookie

#### Cách 1: Browser Developer Tools
1. Đăng nhập Facebook trên trình duyệt
2. Nhấn F12 để mở Developer Tools
3. Chuyển sang tab **Application** (Chrome) hoặc **Storage** (Firefox)
4. Trong sidebar, chọn **Cookies** → **https://www.facebook.com**
5. Copy toàn bộ cookies thành chuỗi định dạng:
```
cookie1=value1; cookie2=value2; cookie3=value3;
```

#### Cách 2: Extension Cookie Editor
1. Cài đặt extension "Cookie Editor" cho Chrome/Firefox
2. Đăng nhập Facebook
3. Click vào icon Cookie Editor
4. Chọn "Export" → "Netscape HTTP Cookie File"
5. Sử dụng cookie string từ file xuất ra

### Bước 7: Chạy bot
```bash
node app.js
```

## 🔧 Cài đặt nâng cao

### Cài đặt với PM2 (Production)

```bash
# Cài đặt PM2 globally
npm install -g pm2

# Tạo file ecosystem
```

#### ecosystem.config.js
```javascript
module.exports = {
    apps: [{
        name: 'kaori-bot',
        script: 'app.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production'
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true
    }]
};
```

```bash
# Tạo thư mục logs
mkdir logs

# Khởi động với PM2
pm2 start ecosystem.config.js

# Xem trạng thái
pm2 status

# Xem logs
pm2 logs kaori-bot

# Dừng
pm2 stop kaori-bot
```

### Cài đặt với Docker

#### Dockerfile
```dockerfile
FROM node:18-alpine

# Tạo thư mục app
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY fca-kaoriVip/ ./fca-kaoriVip/

# Cài đặt dependencies
RUN cd fca-kaoriVip && npm install
RUN npm install

# Copy source code
COPY . .

# Expose port (nếu cần)
EXPOSE 3000

# Tạo user non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Start app
CMD ["node", "app.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  kaori-bot:
    build: .
    container_name: kaori-bot
    restart: unless-stopped
    volumes:
      - ./logs:/usr/src/app/logs
      - ./data:/usr/src/app/data
    environment:
      - NODE_ENV=production
    networks:
      - kaori-network

networks:
  kaori-network:
    driver: bridge
```

```bash
# Chạy với Docker Compose
docker-compose up -d

# Xem logs
docker-compose logs -f kaori-bot

# Dừng
docker-compose down
```

## 🌐 Cài đặt cho Hosting

### Heroku

#### Procfile
```
web: node app.js
```

#### package.json (thêm scripts)
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "engines": {
    "node": "18.x",
    "npm": "8.x"
  }
}
```

```bash
# Cài đặt Heroku CLI
# Đăng nhập Heroku
heroku login

# Tạo app
heroku create my-kaori-bot

# Set config
heroku config:set NODE_ENV=production

# Deploy
git add .
git commit -m "Initial commit"
git push heroku main
```

### VPS/Dedicated Server

#### Với systemd
```bash
# Tạo service file
sudo nano /etc/systemd/system/kaori-bot.service
```

```ini
[Unit]
Description=Kaori Bot
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/your/bot
ExecStart=/usr/bin/node app.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=kaori-bot

[Install]
WantedBy=multi-user.target
```

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable kaori-bot

# Start service
sudo systemctl start kaori-bot

# Check status
sudo systemctl status kaori-bot

# View logs
sudo journalctl -u kaori-bot -f
```

## 🔒 Bảo mật

### Environment Variables
```bash
# Tạo file .env
touch .env
```

#### .env
```env
FACEBOOK_COOKIE=your_facebook_cookie_here
BOT_PREFIX=!
ADMIN_IDS=id1,id2,id3
NODE_ENV=production
LOG_LEVEL=info
```

#### Sử dụng trong code
```javascript
require('dotenv').config();

const config = {
    cookie: process.env.FACEBOOK_COOKIE,
    prefix: process.env.BOT_PREFIX || '!',
    adminIDs: process.env.ADMIN_IDS?.split(',') || [],
    fca: {
        logLevel: process.env.LOG_LEVEL || 'info',
        vipMode: true
    }
};

kaoriLogin(config.cookie, config.fca, callback);
```

### SSL/HTTPS cho webhook
```javascript
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, app);
server.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
```

## 🔍 Troubleshooting

### Lỗi thường gặp

#### 1. Module not found
```bash
# Kiểm tra đường dẫn
ls -la node_modules/fca-kaoriVip

# Cài đặt lại
rm -rf node_modules
npm install
```

#### 2. Permission denied (Linux/macOS)
```bash
# Fix quyền thư mục
chmod -R 755 ./fca-kaoriVip
chmod +x app.js

# Chạy với sudo (không khuyến nghị)
sudo node app.js
```

#### 3. Port đã được sử dụng
```bash
# Tìm process đang sử dụng port
lsof -i :3000
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>
```

#### 4. Memory issues
```javascript
// Thêm vào đầu file app.js
process.setMaxListeners(0);

// Tăng memory limit
node --max-old-space-size=4096 app.js
```

### Debug mode
```javascript
// Kích hoạt debug
const debugConfig = {
    logLevel: 'debug',
    vipMode: true
};

kaoriLogin(cookie, debugConfig, (err, api) => {
    if (err) {
        console.error('Debug - Login Error:', err);
        return;
    }
    
    console.log('Debug - Login successful');
    
    // Log mọi event
    api.listenMqtt((err, event) => {
        console.log('Debug - Event received:', JSON.stringify(event, null, 2));
    });
});
```

## 📊 Monitoring

### Health Check Script
```javascript
// health-check.js
const axios = require('axios');

async function healthCheck() {
    try {
        const response = await axios.get('http://localhost:3000/health');
        console.log('✅ Bot is healthy:', response.data);
        return true;
    } catch (error) {
        console.error('❌ Bot is unhealthy:', error.message);
        return false;
    }
}

// Chạy mỗi 5 phút
setInterval(healthCheck, 5 * 60 * 1000);
```

### Log Rotation
```bash
# Cài đặt logrotate
sudo apt install logrotate

# Tạo config
sudo nano /etc/logrotate.d/kaori-bot
```

```
/path/to/your/bot/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    notifempty
    create 0644 your-user your-group
    postrotate
        systemctl reload kaori-bot
    endscript
}
```

## 🎯 Next Steps

Sau khi cài đặt thành công:

1. **Đọc Documentation**: Xem [README.md](README.md) để hiểu đầy đủ các tính năng
2. **Tùy chỉnh Bot**: Thêm commands và events theo nhu cầu
3. **Monitor**: Thiết lập monitoring và alerting
4. **Backup**: Backup cookies và cấu hình định kỳ
5. **Update**: Theo dõi updates từ repository

## 🤝 Hỗ trợ cài đặt

Nếu gặp khó khăn trong quá trình cài đặt:

- 📧 Email: support@kaoriwaguri.dev
- 💬 GitHub Issues: https://github.com/kaori-waguri/fca-kaoriVip/issues
- 📚 Wiki: https://github.com/kaori-waguri/fca-kaoriVip/wiki

---
*🌸 Happy coding with Kaori VIP! 🌸*
