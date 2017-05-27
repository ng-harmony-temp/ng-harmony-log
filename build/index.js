import * as Logger from "js-logging";

let conf = {
    filters: {
        debug: 'white',
        info: 'yellow',
        notice: 'green',
        warning: 'blue',
        error: 'red',
        critical: 'red',
        alert: 'cyan',
        emergency: 'magenta'
    }
};
var Console = new Logger(conf);

export class Log {
    log (o) {
        if (typeof this._name === "undefined" || this._name === null) {
            this._name = this.constructor.name + "::" + (Math.random() / (new Date()).getTime()).toString(36).slice(-7);
        }
        let level = o.level || "info",
            severe = (o.level === "warn" || o.level === "error");
        Console["info"](o.name);
        o instanceof Error && Console["info"](`F: ${o.fileName}, L: ${o.lineNumber}, C: ${o.columnNumber}`);
        Console[level](o.message);
        o instanceof Error && severe && Console[level](o.stack);
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