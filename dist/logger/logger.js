"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const triple_beam_1 = require("triple-beam");
const winston = require("winston");
const config_service_1 = require("../config/config.service");
const loglevel_1 = require("./loglevel");
const formatter = winston.format(info => {
    if (info.level === loglevel_1.LogLevel.HTTP) {
        return info;
    }
    info.message = `[${moment().format("ddd MMM DD HH:mm:ss YYYY")}] [${info.level}] ${info.message}`;
    return info;
});
const passthrough = winston.format(info => {
    info[triple_beam_1.MESSAGE] = info.message;
    return info;
});
let Logger = class Logger {
    constructor(configService) {
        this.configService = configService;
        this.logger = winston.createLogger({
            level: configService.get().logLevel,
            format: formatter(),
        });
        this.logger.add(new winston.transports.Console({
            format: passthrough(),
            stderrLevels: [loglevel_1.LogLevel.Error, loglevel_1.LogLevel.Warn],
        }));
    }
    log(p0, p1) {
        const logLevel = (0, loglevel_1.isLogLevel)(p0) ? p0 : loglevel_1.LogLevel.Info;
        const message = (0, loglevel_1.isLogLevel)(p0) && p1 ? p1 : p0;
        this.logger.log(logLevel, message);
    }
    error(message) {
        this.log(loglevel_1.LogLevel.Error, message);
    }
    warn(message) {
        this.log(loglevel_1.LogLevel.Warn, message);
    }
    info(message) {
        this.log(loglevel_1.LogLevel.Info, message);
    }
    http(message) {
        this.log(loglevel_1.LogLevel.HTTP, message);
    }
    verbose(message) {
        this.log(loglevel_1.LogLevel.Verbose, message);
    }
    debug(message) {
        this.log(loglevel_1.LogLevel.Debug, message);
    }
    silly(message) {
        this.log(loglevel_1.LogLevel.Silly, message);
    }
};
Logger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map