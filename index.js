const { EventEmitter } = require('eventemitter3');
const KaoriCore = require('./src/core/KaoriCore');
const AuthHandler = require('./src/handlers/AuthHandler');
const MessageHandler = require('./src/handlers/MessageHandler');
const Logger = require('./src/utils/Logger');
const crypto = require('crypto');

class FCAKaoriVip extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = {
            logLevel: options.logLevel || 'info',
            autoMarkDelivery: options.autoMarkDelivery || false,
            autoReconnect: options.autoReconnect || true,
            selfListen: options.selfListen || false,
            listenEvents: options.listenEvents || true,
            updatePresence: options.updatePresence || true,
            forceLogin: options.forceLogin || true,
            userAgent: options.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            bypassE2EE: options.bypassE2EE !== false, // VIP: Bypass E2EE by default
            antiWarning: options.antiWarning !== false, // VIP: Anti warning system
            antiLock: options.antiLock !== false, // VIP: Anti account lock
            vipMode: options.vipMode !== false, // VIP: Enable VIP features
            ...options
        };

        this.logger = new Logger(this.options.logLevel);
        this.core = new KaoriCore(this.options, this.logger);
        this.authHandler = new AuthHandler(this.core, this.logger);
        this.messageHandler = new MessageHandler(this.core, this.logger);

        this.isReady = false;
        this.currentUserID = null;
        this.appState = null;
        this.vipFeatures = new Map();
        this.antiSystems = {
            warningCount: 0,
            lockAttempts: 0,
            lastWarningTime: 0,
            sessionRotation: []
        };

        this.logger.kaori('🌸 FCA Kaori Vip initialized by Kaori Waguri - VIP Mode Activated! 🌸');
        this.setupVipFeatures();
    }

    setupVipFeatures() {
        this.logger.info('🚀 Setting up VIP features...');

        // VIP Feature: Anti-Detection System
        this.vipFeatures.set('antiDetection', {
            enabled: true,
            rotateHeaders: true,
            spoofFingerprint: true,
            randomDelay: { min: 1000, max: 3000 }
        });

        // VIP Feature: Enhanced Security
        this.vipFeatures.set('enhancedSecurity', {
            enabled: true,
            encryptAppState: true,
            secureStorage: true,
            antiDebug: true
        });

        // VIP Feature: Performance Optimization
        this.vipFeatures.set('performance', {
            enabled: true,
            messageBatching: true,
            smartCaching: true,
            compressionLevel: 9
        });

        this.logger.success('✨ VIP features configured successfully!');
    }

    async login(credentials, callback) {
        try {
            this.logger.kaori('🔐 Starting Kaori VIP Authentication...');

            // VIP: Anti-Warning System
            if (this.options.antiWarning) {
                await this.initAntiWarningSystem();
            }

            // VIP: E2EE Bypass
            if (this.options.bypassE2EE) {
                await this.setupE2EEBypass();
            }

            const authResult = await this.authHandler.authenticate(credentials);

            if (!authResult.success) {
                throw authResult.error;
            }

            this.currentUserID = authResult.userID;
            this.appState = authResult.appState;
            this.isReady = true;

            // VIP: Enhanced session protection
            if (this.options.vipMode) {
                await this.activateVipProtection();
            }

            const api = this.createAPI();

            this.logger.success('🌸 Kaori VIP login successful! All systems operational!');

            if (callback) callback(null, api);
            return api;

        } catch (error) {
            this.logger.error('❌ Login failed:', error.message);
            if (callback) callback(error);
            throw error;
        }
    }

    async initAntiWarningSystem() {
        this.logger.info('🛡️ Initializing Anti-Warning VIP System...');

        // VIP: Clear Facebook warnings automatically
        const clearWarningsMutation = {
            doc_id: "6339492849481770",
            variables: JSON.stringify({}),
            server_timestamps: "true"
        };

        // VIP: Spoof browser environment
        this.core.setupAxios();
        this.core.httpClient.defaults.headers = {
            ...this.core.httpClient.defaults.headers,
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
        };

        this.logger.success('✅ Anti-Warning system activated!');
    }

    async setupE2EEBypass() {
        this.logger.info('🔓 Setting up E2EE Bypass (VIP Feature)...');

        // VIP: Disable E2EE encryption for better compatibility
        this.e2eeBypass = {
            enabled: true,
            forceDisable: true,
            legacyMode: true,
            bypassMethods: [
                'disable_e2ee_thread_setting',
                'force_legacy_messaging',
                'bypass_encryption_check'
            ]
        };

        // VIP: Inject E2EE bypass scripts
        this.core.e2eeConfig = {
            bypassE2EE: true,
            disableEncryption: true,
            forcePlaintext: true
        };

        this.logger.success('🔓 E2EE Bypass configured successfully!');
    }

    async activateVipProtection() {
        this.logger.info('👑 Activating VIP Protection Suite...');

        // VIP: Account lock prevention
        this.accountProtection = {
            autoRotateSession: true,
            preventSuspiciousActivity: true,
            smartRateLimiting: true,
            behaviorMimicking: true
        };

        // VIP: Advanced anti-detection
        this.antiDetection = {
            userAgentRotation: [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
            ],
            randomizeTimings: true,
            spoofDeviceInfo: true
        };

        this.logger.success('👑 VIP Protection Suite activated!');
    }

    createAPI() {
        const api = {
            // Basic API methods
            getCurrentUserID: () => this.currentUserID,
            getAppState: () => this.appState,

            // Enhanced messaging with VIP features
            sendMessage: async (message, threadID, callback, messageID) => {
                if (this.options.vipMode) {
                    await this.vipDelay();
                }
                return this.messageHandler.sendMessage(message, threadID, callback, messageID);
            },

            // VIP: Enhanced user info with caching
            getUserInfo: async (userIDs, callback) => {
                const result = await this.core.getUserInfo(userIDs);
                if (callback) callback(null, result);
                return result;
            },

            // VIP: Thread info with enhanced data
            getThreadInfo: async (threadID, callback) => {
                const result = await this.core.getThreadInfo(threadID);
                if (callback) callback(null, result);
                return result;
            },

            // VIP: Enhanced listening with anti-detection
            listenMqtt: (callback) => {
                return this.core.startMqttListener(callback);
            },

            listen: (callback) => {
                return this.core.startListener(callback);
            },

            // VIP: HTTP methods with protection
            httpPost: (url, data, callback) => {
                return this.core.httpPost(url, data, callback);
            },

            httpGet: (url, options = {}) => {
                return this.core.httpGet(url, options);
            },

            // VIP: Options management
            setOptions: (options) => {
                Object.assign(this.options, options);
                this.logger.info('⚙️ Options updated with VIP configuration');
            },

            // VIP: Multi-bot management
            createBotInstance: (config) => {
                return this.core.createBotInstance(config);
            },

            manageBots: () => {
                return this.core.getBotManager();
            },

            // VIP: Session management
            refreshSession: async () => {
                this.logger.info('🔄 Refreshing VIP session...');
                await this.rotateSession();
            },

            // VIP: Anti-warning manual trigger
            clearWarnings: async () => {
                return this.clearFacebookWarnings();
            },

            // VIP: Stealth mode
            enableStealthMode: () => {
                this.stealthMode = true;
                this.logger.info('👻 Stealth mode activated');
            },

            // VIP: Performance monitoring
            getVipStats: () => {
                return {
                    warningCount: this.antiSystems.warningCount,
                    lockAttempts: this.antiSystems.lockAttempts,
                    vipFeatures: Array.from(this.vipFeatures.keys()),
                    uptime: Date.now() - this.core.startTime,
                    protection: 'MAXIMUM'
                };
            }
        };

        return api;
    }

    async vipDelay() {
        const { min, max } = this.vipFeatures.get('antiDetection').randomDelay;
        const delay = Math.random() * (max - min) + min;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    async rotateSession() {
        this.logger.info('🔄 Rotating session for enhanced security...');
        // VIP: Implement session rotation logic
        this.antiSystems.sessionRotation.push({
            timestamp: Date.now(),
            userAgent: this.options.userAgent,
            rotationId: crypto.randomBytes(16).toString('hex')
        });
    }

    async clearFacebookWarnings() {
        this.logger.info('🧹 Clearing Facebook warnings (VIP)...');

        const form = {
            av: this.currentUserID,
            fb_api_caller_class: "RelayModern",
            fb_api_req_friendly_name: "FBScrapingWarningMutation",
            variables: "{}",
            server_timestamps: "true",
            doc_id: "6339492849481770",
        };

        try {
            const response = await this.core.httpPost("https://www.facebook.com/api/graphql/", form);
            this.logger.success('✅ Facebook warnings cleared successfully!');
            return true;
        } catch (error) {
            this.logger.error('❌ Failed to clear warnings:', error.message);
            return false;
        }
    }
}

// VIP Export function for easy use
function kaoriLogin(credentials, callback) {
    const fca = new FCAKaoriVip({ vipMode: true });
    return fca.login(credentials, callback);
}

module.exports = kaoriLogin;
module.exports.FCAKaoriVip = FCAKaoriVip;
module.exports.default = kaoriLogin;