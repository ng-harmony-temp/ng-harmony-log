import * as Logger from "we-js-logger";

export class Log {
    static create ({ loggerName, rollbarToken, environment, npmPackageVersion}) {
        return new Logger.default({
            name: loggerName,
            environment: environment,
            level: 'debug',
            codeVersion: npmPackageVersion,
            rollbarToken: rollbarToken,
            scrubFields: ['password']
        });
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