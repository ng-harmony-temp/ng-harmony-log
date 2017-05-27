import { ClientConsoleLogger as ClientLogger, ClientRollbarLogger as RemoteLogger } from "we-js-logger";

const Console = new Logger({
    name: 'my-logger',
    environment: 'development',
    level: 'debug',
    codeVersion: process.env.SHA_VERSION,
    logentriesToken: process.env.LOGENTRIES_TOKEN,
    rollbarToken: process.env.ROLLBAR_TOKEN,
    scrubFields: ['password'], // blacklist field keys being sent through logger 
});

export class Log {
    log ({ level, msg }, e = {}) {
        if (this.constructor.Loggers.environment !== "production" || level > 39) {
            this.constructor.Loggers.local.write({
                name: this.constructor.name, 
                time: new Date().getTime(),
                level: level,
                msg: msg,
                err: {
                    file: e.fileName || null,
                    line: e.lineNumber || null,
                    column: e.columnNumber || null,
                    stack: e.stack || null
                }    
            });
        }
        if (this.constructor.Loggers.remote !== null) {
            this.constructor.Loggers.remote({ level, msg, err: e});
        }
    }
    static create ({ rollbarToken, environment, npmPackageVersion}) {
        this.Loggers = this.Loggers || {
            local: new ClientLogger(), 
            remote: rollbarToken ? new RemoteLogger({
                token: rollbarToken,
                environment: environment,
                codeVersion: npmPackageVersion
            }) : null,
            environment
        }
    }
}
export class GenericError extends Error {
    name = this.constructor.name;
    level = "info";
}

export class PromiseFailureError extends GenericError {
    message = "The Promise in question got rejected";
}

export class VoidError extends GenericError  {
    message = "Expected a non-void content, but got falsy/void content";
    level = "error";
}

export class ValidationError extends GenericError {
    message = "Validation failed!";
    level = "info";
}

export class RemoteValidationError extends ValidationError {
    level = "error";
}

export class LocalValidationError extends ValidationError {
    level = "info";
}

export class DataRequestError extends GenericError {
    message = "Request failed";
}

export class DataReqeustTimeoutError extends DataRequestError {
    message = "The Request timed out";
}

export class DataRequestVoidError extends DataRequestError {
    message = "The Request returned an unexpected empty response";
}

export class NotImplementedError extends GenericError {
    message = "The method is to mandatory by design, but isn't implemented";
    constructor (methodSignature) {
        super();
        this.message = methodSignature + ": " + this.message;
    }
}