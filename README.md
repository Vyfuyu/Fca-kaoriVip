
# 🌸 FCA Kaori Vip 🌸

**Advanced Multi-Bot Facebook Chat API System**  
*by Kaori Waguri*

## ✨ Features

- 🤖 **Multi-Bot Support** - Manage multiple bots from one system
- 🚀 **High Performance** - Optimized for speed and reliability  
- 🔒 **Advanced Security** - Enhanced authentication and session management
- 📱 **Real-time MQTT** - Lightning-fast message delivery
- 🎨 **Beautiful Logging** - Colorful and detailed logs
- 🔧 **Easy Configuration** - Simple setup and customization
- 💎 **Enterprise Grade** - Built for production environments

## 🚀 Quick Start

### Installation

```bash
npm install ./fca-kaoriVip
```

### Basic Usage

```javascript
const kaoriLogin = require('fca-kaoriVip');

// Login with cookie string
kaoriLogin('your_cookie_string_here', (err, api) => {
    if (err) return console.error(err);
    
    console.log('🌸 Kaori FCA is ready!');
    
    // Send message
    api.sendMessage('Hello from Kaori!', 'thread_id');
    
    // Listen for messages
    api.listenMqtt((err, event) => {
        if (err) return console.error(err);
        console.log('Received:', event);
    });
});
```

### Multi-Bot Support

```javascript
// Create multiple bot instances
const bot1 = api.createBotInstance({
    id: 'bot1',
    name: 'Customer Support Bot',
    category: 'support'
});

const bot2 = api.createBotInstance({
    id: 'bot2', 
    name: 'Entertainment Bot',
    category: 'fun'
});

// Manage bots
const botManager = api.manageBots();
console.log('Active bots:', botManager.getActiveBots());
```

## ⚙️ Configuration

```javascript
const options = {
    logLevel: 'info',           // error, warn, info, debug
    autoMarkDelivery: false,    // Auto mark messages as delivered
    autoReconnect: true,        // Auto reconnect on disconnect
    selfListen: false,          // Listen to own messages
    listenEvents: true,         // Listen to all events
    updatePresence: true,       // Update online presence
    forceLogin: true           // Force login even if session exists
};

kaoriLogin(credentials, options, callback);
```

## 🎯 Advanced Features

### Custom Event Handling

```javascript
api.on('message', (event) => {
    console.log('New message:', event.body);
});

api.on('presence', (event) => {
    console.log('User presence:', event);
});
```

### Middleware System

```javascript
// Add custom middleware
api.use('message', (event, next) => {
    // Custom processing
    event.processed = true;
    next();
});
```

## 📊 Bot Management

```javascript
const manager = api.manageBots();

// Get all bots
const allBots = manager.getAllBots();

// Get active bots only
const activeBots = manager.getActiveBots();

// Remove a bot
manager.removeBotById('bot1');

// Get bot count
const count = manager.getBotCount();
```

## 🔧 API Methods

### Core Methods
- `getCurrentUserID()` - Get current user ID
- `getAppState()` - Get current app state
- `setOptions(options)` - Update options

### Messaging
- `sendMessage(message, threadID, callback)` - Send text message
- `sendAttachment(attachment, threadID, callback)` - Send attachment

### Information
- `getUserInfo(userIDs)` - Get user information
- `getThreadInfo(threadID)` - Get thread information

### Listening
- `listenMqtt(callback)` - Start MQTT listener
- `listen(callback)` - Start regular listener

## 🌸 Kaori Waguri Brand

This FCA is proudly developed under the **Kaori Waguri** brand, focusing on:

- 💫 **Innovation** - Cutting-edge technology
- 🎀 **Elegance** - Beautiful and clean code
- 🚀 **Performance** - Lightning-fast execution
- 💎 **Quality** - Enterprise-grade reliability

## 📝 License

MIT License - Created by Kaori Waguri

## 🤝 Support

For support and questions, contact the Kaori Waguri development team.

---

*🌸 Made with love by Kaori Waguri 🌸*
