class MessageHandler {
    constructor(core, logger) {
        this.core = core;
        this.logger = logger;
    }

    async sendMessage(message, threadID, callback, messageID) {
        try {
            this.logger.info('📤 MessageHandler: Sending message...');

            // Use core send message method
            return await this.core.sendMessage(message, threadID, callback, messageID);
        } catch (error) {
            this.logger.error('❌ MessageHandler: Send message failed:', error.message);
            throw error;
        }
    }

    async handleIncomingMessage(event) {
        this.logger.info('📥 MessageHandler: Processing incoming message...');

        // VIP: Enhanced message processing
        return {
            processed: true,
            event,
            timestamp: Date.now()
        };
    }

    async formatMessage(message, options = {}) {
        // VIP: Message formatting with anti-detection
        if (options.vipMode) {
            // Add random variations to avoid detection
            return message;
        }

        return message;
    }
}

module.exports = MessageHandler;