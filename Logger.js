
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

class Logger {
    constructor(logLevel = 'info') {
        this.logLevel = logLevel;
        this.logDir = path.join(process.cwd(), 'logs');
        this.logFile = path.join(this.logDir, `kaori-${new Date().toISOString().split('T')[0]}.log`);
        
        // Ensure log directory exists
        fs.ensureDirSync(this.logDir);
    }

    log(level, message, ...args) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${args.join(' ')}`;
        
        // Write to file
        fs.appendFileSync(this.logFile, logMessage + '\n');
        
        // Console output with colors
        switch (level) {
            case 'error':
                console.log(chalk.red(`❌ ${message}`), ...args);
                break;
            case 'warn':
                console.log(chalk.yellow(`⚠️ ${message}`), ...args);
                break;
            case 'success':
                console.log(chalk.green(`✅ ${message}`), ...args);
                break;
            case 'info':
                console.log(chalk.blue(`ℹ️ ${message}`), ...args);
                break;
            case 'debug':
                if (this.logLevel === 'debug') {
                    console.log(chalk.gray(`🐛 ${message}`), ...args);
                }
                break;
            default:
                console.log(message, ...args);
        }
    }

    kaori(message, ...args) {
        console.log(chalk.magenta.bold(`🌸 KAORI VIP: ${message}`), ...args);
        this.log('kaori', message, ...args);
    }

    info(message, ...args) {
        this.log('info', message, ...args);
    }

    error(message, ...args) {
        this.log('error', message, ...args);
    }

    warn(message, ...args) {
        this.log('warn', message, ...args);
    }

    success(message, ...args) {
        this.log('success', message, ...args);
    }

    debug(message, ...args) {
        this.log('debug', message, ...args);
    }

    loader(message, ...args) {
        console.log(chalk.cyan(`🔄 ${message}`), ...args);
        this.log('loader', message, ...args);
    }
}

module.exports = Logger;
